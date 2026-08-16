// Reactive Store for Shopping Cart, Orders & Restaurant Dashboard State
import { showToast } from './components/toast.js';
import { restaurantData } from '../data/restaurantData.js';

const LOCAL_STORAGE_KEY = 'desi_tadka_cart_v2';
const ORDERS_STORAGE_KEY = 'desi_tadka_orders_v2';
const INQUIRIES_STORAGE_KEY = 'desi_tadka_inquiries_v2';

class Store {
  constructor() {
    this.listeners = [];
    this.cart = this.loadCart();
    this.orders = this.loadOrders();
    this.inquiries = this.loadInquiries();
    this.tableNumber = this.detectTableFromUrl() || null;
    this.menuItems = restaurantData.menuItems || [];
    this.addons = [];
    this.initApiData();
    setTimeout(() => this.notify(), 50);

    // Sync state across browser tabs in real-time
    window.addEventListener('storage', (e) => {
      if (e.key === LOCAL_STORAGE_KEY) {
        this.cart = this.loadCart();
        this.notify();
      }
      if (e.key === ORDERS_STORAGE_KEY) {
        this.orders = this.loadOrders();
        window.dispatchEvent(new CustomEvent('orders-updated', { detail: { orders: this.orders } }));
      }
      if (e.key === INQUIRIES_STORAGE_KEY) {
        this.inquiries = this.loadInquiries();
        window.dispatchEvent(new CustomEvent('inquiries-updated', { detail: { inquiries: this.inquiries } }));
      }
    });
  }

  async initApiData() {
    const apiMenu = await this.fetchMenuFromApi();
    if (apiMenu && apiMenu.length > 0) {
      this.menuItems = apiMenu;
      window.dispatchEvent(new CustomEvent('menu-updated', { detail: { menu: this.menuItems } }));
    }

    const apiAddons = await this.fetchAddonsFromApi();
    if (apiAddons && apiAddons.length > 0) {
      this.addons = apiAddons;
    }
  }

