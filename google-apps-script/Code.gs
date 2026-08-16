/**
 * ==============================================================================
 * DESI TADKA RESTAURANT — GOOGLE APPS SCRIPT WEB APP API BACKEND
 * ==============================================================================
 * 
 * INSTRUCTIONS TO DEPLOY:
 * 1. Open Google Sheets (https://sheets.google.com).
 * 2. Create a new Spreadsheet named: "Desi Tadka Restaurant Database"
 * 3. Go to Extensions -> Apps Script.
 * 4. Paste this complete Code.gs script into the Apps Script editor.
 * 5. Click "Save" 💾.
 * 6. Click "Deploy" -> "New deployment".
 * 7. Select type: "Web app".
 * 8. Execute as: "Me" (your Google account).
 * 9. Who has access: "Anyone" (Critical for public website API access).
 * 10. Click "Deploy", grant permissions, and copy the Web App URL!
 * 11. Paste your Web App URL into `src/data/restaurantData.js` in `googleSheetsApi.apiUrl`.
 * ==============================================================================
 */

// SPREADSHEET NAMES
const SPREADSHEET_NAME = "Desi Tadka Restaurant Database";
const SHEETS = {
  MENU: "MENU",
  ADDONS: "ADDONS",
  ORDERS: "ORDERS",
  RESERVATIONS: "RESERVATIONS",
  CONTACT: "CONTACT"
};

/**
 * Handle GET Requests (Fetch Menu, Add-ons, Categories, Order Status)
 */
function doGet(e) {
  try {
    const action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "menu";
    const ss = getSpreadsheet();
    ensureSheetsSetup(ss);

    let result = {};

    switch (action.toLowerCase()) {
      case "menu":
        result = { success: true, action: "menu", data: getSheetData(ss.getSheetByName(SHEETS.MENU)) };
        break;
      case "addons":
        result = { success: true, action: "addons", data: getSheetData(ss.getSheetByName(SHEETS.ADDONS)) };
        break;
      case "categories":
        const menuData = getSheetData(ss.getSheetByName(SHEETS.MENU));
        const categories = Array.from(new Set(menuData.map(item => item.Category || item.category).filter(Boolean)));
        result = { success: true, action: "categories", data: categories };
        break;
      case "init":
        result = { success: true, message: "Database sheets initialized successfully!" };
        break;
      default:
        result = { success: true, action: "menu", data: getSheetData(ss.getSheetByName(SHEETS.MENU)) };
        break;
    }

    return createJsonResponse(result);
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString() });
  }
}

/**
 * Handle POST Requests (Create Order, Reservation, Contact Message)
 */
function doPost(e) {
  try {
    let postData = {};
    if (e && e.postData && e.postData.contents) {
      try {
        postData = JSON.parse(e.postData.contents);
      } catch (err) {
        postData = e.parameter || {};
      }
    } else {
      postData = (e && e.parameter) ? e.parameter : {};
    }

    // Check action in URL query parameter, or payload body action parameter
    const action = (e && e.parameter && e.parameter.action)
      ? e.parameter.action
      : (postData.action || "order");

    const ss = getSpreadsheet();
    ensureSheetsSetup(ss);

    let result = {};

    switch (action.toLowerCase()) {
      case "order":
        result = handleNewOrder(ss, postData);
        break;
      case "updateorderstatus":
      case "updateorder":
        result = handleUpdateOrderStatus(ss, postData);
        break;
      case "reservation":
        result = handleNewReservation(ss, postData);
        break;
      case "contact":
        result = handleNewContact(ss, postData);
        break;
      default:
        result = handleNewOrder(ss, postData);
        break;
    }

    return createJsonResponse(result);
  } catch (error) {
    return createJsonResponse({ success: false, error: error.toString() });
  }
}

/**
 * Handle Order Submission
 */
