// Dedicated Order Modal (Order Popup) — Primary Restaurant Ordering Experience
// Bulletproof Input Persistence & Scroll Position Preservation
import { restaurantData } from '../../data/restaurantData.js';
import { store } from '../store.js';
import { showToast } from './toast.js';
import { openItemCustomizationModal } from './itemCustomizationModal.js';

class OrderModal {
  constructor() {
    this.isOpen = false;
    this.orderType = 'dine-in'; // 'dine-in', 'takeaway', 'delivery'
    this.selectedPayment = 'upi';
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.isConfirmed = false;
    this.confirmedOrderData = null;
    this.scrollTopPos = 0;

    this.formData = {
      name: '',
      phone: '',
      email: '',
      instructions: '',
      deliveryAddress: '',
      city: 'Ajmer',
      pincode: '',
      tableNumber: null
    };

    this.init();
  }

  init() {
    this.createModalDOM();
    this.bindGlobalEvents();
  }

  createModalDOM() {
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'order-modal-backdrop';
    this.backdrop.id = 'order-modal-backdrop';

    this.card = document.createElement('div');
    this.card.className = 'order-modal-card';
    this.card.id = 'order-modal-card';

    this.backdrop.appendChild(this.card);
    document.body.appendChild(this.backdrop);
  }

  captureFormData() {
    if (!this.card) return;

    const bodyScroll = this.card.querySelector('.order-modal-body');
    if (bodyScroll) {
      this.scrollTopPos = bodyScroll.scrollTop;
    }

    const nameInput = this.card.querySelector('#order-cust-name');
    const phoneInput = this.card.querySelector('#order-cust-phone');
    const emailInput = this.card.querySelector('#order-cust-email');
    const instructionsInput = this.card.querySelector('#order-instructions');
    const addrInput = this.card.querySelector('#order-delivery-address');
    const cityInput = this.card.querySelector('#order-delivery-city');
    const pinInput = this.card.querySelector('#order-delivery-pincode');
    const tableSelect = this.card.querySelector('#order-table-select');

    if (nameInput) this.formData.name = nameInput.value;
    if (phoneInput) this.formData.phone = phoneInput.value;
    if (emailInput) this.formData.email = emailInput.value;
    if (instructionsInput) this.formData.instructions = instructionsInput.value;
    if (addrInput) this.formData.deliveryAddress = addrInput.value;
    if (cityInput) this.formData.city = cityInput.value;
    if (pinInput) this.formData.pincode = pinInput.value;
    if (tableSelect) this.formData.tableNumber = tableSelect.value;
  }

  safeRender() {
    this.captureFormData();
    this.render();
    const bodyScroll = this.card.querySelector('.order-modal-body');
    if (bodyScroll && this.scrollTopPos !== undefined) {
      bodyScroll.scrollTop = this.scrollTopPos;
    }
  }

  render() {
    if (this.isConfirmed && this.confirmedOrderData) {
      this.renderConfirmationView();
      return;
    }

    const tableNum = this.formData.tableNumber || store.getTableNumber();
    const cart = store.cart;
    const calc = store.getCartCalculation(this.orderType);

    // Filter menu items for in-popup browsing
    let filteredItems = restaurantData.menuItems;
    if (this.activeCategory !== 'all') {
      filteredItems = filteredItems.filter(i => i.category === this.activeCategory);
    }
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      filteredItems = filteredItems.filter(i => i.name.toLowerCase().includes(q) || (i.description && i.description.toLowerCase().includes(q)));
    }