  loadCart() {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Error loading cart from LocalStorage:', err);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.cart));
      this.notify();
    } catch (err) {
      console.error('Error saving cart to LocalStorage:', err);
    }
  }

  // --- ORDERS MANAGEMENT & LIVE SYNC ---
  loadOrders() {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (err) {
      console.error('Error loading orders:', err);
    }

    // Default Initial Sample Orders for immediate Admin Dashboard functionality
    const defaultOrders = [
      {
        orderId: '#ORD-84920',
        customerName: 'Rahul Sharma',
        phone: '+91 9876543210',
        email: 'rahul@example.com',
        orderType: 'dine-in',
        tableNumber: 4,
        paymentMethod: 'upi',
        status: 'Preparing',
        total: 785,
        specialInstructions: 'Extra butter on Amritsari Kulcha please!',
        createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
        timestampFormatted: '15 mins ago',
        items: [
          { quantity: 2, item: { name: 'Amritsari Special Chhole Kulche', price: 220 }, selectedAddons: [{ name: 'Desi Ghee Butter Dip', price: 35 }] },
          { quantity: 1, item: { name: 'Patiala Shahi Lassi', price: 120 }, selectedAddons: [] }
        ]
      },
      {
        orderId: '#ORD-51923',
        customerName: 'Priya Verma',
        phone: '+91 9988776655',
        email: 'priya@example.com',
        orderType: 'delivery',
        deliveryAddress: 'House 42, Sector 2, Vaishali Nagar, Ajmer - 305004',
        paymentMethod: 'cod',
        status: 'Pending',
        total: 1040,
        specialInstructions: 'Make Dal Makhani extra spicy.',
        createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
        timestampFormatted: '5 mins ago',
        items: [
          { quantity: 1, item: { name: 'Dal Makhani Special (Desi Ghee)', price: 340 }, selectedAddons: [] },
          { quantity: 3, item: { name: 'Amritsari Chur Chur Naan', price: 140 }, selectedAddons: [] },
          { quantity: 1, item: { name: 'Paneer Butter Masala', price: 360 }, selectedAddons: [] }
        ]
      }
    ];

    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(defaultOrders));
    } catch (e) {}

    return defaultOrders;
  }

  saveOrders() {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(this.orders));
      window.dispatchEvent(new CustomEvent('orders-updated', { detail: { orders: this.orders } }));
    } catch (err) {
      console.error('Error saving orders:', err);
    }
  }

  placeOrder(orderData) {
    const today = new Date();
    const dateCode = today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0');
    const defaultId = `DT-${dateCode}-${Math.floor(100 + Math.random() * 900)}`;

    const newOrder = {
      orderId: orderData.orderId || defaultId,
      customerName: orderData.customerName || 'Valued Guest',
      phone: orderData.phone || '',
      email: orderData.email || '',
      orderType: orderData.orderType || 'dine-in',
      tableNumber: orderData.tableNumber || null,
      deliveryAddress: orderData.deliveryAddress || null,
      paymentMethod: orderData.paymentMethod || 'cash',
      paymentStatus: orderData.paymentStatus || 'Pending',
      items: orderData.items ? JSON.parse(JSON.stringify(orderData.items)) : [],
      calc: orderData.calc || {},
      total: orderData.total || 0,
      specialInstructions: orderData.specialInstructions || '',
      status: orderData.status || 'Pending', // Default: Pending
      createdAt: new Date().toISOString(),
      timestampFormatted: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.orders.unshift(newOrder);
    this.saveOrders();

    // Asynchronously send to Google Sheets API
    this.submitOrderToApi(newOrder);

    // Store active order ID for customer tracking
    try {
      localStorage.setItem('desi_last_active_order_id', newOrder.orderId);
    } catch (e) {}

    return newOrder;
  }

  updateOrderStatus(orderId, newStatus) {
    const order = this.orders.find(o => o.orderId === orderId);
    if (order) {
      order.status = newStatus;
      if (newStatus === 'Completed') {
        order.paymentStatus = 'Paid';
      }
      order.updatedAt = new Date().toISOString();
      this.saveOrders();

      // Sync status change directly to Google Sheets API
      this.updateOrderStatusInApi(orderId, newStatus, order.paymentStatus);

      showToast(`Order ${orderId} status updated to "${newStatus}"`, 'success');
      return true;
    }
    return false;
  }

  getOrders() {
    return this.orders;
  }

  getOrderById(orderId) {
    if (!orderId) return null;
    const cleanedId = orderId.trim().toUpperCase();
    return this.orders.find(o => o.orderId.toUpperCase() === cleanedId || o.orderId.replace('#', '').toUpperCase() === cleanedId.replace('#', '')) || null;
  }

  getLastActiveOrderId() {
    try {
      return localStorage.getItem('desi_last_active_order_id') || (this.orders.length > 0 ? this.orders[0].orderId : null);
    } catch (e) {
      return null;
    }
  }

  // --- INQUIRIES & CONTACT MESSAGES MANAGEMENT ---
  loadInquiries() {
    try {
      const saved = localStorage.getItem(INQUIRIES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}

    const defaultInquiries = [
      {
        id: 'INQ-101',
        type: 'contact',
        name: 'Anita Kapoor',
        email: 'anita@example.com',
        phone: '+91 9123456789',
        subject: 'Catering Enquiry for Birthday Party',
        message: 'Looking for authentic Amritsari Kulcha and Dal Makhani catering for 50 guests on coming Sunday.',
        status: 'Unread',
        createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
        dateFormatted: '2 hours ago'
      }
    ];

    try {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(defaultInquiries));
    } catch (e) {}

    return defaultInquiries;
  }

  saveInquiries() {
    try {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(this.inquiries));
      window.dispatchEvent(new CustomEvent('inquiries-updated', { detail: { inquiries: this.inquiries } }));
    } catch (e) {}
  }

  // --- GOOGLE APPS SCRIPT API BACKEND INTEGRATION ---
  getApiUrl() {
    return (restaurantData.googleSheetsApi && restaurantData.googleSheetsApi.apiUrl)
      ? restaurantData.googleSheetsApi.apiUrl.trim()
      : '';
  }

  async fetchMenuFromApi() {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return null;

    try {
      const response = await fetch(`${apiUrl}?action=menu`);
      if (!response.ok) throw new Error('Network response was not ok');
      const json = await response.json();
      
      if (json && json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data.map((row, idx) => ({
          id: String(row.ID || row.id || `mn-sheet-${idx + 1}`),
          name: String(row.Name || row.name || 'Dish Item'),
          category: String(row.Category || row.category || 'all').toLowerCase(),
          description: String(row.Description || row.description || ''),
          price: Number(row.Price || row.price) || 0,
          halfPrice: (row['Half Price'] !== undefined && row['Half Price'] !== '') ? Number(row['Half Price']) : (row.halfPrice !== undefined ? Number(row.halfPrice) : null),
          fullPrice: (row['Full Price'] !== undefined && row['Full Price'] !== '') ? Number(row['Full Price']) : (row.fullPrice !== undefined ? Number(row.fullPrice) : (Number(row.Price || row.price) || 0)),
          image: String(row.Image || row.image || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'),
          available: row.Available !== undefined ? (String(row.Available).toLowerCase() !== 'false') : true,
          isBestseller: String(row.Bestseller || row.isBestseller).toLowerCase() === 'true',
          isSpicy: String(row.Spicy || row.isSpicy).toLowerCase() === 'true',
          isVeg: true
        }));
      }
    } catch (err) {
      console.warn('Google Sheets Menu API unavailable, using local menu fallback:', err);
    }
    return null;
  }

  async fetchAddonsFromApi() {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return null;

    try {
      const response = await fetch(`${apiUrl}?action=addons`);
      if (!response.ok) throw new Error('Network response was not ok');
      const json = await response.json();

      if (json && json.success && Array.isArray(json.data) && json.data.length > 0) {
        return json.data.map((row, idx) => ({
          id: String(row.ID || row.id || `add-sheet-${idx + 1}`),
          name: String(row.Name || row.name || 'Addon Item'),
          category: String(row.Category || row.category || 'all').toLowerCase(),
          price: Number(row.Price || row.price) || 0,
          available: row.Available !== undefined ? (String(row.Available).toLowerCase() !== 'false') : true
        }));
      }
    } catch (err) {
      console.warn('Google Sheets Addons API unavailable, using local addons fallback:', err);
    }
    return null;
  }

  async submitOrderToApi(order) {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return { success: true, localOnly: true };

    try {
      const payload = {
        orderId: order.orderId,
        customerName: order.customerName,
        phone: order.phone,
        email: order.email,
        orderType: order.orderType,
        tableNumber: order.tableNumber ? `Table ${order.tableNumber}` : 'N/A',
        deliveryAddress: order.deliveryAddress || 'N/A',
        items: JSON.stringify(order.items || []),
        addons: JSON.stringify((order.items || []).flatMap(i => i.selectedAddons || [])),
        specialInstructions: order.specialInstructions || '',
        subtotal: order.calc ? order.calc.subtotal : order.total,
        tax: order.calc ? order.calc.tax : 0,
        discount: order.calc ? order.calc.discount : 0,
        total: order.total,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus || 'Pending',
        orderStatus: order.status || 'Pending'
      };

      const response = await fetch(`${apiUrl}?action=order`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('API server returned error');
      const json = await response.json();
      return json;
    } catch (err) {
      console.error('Google Sheets Order API submit error:', err);
      return { success: false, error: err.toString() };
    }
  }

  async updateOrderStatusInApi(orderId, newStatus, paymentStatus = null) {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return { success: true, localOnly: true };

    try {
      const payload = {
        orderId: orderId,
        status: newStatus,
        orderStatus: newStatus,
        paymentStatus: paymentStatus || (newStatus === 'Completed' ? 'Paid' : undefined)
      };

      const response = await fetch(`${apiUrl}?action=updateOrderStatus`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('API update failed');
      const json = await response.json();
      return json;
    } catch (err) {
      console.error('Google Sheets updateOrderStatus API error:', err);
      return { success: false, error: err.toString() };
    }
  }

  async submitReservationToApi(resData) {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return { success: true, localOnly: true };

    try {
      const response = await fetch(`${apiUrl}?action=reservation`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(resData)
      });
      return await response.json();
    } catch (err) {
      console.error('Google Sheets Reservation API submit error:', err);
      return { success: false, error: err.toString() };
    }
  }

  async submitContactToApi(contactData) {
    const apiUrl = this.getApiUrl();
    if (!apiUrl) return { success: true, localOnly: true };

    try {
      const response = await fetch(`${apiUrl}?action=contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(contactData)
      });
      return await response.json();
    } catch (err) {
      console.error('Google Sheets Contact API submit error:', err);
      return { success: false, error: err.toString() };
    }
  }

  addInquiry(inquiryData) {
    const newInquiry = {
      id: 'INQ-' + Math.floor(100 + Math.random() * 900),
      type: inquiryData.type || 'contact',
      name: inquiryData.name || 'Guest',
      email: inquiryData.email || '',
      phone: inquiryData.phone || '',
      subject: inquiryData.subject || 'General Inquiry',
      message: inquiryData.message || '',
      date: inquiryData.date || null,
      time: inquiryData.time || null,
      guests: inquiryData.guests || null,
      status: 'Unread',
      createdAt: new Date().toISOString(),
      dateFormatted: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.inquiries.unshift(newInquiry);
    this.saveInquiries();

    if (inquiryData.type === 'reservation') {
      this.submitReservationToApi(inquiryData);
      showToast('Reservation Confirmed! Saved to Google Sheets backend.', 'success');
    } else {
      this.submitContactToApi(inquiryData);
      showToast('Thank you! Your message has been received.', 'success');
    }

    return newInquiry;
  }

  markInquiryStatus(id, newStatus) {
    const target = this.inquiries.find(i => i.id === id);
    if (target) {
      target.status = newStatus;
      this.saveInquiries();
    }
  }

  getInquiries() {
    return this.inquiries;
  }

  // --- CART UTILITIES ---
  detectTableFromUrl() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      let table = urlParams.get('table');
      if (!table && window.location.hash.includes('?table=')) {
        const hashQuery = window.location.hash.split('?')[1];
        const hashParams = new URLSearchParams(hashQuery);
        table = hashParams.get('table');
      }
      return table ? parseInt(table, 10) : null;
    } catch (e) {
      return null;
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    if (Array.isArray(this.listeners)) {
      this.listeners.forEach(listener => {
        if (typeof listener === 'function') listener(this.cart);
      });
    }
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { cart: this.cart } }));
  }

  generateConfigKey(item, selectedAddons = [], notes = '') {
    const itemId = String(item.id || item.ID || item.name || 'dish').trim().toLowerCase();
    const addonsStr = (selectedAddons || []).map(a => String(a.name || a.id || '').trim().toLowerCase()).sort().join('|');
    return `${itemId}_${addonsStr}_${String(notes || '').trim().toLowerCase()}`;
  }

  addToCartWithCustomization(config) {
    const { item, quantity = 1, selectedAddons = [], specialInstructions = '' } = config;
    if (!item) return;

    const qty = Math.max(1, Number(quantity) || 1);
    const itemId = String(item.id || item.ID || item.name || ('item-' + Math.random().toString(36).substring(2, 9))).trim();
    const cleanItem = { ...item, id: itemId };

    const configKey = this.generateConfigKey(cleanItem, selectedAddons, specialInstructions);

    const existingIndex = this.cart.findIndex(i => i.configKey === configKey);
    if (existingIndex > -1) {
      this.cart[existingIndex].quantity = (Number(this.cart[existingIndex].quantity) || 0) + qty;
    } else {
      const basePrice = Number(item.price) || 0;
      const addonsTotal = (selectedAddons || []).reduce((sum, a) => sum + (Number(a.price) || 0), 0);
      const unitPrice = basePrice + addonsTotal;

      this.cart.push({
        id: configKey,
        configKey,
        item: cleanItem,
        quantity: qty,
        selectedAddons: [...selectedAddons],
        specialInstructions: String(specialInstructions || '').trim(),
        unitPrice: unitPrice
      });
    }
    this.saveCart();
  }

  addToCart(item, qty = 1, notes = '') {
    this.addToCartWithCustomization({
      item,
      quantity: qty,
      selectedAddons: [],
      specialInstructions: notes
    });
  }

  removeFromCart(cartItemId) {
    const item = this.cart.find(i => i.id === cartItemId || i.item.id === cartItemId || i.configKey === cartItemId);
    this.cart = this.cart.filter(i => !(i.id === cartItemId || i.item.id === cartItemId || i.configKey === cartItemId));
    this.saveCart();
    if (item && item.item) {
      showToast(`Removed "${item.item.name}"`, 'info');
    }
  }

  updateQuantity(cartItemId, newQty) {
    const numericQty = Number(newQty);
    if (isNaN(numericQty) || numericQty <= 0) {
      this.removeFromCart(cartItemId);
      return;
    }
    const target = this.cart.find(i => i.id === cartItemId || i.item.id === cartItemId || i.configKey === cartItemId);
    if (target) {
      target.quantity = numericQty;
      this.saveCart();
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  getCartCount() {
    if (!Array.isArray(this.cart)) return 0;
    return this.cart.reduce((total, i) => total + (Number(i.quantity) || 1), 0);
  }

  getCartSubtotal() {
    return this.cart.reduce((sum, i) => {
      const basePrice = Number(i.item.price) || 0;
      const addonsTotal = (i.selectedAddons || []).reduce((aSum, a) => aSum + (Number(a.price) || 0), 0);
      const unitPrice = i.unitPrice || (basePrice + addonsTotal);
      return sum + (unitPrice * i.quantity);
    }, 0);
  }

  getCartCalculation(orderType = 'dine-in') {
    const subtotal = this.getCartSubtotal();
    const tax = Math.round(subtotal * 0.05); // 5% GST
    const deliveryFee = orderType === 'delivery' && subtotal > 0 ? 49 : 0;
    const discount = subtotal >= 500 ? 50 : 0; // Flat ₹50 off for orders above ₹500
    const total = Math.max(0, subtotal + tax + deliveryFee - discount);

    return {
      subtotal,
      tax,
      deliveryFee,
      discount,
      total
    };
  }

  setTableNumber(tableNum) {
    this.tableNumber = tableNum ? parseInt(tableNum, 10) : null;
    window.dispatchEvent(new CustomEvent('table-selected', { detail: { tableNumber: this.tableNumber } }));
  }

  getTableNumber() {
    return this.tableNumber;
  }
}

export const store = new Store();