function handleNewOrder(ss, data) {
  const sheet = ss.getSheetByName(SHEETS.ORDERS);
  const now = new Date();
  const dateStr = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd");
  const timeStr = Utilities.formatDate(now, Session.getScriptTimeZone(), "HH:mm:ss");

  const orderId = data.orderId || "DT-" + Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyyMMdd") + "-" + Math.floor(100 + Math.random() * 900);
  const customerName = data.customerName || data.name || "Valued Guest";
  const phone = data.phone || data.contact || "";
  const email = data.email || "";
  const orderType = data.orderType || "Dine-In";
  const tableNumber = data.tableNumber ? ("Table " + data.tableNumber) : (data.table || "N/A");
  const address = data.deliveryAddress || data.address || "N/A";
  const items = typeof data.items === "string" ? data.items : JSON.stringify(data.items || []);
  const addons = typeof data.addons === "string" ? data.addons : JSON.stringify(data.selectedAddons || data.addons || []);
  const specialInstructions = data.specialInstructions || data.instructions || "";
  const subtotal = data.subtotal || (data.calc ? data.calc.subtotal : 0);
  const tax = data.tax || (data.calc ? data.calc.tax : 0);
  const discount = data.discount || (data.calc ? data.calc.discount : 0);
  const total = data.total || data.amount || 0;
  const paymentMethod = data.paymentMethod || "Cash";
  const paymentStatus = data.paymentStatus || "Pending";
  const orderStatus = data.orderStatus || data.status || "Pending";

  sheet.appendRow([
    orderId,
    dateStr,
    timeStr,
    customerName,
    phone,
    email,
    orderType,
    tableNumber,
    address,
    items,
    addons,
    specialInstructions,
    subtotal,
    tax,
    discount,
    total,
    paymentMethod,
    paymentStatus,
    orderStatus
  ]);

  return {
    success: true,
    message: "Order placed successfully!",
    orderId: orderId,
    data: {
      orderId: orderId,
      customerName: customerName,
      tableNumber: tableNumber,
      total: total,
      status: orderStatus
    }
  };
}

/**
 * Handle Order Status Update (Modifies existing row, NEVER creates new column or new row)
 */
function handleUpdateOrderStatus(ss, data) {
  const sheet = ss.getSheetByName(SHEETS.ORDERS);
  if (!sheet) return { success: false, error: "ORDERS sheet not found" };

  const targetOrderId = String(data.orderId || "").trim();
  const newStatus = String(data.status || data.orderStatus || "").trim();
  const newPaymentStatus = data.paymentStatus ? String(data.paymentStatus).trim() : null;

  if (!targetOrderId || !newStatus) {
    return { success: false, error: "Missing orderId or status" };
  }

  const rows = sheet.getDataRange().getValues();
  if (rows.length < 2) return { success: false, error: "No order rows found in sheet" };

  // Dynamically inspect Header Row (Row 1)
  const headers = rows[0].map(h => String(h).trim().toLowerCase());
  
  let orderIdCol = headers.findIndex(h => h.includes('order id') || h === 'id');
  if (orderIdCol === -1) orderIdCol = 0;

  let statusCol = headers.findIndex(h => h === 'order status' || h === 'status');
  if (statusCol === -1) statusCol = 18; // Default column 19 (S)

  let paymentCol = headers.findIndex(h => h === 'payment status');
  if (paymentCol === -1) paymentCol = 17; // Default column 18 (R)

  const cleanTarget = targetOrderId.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

  let foundRowIndex = -1;
  for (let i = 1; i < rows.length; i++) {
    const cellVal = String(rows[i][orderIdCol] || "").trim();
    const cleanCell = cellVal.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (cleanCell && (cleanCell === cleanTarget || cellVal.toUpperCase() === targetOrderId.toUpperCase())) {
      foundRowIndex = i + 1; // 1-based row index in Google Sheets
      break;
    }
  }

  if (foundRowIndex > -1) {
    // Update ONLY the existing Order Status cell on the found row
    sheet.getRange(foundRowIndex, statusCol + 1).setValue(newStatus);

    if (newPaymentStatus) {
      sheet.getRange(foundRowIndex, paymentCol + 1).setValue(newPaymentStatus);
    } else if (newStatus.toLowerCase() === 'completed') {
      sheet.getRange(foundRowIndex, paymentCol + 1).setValue('Paid');
    }

    return {
      success: true,
      message: `Order ${targetOrderId} updated to "${newStatus}" on row ${foundRowIndex}`
    };
  }

  return { success: false, error: `Order ID ${targetOrderId} not found in sheet` };
}