    this.card.innerHTML = `
      <div class="order-modal-header">
        <div>
          <h2 style="font-size: 1.4rem; color: var(--deep-espresso); margin: 0;">Place Your Order</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted); margin: 2px 0 0 0;">Freshly prepared and served just the way you like it.</p>
        </div>
        <button type="button" class="icon-btn" id="close-order-modal" aria-label="Close modal">✕</button>
      </div>

      <div class="order-modal-body">
        <!-- QR Table Banner -->
        ${tableNum ? `
          <div class="qr-table-banner">
            <span style="font-size: 1.2rem;">📍</span>
            <div>
              <strong>QR Code Table Detected:</strong> You're ordering for <strong>Table ${tableNum}</strong>.
            </div>
          </div>
        ` : ''}

        <!-- 1. Order Type Selection -->
        <div style="margin-bottom: 1.5rem;">
          <label class="form-label" style="font-size: 1rem;">1. Select Order Type *</label>
          <div class="order-type-selector">
            <div class="order-type-card ${this.orderType === 'dine-in' ? 'selected' : ''}" data-type="dine-in">
              <div class="order-type-icon">🍽️</div>
              <div class="order-type-title">Dine-In</div>
              <div class="order-type-sub">Order directly to your table</div>
            </div>
            <div class="order-type-card ${this.orderType === 'takeaway' ? 'selected' : ''}" data-type="takeaway">
              <div class="order-type-icon">🛍️</div>
              <div class="order-type-title">Takeaway</div>
              <div class="order-type-sub">Pick up from restaurant</div>
            </div>
            <div class="order-type-card ${this.orderType === 'delivery' ? 'selected' : ''}" data-type="delivery">
              <div class="order-type-icon"></div>
              <div class="order-type-title">Delivery</div>
              <div class="order-type-sub">Delivered to your door</div>
            </div>
          </div>
        </div>

        <!-- 2. Customer & Context Details -->
        <form id="order-form" onsubmit="return false;">
          <div style="background-color: var(--white); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--primary-border); margin-bottom: 1.5rem;">
            <h4 style="margin-bottom: 1rem; color: var(--deep-espresso); font-size: 1.05rem;">2. Customer Information</h4>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input type="text" id="order-cust-name" class="form-control" placeholder="Enter your name" value="${this.formData.name || ''}" required>
              </div>
              <div class="form-group">
                <label class="form-label">Mobile Number *</label>
                <input type="tel" id="order-cust-phone" class="form-control" placeholder="Enter 10-digit phone" value="${this.formData.phone || ''}" required>
              </div>
              <div class="form-group">
                <label class="form-label">Email Address (Optional)</label>
                <input type="email" id="order-cust-email" class="form-control" placeholder="Enter email" value="${this.formData.email || ''}">
              </div>

              <!-- Mandatory Table Number for Dine-In -->
              ${this.orderType === 'dine-in' ? `
                <div class="form-group">
                  <label class="form-label">Table Number *</label>
                  <select id="order-table-select" class="form-control" required style="background-color: #fff8f0; font-weight: 700; color: var(--primary);">
                    <option value="">Select Table</option>
                    ${restaurantData.tables.map(t => `
                      <option value="${t.id}" ${String(tableNum) === String(t.id) ? 'selected' : ''}>${t.name} (${t.location} - ${t.capacity} Seats)</option>
                    `).join('')}
                  </select>
                  <small style="color: var(--text-muted); display: block; margin-top: 4px;">Please select the table where you are seated.</small>
                </div>
              ` : ''}
            </div>

            <!-- Mandatory Fields for Delivery -->
            ${this.orderType === 'delivery' ? `
              <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px dashed var(--primary-border);">
                <h5 style="color: var(--primary); margin-bottom: 0.75rem;">Delivery Address Details</h5>
                <div class="form-group">
                  <label class="form-label">Delivery Address *</label>
                  <input type="text" id="order-delivery-address" class="form-control" placeholder="House/Flat No., Street, Landmark" value="${this.formData.deliveryAddress || ''}" required>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                  <div class="form-group">
                    <label class="form-label">City *</label>
                    <input type="text" id="order-delivery-city" class="form-control" value="${this.formData.city || 'Ajmer'}" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Pincode *</label>
                    <input type="text" id="order-delivery-pincode" class="form-control" placeholder="305001" value="${this.formData.pincode || ''}" required>
                  </div>
                </div>
              </div>
            ` : ''}

            <div class="form-group" style="margin-top: 1rem;">
              <label class="form-label">General Cooking / Order Notes</label>
              <input type="text" id="order-instructions" class="form-control" placeholder="Any allergy warnings or special requests for kitchen..." value="${this.formData.instructions || ''}">
            </div>
          </div>

          <!-- 3. Add Items directly inside Popup -->
          <div style="background-color: var(--white); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--primary-border); margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
              <h4 style="color: var(--deep-espresso); font-size: 1.05rem; margin: 0;">3. Quick Add Dishes & Drinks</h4>
              <span style="font-size: 0.8rem; color: var(--text-muted);">Click any dish to add or customize</span>
            </div>

            <!-- In-Popup Search & Category Tabs -->
            <div style="margin-bottom: 1rem;">
              <div style="position: relative; margin-bottom: 0.75rem;">
                <span style="position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); font-size: 1rem; color: var(--primary);">🔍</span>
                <input type="text" id="popup-search" class="form-control" placeholder="Search dish inside popup..." value="${this.searchQuery}" style="padding-left: 2.4rem; font-size: 0.9rem;">
              </div>

              <div style="display: flex; gap: 0.4rem; overflow-x: auto; padding-bottom: 4px;">
                <button type="button" class="tab-btn ${this.activeCategory === 'all' ? 'active' : ''}" data-cat="all" style="padding: 0.35rem 0.85rem; font-size: 0.8rem;">All</button>
                ${restaurantData.categories.map(c => `
                  <button type="button" class="tab-btn ${this.activeCategory === c.id ? 'active' : ''}" data-cat="${c.id}" style="padding: 0.35rem 0.85rem; font-size: 0.8rem; white-space: nowrap;">
                    ${c.icon} ${c.name}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Scrollable Dish Grid Inside Popup -->
            <div style="max-height: 280px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.6rem; padding-right: 4px;">
              ${filteredItems.map(dish => {
                const inCart = cart.find(i => i.item.id === dish.id);
                return `
                  <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 0.85rem; border: 1px solid var(--primary-border); border-radius: var(--radius-md); background: var(--cream); gap: 0.75rem;">
                    <img src="${dish.image}" alt="${dish.name}" style="width: 48px; height: 48px; border-radius: var(--radius-sm); object-fit: cover; flex-shrink: 0;">
                    <div style="flex-grow: 1;">
                      <div style="font-weight: 700; font-size: 0.9rem; color: var(--deep-espresso);">${dish.name}</div>
                      <div style="font-size: 0.85rem; color: var(--primary); font-weight: 800;">₹${dish.price}/-</div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0;">
                      ${inCart ? `
                        <div class="qty-control" style="background: var(--white); padding: 2px 4px;">
                          <button type="button" class="qty-btn modal-minus" data-id="${inCart.id || dish.id}">-</button>
                          <span class="qty-val" style="padding: 0 0.5rem; font-size: 0.9rem;">${inCart.quantity}</span>
                          <button type="button" class="qty-btn modal-plus" data-id="${inCart.id || dish.id}">+</button>
                        </div>
                      ` : `
                        <button type="button" class="btn btn-primary btn-sm modal-add" data-id="${dish.id}" style="padding: 0.35rem 0.75rem; font-size: 0.8rem;">
                          + Add
                        </button>
                      `}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- 4. Selected Cart Items Breakdown -->
          <div style="background-color: var(--white); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--primary-border); margin-bottom: 1.5rem;">
            <h4 style="margin-bottom: 0.75rem; color: var(--deep-espresso); font-size: 1.05rem;">4. Your Order Summary</h4>
            
            ${cart.length === 0 ? `
              <div style="text-align: center; color: #c02626; padding: 1rem; font-weight: 600;">
                ⚠️ Your order is currently empty! Please select at least 1 dish above.
              </div>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem;">
                ${cart.map(c => {
                  const basePrice = Number(c.item.price) || 0;
                  const addonsTotal = (c.selectedAddons || []).reduce((sum, a) => sum + Number(a.price), 0);
                  const unitPrice = c.unitPrice || (basePrice + addonsTotal);
                  const lineTotal = unitPrice * c.quantity;
                  const cId = c.id || c.configKey || c.item.id;
                  return `
                    <div style="display: flex; flex-direction: column; font-size: 0.9rem; padding-bottom: 6px; border-bottom: 1px dashed var(--primary-border);">
                      <div style="display: flex; justify-content: space-between; align-items: baseline;">
                        <span style="font-weight: 700; color: var(--deep-espresso);">${c.item.name} (×${c.quantity})</span>
                        <span style="font-weight: 800; color: var(--primary);">₹${lineTotal}/-</span>
                      </div>
                      ${(c.selectedAddons && c.selectedAddons.length > 0) ? `
                        <div style="font-size: 0.8rem; color: var(--primary); padding-left: 0.5rem; margin-top: 2px; font-weight: 600;">
                          ${c.selectedAddons.map(a => `<div>+ ${a.name} (₹${a.price}/-)</div>`).join('')}
                        </div>
                      ` : ''}
                      ${c.specialInstructions ? `
                        <div style="font-size: 0.78rem; font-style: italic; color: var(--text-muted); padding-left: 0.5rem; margin-top: 2px;">
                          Note: "${c.specialInstructions}"
                        </div>
                      ` : ''}
                    </div>
                  `;
                }).join('')}
              </div>

              <div style="border-top: 1.5px dashed var(--primary-border); padding-top: 0.75rem; display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.9rem;">
                <div style="display: flex; justify-content: space-between; color: var(--text-muted);">
                  <span>Subtotal</span>
                  <span>₹${calc.subtotal}/-</span>
                </div>
                <div style="display: flex; justify-content: space-between; color: var(--text-muted);">
                  <span>Taxes (5% GST)</span>
                  <span>₹${calc.tax}/-</span>
                </div>
                ${this.orderType === 'delivery' ? `
                  <div style="display: flex; justify-content: space-between; color: var(--text-muted);">
                    <span>Standard Delivery Fee</span>
                    <span>₹${calc.deliveryFee}/-</span>
                  </div>
                ` : ''}
                ${calc.discount > 0 ? `
                  <div style="display: flex; justify-content: space-between; color: #166534; font-weight: 600;">
                    <span>Special Discount</span>
                    <span>-₹${calc.discount}/-</span>
                  </div>
                ` : ''}
                <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 800; color: var(--deep-espresso); margin-top: 0.5rem; padding-top: 0.5rem; border-top: 1.5px solid var(--primary-border);">
                  <span>Grand Total</span>
                  <span style="color: var(--primary);">₹${calc.total}/-</span>
                </div>
              </div>
            `}
          </div>

          <!-- 5. Payment Options -->
          <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
              <label class="form-label" style="font-size: 1rem; margin: 0;">5. Payment Method *</label>
              <span style="font-size: 0.82rem; font-weight: 800; color: var(--primary);">
                ${this.orderType === 'dine-in' ? '🏢 Reception / Counter Payment' : this.orderType === 'delivery' ? '🚚 Cash on Delivery (COD) Enabled' : '🛍️ Pickup Counter Payment'}
              </span>
            </div>

            <div class="payment-grid">
              ${this.orderType === 'dine-in' ? `
                <div class="payment-card ${this.selectedPayment === 'counter' ? 'selected' : ''}" data-pay="counter">
                  🏢 Pay at Reception / Counter
                </div>
                <div class="payment-card ${this.selectedPayment === 'upi' ? 'selected' : ''}" data-pay="upi">
                  📲 Razorpay UPI (GPay / PhonePe / QR)
                </div>
                <div class="payment-card ${this.selectedPayment === 'card' ? 'selected' : ''}" data-pay="card">
                  💳 Card at Counter
                </div>
              ` : this.orderType === 'delivery' ? `
                <div class="payment-card ${this.selectedPayment === 'cod' ? 'selected' : ''}" data-pay="cod">
                  🚚 Cash on Delivery (COD)
                </div>
                <div class="payment-card ${this.selectedPayment === 'upi' ? 'selected' : ''}" data-pay="upi">
                  📲 Razorpay UPI (GPay / PhonePe / QR)
                </div>
                <div class="payment-card ${this.selectedPayment === 'card' ? 'selected' : ''}" data-pay="card">
                  💳 Razorpay Card (Credit / Debit)
                </div>
                <div class="payment-card ${this.selectedPayment === 'netbanking' ? 'selected' : ''}" data-pay="netbanking">
                  🌐 Razorpay Net Banking
                </div>
              ` : `
                <div class="payment-card ${this.selectedPayment === 'cash' ? 'selected' : ''}" data-pay="cash">
                  🛍️ Cash at Pickup Counter
                </div>
                <div class="payment-card ${this.selectedPayment === 'upi' ? 'selected' : ''}" data-pay="upi">
                  📲 Razorpay UPI (GPay / PhonePe / QR)
                </div>
                <div class="payment-card ${this.selectedPayment === 'card' ? 'selected' : ''}" data-pay="card">
                  💳 Razorpay Credit / Debit Card
                </div>
              `}
            </div>

            <div style="font-size: 0.82rem; color: var(--deep-espresso); background: var(--light-beige); padding: 0.55rem 0.85rem; border-radius: var(--radius-md); border-left: 3.5px solid var(--primary); margin-top: 0.6rem; font-weight: 600;">
              ${this.orderType === 'dine-in' 
                ? '💡 Dine-In Note: Please pay directly at reception/counter or scan table QR.' 
                : this.orderType === 'delivery' 
                ? '💡 Delivery Note: Cash on Delivery (COD) active! Pay cash to delivery rider when food arrives.' 
                : '💡 Takeaway Note: Pay cash or UPI at counter when collecting your fresh meal.'}
            </div>
          </div>

          <!-- Final CTA Place Order -->
          <button type="button" id="place-order-submit-btn" class="btn btn-primary btn-block" style="padding: 1.1rem; font-size: 1.15rem; ${cart.length === 0 ? 'opacity: 0.6; cursor: not-allowed;' : ''}">
            Place Order (${this.orderType.toUpperCase()}) — ₹${calc.total}/-
          </button>
        </form>
      </div>
    `;

    this.bindEvents();
  }

  renderConfirmationView() {
    const o = this.confirmedOrderData;
    this.card.innerHTML = `
      <div class="order-modal-header" style="background-color: var(--cream);">
        <h3 style="color: var(--deep-espresso);">Order Status</h3>
        <button type="button" class="icon-btn" id="close-order-modal">✕</button>
      </div>

      <div class="order-modal-body">
        <div class="confirmation-wrap">
          <div class="success-checkmark">✓</div>
          <h2 style="font-size: 2.2rem; color: var(--deep-espresso); margin-bottom: 0.5rem;">Order Confirmed! 🎉</h2>
          <p style="color: var(--text-muted); font-size: 1.05rem; max-width: 500px; margin: 0 auto 1.5rem;">
            Thank you! Your order has been received and is being prepared with extreme care.
          </p>

          <div class="order-receipt">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--primary-border); padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
              <strong>Order Number:</strong>
              <strong style="color: var(--primary);">${o.orderId}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.92rem;">
              <span>Guest Name:</span>
              <span>${o.customerName}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.92rem;">
              <span>Order Type:</span>
              <span style="font-weight: 700; text-transform: uppercase;">${o.orderType}</span>
            </div>

            ${o.tableNumber ? `
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.92rem; color: var(--primary); font-weight: 700;">
                <span>Seated Table:</span>
                <span>Table ${o.tableNumber}</span>
              </div>
            ` : ''}

            ${o.deliveryAddress ? `
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.92rem;">
                <span>Delivery Address:</span>
                <span style="text-align: right; max-width: 200px;">${o.deliveryAddress}, ${o.city}</span>
              </div>
            ` : ''}

            <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.92rem;">
              <span>Est. Preparation Time:</span>
              <span style="color: #166534; font-weight: 700;">20–30 Minutes</span>
            </div>

            <div style="display: flex; justify-content: space-between; border-top: 1.5px solid var(--primary-border); padding-top: 0.75rem; margin-top: 0.75rem; font-weight: 800; font-size: 1.1rem;">
              <span>Total Amount Paid:</span>
              <span style="color: var(--primary);">₹${o.total}/-</span>
            </div>
          </div>

          <div style="background-color: var(--white); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--primary-border); margin: 1.5rem auto; max-width: 480px;">
            <p style="font-weight: 700; color: var(--primary); margin-bottom: 0.5rem;">
              ${o.orderType === 'dine-in' ? `✨ Your order will be served directly at Table ${o.tableNumber}.` :
                o.orderType === 'takeaway' ? '🛍️ Your order will be ready for pickup shortly at our main counter.' :
                ' Your order will be delivered to your provided address.'}
            </p>

            <div class="order-status-steps">
              <div class="status-step active">
                <div class="status-dot">✓</div>
                <span>Received</span>
              </div>
              <div class="status-step active">
                <div class="status-dot">🔥</div>
                <span>Preparing</span>
              </div>
              <div class="status-step">
                <div class="status-dot">🍽️</div>
                <span>Ready</span>
              </div>
              <div class="status-step">
                <div class="status-dot">🎉</div>
                <span>Served</span>
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; justify-content: center; margin-top: 1.75rem; flex-wrap: wrap;">
            <a href="#track?id=${o.orderId}" class="btn btn-primary" id="btn-track-order-live" style="padding: 0.85rem 1.5rem; font-weight: 800; background-color: var(--primary);">
               Track Order Live
            </a>
            <button type="button" class="btn btn-outline" id="btn-order-done" style="padding: 0.85rem 1.25rem;">
              Return Home
            </button>
          </div>
        </div>
      </div>
    `;

    const closeBtn = this.card.querySelector('#close-order-modal');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    const doneBtn = this.card.querySelector('#btn-order-done');
    if (doneBtn) {
      doneBtn.addEventListener('click', () => {
        this.close();
        window.location.hash = '#home';
      });
    }
  }

  bindEvents() {
    const closeBtn = this.card.querySelector('#close-order-modal');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    // Save inputs continuously on input/change
    this.card.querySelectorAll('input, select, textarea').forEach(el => {
      el.addEventListener('input', () => this.captureFormData());
      el.addEventListener('change', () => this.captureFormData());
    });

    // Order Type Selection
    this.card.querySelectorAll('.order-type-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const type = e.currentTarget.dataset.type;
        this.orderType = type;
        this.selectedPayment = 'upi'; // Reset payment on type switch
        this.safeRender();
      });
    });