/**
 * Handle Table Reservation Submission
 */
function handleNewReservation(ss, data) {
  const sheet = ss.getSheetByName(SHEETS.RESERVATIONS);
  const now = new Date();
  const dateStr = data.date || Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd");
  const timeStr = data.time || Utilities.formatDate(now, Session.getScriptTimeZone(), "HH:mm");
  const createdAt = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");

  const reservationId = data.reservationId || "RES-" + Math.floor(1000 + Math.random() * 9000);
  const customerName = data.customerName || data.name || "Guest";
  const phone = data.phone || "";
  const email = data.email || "";
  const guests = data.guests || data.people || 2;
  const tableNumber = data.tableNumber ? ("Table " + data.tableNumber) : "Auto-Assigned";
  const specialRequest = data.specialRequest || data.notes || "";
  const status = data.status || "Pending";

  sheet.appendRow([
    reservationId,
    dateStr,
    timeStr,
    customerName,
    phone,
    email,
    guests,
    tableNumber,
    specialRequest,
    status,
    createdAt
  ]);

  return {
    success: true,
    message: "Reservation confirmed!",
    reservationId: reservationId
  };
}

/**
 * Handle Contact Message Submission
 */
function handleNewContact(ss, data) {
  const sheet = ss.getSheetByName(SHEETS.CONTACT);
  const now = new Date();
  const dateStr = Utilities.formatDate(now, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");

  const messageId = "MSG-" + Math.floor(1000 + Math.random() * 9000);
  const name = data.name || "Guest";
  const phone = data.phone || "";
  const email = data.email || "";
  const message = data.message || data.subject || "";

  sheet.appendRow([
    messageId,
    dateStr,
    name,
    phone,
    email,
    message
  ]);

  return {
    success: true,
    message: "Thank you! Your message has been received."
  };
}

/**
 * Helper: Get Active Spreadsheet
 */
function getSpreadsheet() {
  try {
    return SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {
    const files = DriveApp.getFilesByName(SPREADSHEET_NAME);
    if (files.hasNext()) {
      return SpreadsheetApp.open(files.next());
    }
    return SpreadsheetApp.create(SPREADSHEET_NAME);
  }
}

/**
 * Helper: Ensure All 5 Sheets and Headers Exist
 */
function ensureSheetsSetup(ss) {
  // 1. MENU SHEET
  let menuSheet = ss.getSheetByName(SHEETS.MENU);
  if (!menuSheet) {
    menuSheet = ss.insertSheet(SHEETS.MENU);
    menuSheet.appendRow(["ID", "Name", "Category", "Description", "Price", "Half Price", "Full Price", "Image", "Available", "Bestseller", "Spicy"]);
    seedDefaultMenu(menuSheet);
  }

  // 2. ADDONS SHEET
  let addonsSheet = ss.getSheetByName(SHEETS.ADDONS);
  if (!addonsSheet) {
    addonsSheet = ss.insertSheet(SHEETS.ADDONS);
    addonsSheet.appendRow(["ID", "Name", "Category", "Price", "Available"]);
    seedDefaultAddons(addonsSheet);
  }

  // 3. ORDERS SHEET
  let ordersSheet = ss.getSheetByName(SHEETS.ORDERS);
  if (!ordersSheet) {
    ordersSheet = ss.insertSheet(SHEETS.ORDERS);
    ordersSheet.appendRow(["Order ID", "Date", "Time", "Customer Name", "Phone", "Email", "Order Type", "Table Number", "Address", "Items", "Add-ons", "Special Instructions", "Subtotal", "Tax", "Discount", "Total", "Payment Method", "Payment Status", "Order Status"]);
  }

  // 4. RESERVATIONS SHEET
  let resSheet = ss.getSheetByName(SHEETS.RESERVATIONS);
  if (!resSheet) {
    resSheet = ss.insertSheet(SHEETS.RESERVATIONS);
    resSheet.appendRow(["Reservation ID", "Date", "Time", "Customer Name", "Phone", "Email", "Guests", "Table Number", "Special Request", "Status", "Created At"]);
  }

  // 5. CONTACT SHEET
  let contactSheet = ss.getSheetByName(SHEETS.CONTACT);
  if (!contactSheet) {
    contactSheet = ss.insertSheet(SHEETS.CONTACT);
    contactSheet.appendRow(["Message ID", "Date", "Name", "Phone", "Email", "Message"]);
  }
}

/**
 * Seed Default Sample Menu Items in Sheet
 */
function seedDefaultMenu(sheet) {
  const sampleMenu = [
    ["mn-1", "Dal Makhani Special (Desi Ghee)", "paneer-special", "Slow cooked black lentils with white butter & cream.", 340, 190, 340, "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80", "TRUE", "TRUE", "FALSE"],
    ["mn-2", "Amritsari Special Chhole Kulche (2 Pcs)", "desi-special-kulche-naan", "Crispy tandoori kulcha stuffed with potatoes & spices served with spicy Pindi Chhole.", 299, "", 299, "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80", "TRUE", "TRUE", "TRUE"],
    ["mn-3", "Desi Special Paneer Butter Masala", "paneer-special", "Rich creamy tomato gravy with juicy cottage cheese cubes.", 380, 220, 380, "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80", "TRUE", "TRUE", "FALSE"],
    ["mn-4", "Paneer Tikka Tandoori (8 Pcs)", "paneer-tikka", "Chargrilled cottage cheese marinated in spiced yogurt.", 360, "", 360, "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80", "TRUE", "TRUE", "TRUE"],
    ["mn-5", "Amritsari Chur Chur Naan", "desi-special-kulche-naan", "Crispy crushed buttered naan stuffed with cottage cheese & herbs.", 140, "", 140, "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80", "TRUE", "TRUE", "FALSE"],
    ["mn-6", "King Ambarsari Thali", "desi-special-thali", "Dal Makhani, Pindi Chhole, Paneer Sabji, Jeera Rice, 2 Butter Roti, Naan & Raita.", 389, "", 389, "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80", "TRUE", "TRUE", "FALSE"],
    ["mn-7", "Patiala Shahi Sweet Lassi (500ml)", "cold-beverages", "Thick creamy chilled lassi topped with malai & dry fruits.", 120, "", 120, "https://images.unsplash.com/photo-1571006682858-a458b8a69288?auto=format&fit=crop&w=800&q=80", "TRUE", "TRUE", "FALSE"]
  ];

  sampleMenu.forEach(row => sheet.appendRow(row));
}

/**
 * Seed Default Addons in Sheet
 */
function seedDefaultAddons(sheet) {
  const sampleAddons = [
    ["add-1", "Extra White Butter (Looni Makkhan)", "all", 49, "TRUE"],
    ["add-2", "Extra Pindi Chhole Portion", "desi-special-kulche-naan", 149, "TRUE"],
    ["add-3", "Lehsun Desi Ghee Chutney", "all", 89, "TRUE"],
    ["add-4", "Boondi Raita", "all", 149, "TRUE"],
    ["add-5", "Extra Podina Chutney", "paneer-tikka", 69, "TRUE"],
    ["add-6", "Extra Dal Makhani Gravy", "paneer-special", 199, "TRUE"],
    ["add-7", "Patiala Shahi Lassi", "all", 120, "TRUE"]
  ];

  sampleAddons.forEach(row => sheet.appendRow(row));
}

/**
 * Helper: Convert Sheet to Array of Objects
 */
function getSheetData(sheet) {
  if (!sheet) return [];
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];

  const headers = data[0];
  const rows = data.slice(1);

  return rows.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
}

/**
 * Helper: Create CORS JSON Response
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