    // Payment selection
    this.card.querySelectorAll('.payment-card').forEach(card => {
      card.addEventListener('click', (e) => {
        this.selectedPayment = e.currentTarget.dataset.pay;
        this.safeRender();
      });
    });

    // In-Modal Search & Categories
    const searchInput = this.card.querySelector('#popup-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.safeRender();
        const input = this.card.querySelector('#popup-search');
        if (input) {
          input.focus();
          input.setSelectionRange(input.value.length, input.value.length);
        }
      });
    }

    this.card.querySelectorAll('.tab-btn[data-cat]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.activeCategory = e.currentTarget.dataset.cat;
        this.safeRender();
      });
    });

    // Item Add/Qty Buttons inside modal
    this.card.querySelectorAll('.modal-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const id = e.currentTarget.dataset.id;
        const item = restaurantData.menuItems.find(i => i.id === id);
        if (item) {
          store.addToCart(item, 1);
          this.safeRender();
        }
      });
    });

    this.card.querySelectorAll('.modal-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const target = store.cart.find(i => (i.id === id || i.configKey === id || i.item.id === id));
        if (target) {
          store.updateQuantity(id, target.quantity - 1);
          this.safeRender();
        }
      });
    });

    this.card.querySelectorAll('.modal-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const target = store.cart.find(i => (i.id === id || i.configKey === id || i.item.id === id));
        if (target) {
          store.updateQuantity(id, target.quantity + 1);
          this.safeRender();
        }
      });
    });

    // Table Select listener
    const tableSelect = this.card.querySelector('#order-table-select');
    if (tableSelect) {
      tableSelect.addEventListener('change', (e) => {
        store.setTableNumber(e.target.value);
        this.captureFormData();
      });
    }

    // Submit Order Button
    const submitBtn = this.card.querySelector('#place-order-submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => this.handleOrderSubmit());
    }
  }

  bindGlobalEvents() {
    this.backdrop.addEventListener('click', (e) => {
      if (e.target === this.backdrop) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    window.addEventListener('cart-updated', () => {
      if (this.isOpen && !this.isConfirmed) {
        this.safeRender();
      }
    });
  }

  handleOrderSubmit() {
    this.captureFormData();

    if (store.cart.length === 0) {
      showToast('Please add at least 1 dish to your order!', 'warning');
      return;
    }

    const name = this.formData.name.trim();
    const phone = this.formData.phone.trim();
    const email = this.formData.email.trim();
    const instructions = this.formData.instructions.trim();

    if (!name) {
      showToast('Please enter your Name!', 'warning');
      const input = this.card.querySelector('#order-cust-name');
      if (input) input.focus();
      return;
    }

    if (!phone || phone.length < 10) {
      showToast('Please enter a valid 10-digit Phone Number!', 'warning');
      const input = this.card.querySelector('#order-cust-phone');
      if (input) input.focus();
      return;
    }

    let tableNumber = null;
    if (this.orderType === 'dine-in') {
      tableNumber = this.formData.tableNumber;
      if (!tableNumber) {
        showToast('Please select your Table Number for Dine-In!', 'warning');
        const select = this.card.querySelector('#order-table-select');
        if (select) select.focus();
        return;
      }
    }

    let deliveryAddress = null;
    let city = null;
    let pincode = null;

    if (this.orderType === 'delivery') {
      deliveryAddress = this.formData.deliveryAddress.trim();
      city = this.formData.city.trim();
      pincode = this.formData.pincode.trim();

      if (!deliveryAddress || !city || !pincode) {
        showToast('Please complete all Delivery Address fields!', 'warning');
        const input = this.card.querySelector('#order-delivery-address');
        if (input) input.focus();
        return;
      }
    }

    const calc = store.getCartCalculation(this.orderType);
    const today = new Date();
    const dateCode = today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0');
    const orderId = `DT-${dateCode}-${Math.floor(100 + Math.random() * 900)}`;

    const submitBtn = this.card.querySelector('#place-order-submit-btn');
    if (submitBtn) {
      submitBtn.innerHTML = 'Opening Razorpay Payment... ⏳';
      submitBtn.disabled = true;
    }

    // Trigger Razorpay SDK for UPI / Online Payments
    if (this.selectedPayment === 'upi' || this.selectedPayment === 'card' || this.selectedPayment === 'netbanking') {
      if (typeof window.Razorpay !== 'undefined') {
        const options = {
          key: restaurantData.razorpay.keyId || "rzp_test_TQMktiRSesZE2N",
          amount: calc.total * 100, // Amount in paise
          currency: "INR",
          name: restaurantData.name || "Desi Tadka",
          description: `Order ${orderId} (${this.orderType.toUpperCase()})`,
          image: "/logo.png",
          handler: (response) => {
            const placedOrder = store.placeOrder({
              orderId,
              customerName: name,
              phone,
              email,
              orderType: this.orderType,
              tableNumber: this.orderType === 'dine-in' ? tableNumber : null,
              deliveryAddress: this.orderType === 'delivery' ? `${deliveryAddress}, ${city} - ${pincode}` : null,
              paymentMethod: `Razorpay UPI / Online (${response.razorpay_payment_id || 'Paid'})`,
              razorpayPaymentId: response.razorpay_payment_id,
              items: [...store.cart],
              calc,
              total: calc.total,
              specialInstructions: instructions
            });

            this.confirmedOrderData = {
              ...placedOrder,
              subtotal: calc.subtotal,
              tax: calc.tax,
              discount: calc.discount
            };

            this.isConfirmed = true;
            store.clearCart();
            showToast(`Razorpay Payment Successful! ID: ${response.razorpay_payment_id || ''} 🎉`, 'success');
            this.render();
          },
          prefill: {
            name: name,
            email: email || restaurantData.contact.email || 'info@growthifydigital.online',
            contact: phone
          },
          theme: {
            color: "#852e01"
          },
          modal: {
            ondismiss: () => {
              showToast('Razorpay payment window closed. You can retry or choose Cash payment.', 'info');
              if (submitBtn) {
                submitBtn.innerHTML = `Place Order (${this.orderType.toUpperCase()}) — ₹${calc.total}/-`;
                submitBtn.disabled = false;
              }
            }
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        return;
      }
    }

    setTimeout(() => {
      const placedOrder = store.placeOrder({
        orderId,
        customerName: name,
        phone,
        email,
        orderType: this.orderType,
        tableNumber: this.orderType === 'dine-in' ? tableNumber : null,
        deliveryAddress: this.orderType === 'delivery' ? `${deliveryAddress}, ${city} - ${pincode}` : null,
        paymentMethod: this.selectedPayment === 'cod' ? 'Cash on Delivery (COD)' : this.selectedPayment === 'counter' ? 'Pay at Counter' : 'Cash at Pickup Counter',
        items: [...store.cart],
        calc,
        total: calc.total,
        specialInstructions: instructions
      });

      this.confirmedOrderData = {
        ...placedOrder,
        subtotal: calc.subtotal,
        tax: calc.tax,
        discount: calc.discount
      };

      this.isConfirmed = true;
      store.clearCart();
      showToast('Order Placed Successfully! 🎉 Sent to Kitchen Dashboard!', 'success');
      this.render();
    }, 900);
  }

  open(preselectType = 'dine-in') {
    this.isOpen = true;
    this.isConfirmed = false;
    this.confirmedOrderData = null;
    this.orderType = preselectType;

    const tableNum = store.getTableNumber();
    if (tableNum) {
      this.orderType = 'dine-in';
      this.formData.tableNumber = tableNum;
    }

    this.render();
    this.backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen = false;
    this.backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

export const orderModal = new OrderModal();

export function openOrderModal(type = 'dine-in') {
  orderModal.open(type);
}
