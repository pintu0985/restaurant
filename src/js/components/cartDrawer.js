// Shopping Cart Slide-over Drawer Component with Customized Items & Add-ons Rendering
import { store } from '../store.js';
import { openOrderModal } from './orderModal.js';

class CartDrawer {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    this.createDrawerDOM();
    this.bindEvents();
  }

  createDrawerDOM() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'cart-drawer-overlay';
    this.overlay.id = 'cart-drawer-overlay';

    this.drawer = document.createElement('div');
    this.drawer.className = 'cart-drawer';
    this.drawer.id = 'cart-drawer';

    this.renderContent();

    document.body.appendChild(this.overlay);
    document.body.appendChild(this.drawer);
  }

  renderContent() {
    const cart = store.cart;
    // Use current order type from store, fall back to dine-in (no delivery fee by default)
    const orderType = (store.orderType) || 'dine-in';
    const calc = store.getCartCalculation(orderType);

    let itemsHTML = '';
    if (cart.length === 0) {
      itemsHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🛒</div>
          <h4 style="margin-bottom: 0.5rem;">Your Cart is Empty</h4>
          <p style="font-size: 0.9rem; margin-bottom: 1.5rem;">Looks like you haven't added any delicious dishes yet.</p>
          <a href="#menu" class="btn btn-primary btn-sm close-cart-link">Browse Menu</a>
        </div>
      `;
    } else {
      itemsHTML = cart.map(entry => {
        const item = entry.item;
        const entryId = entry.id || entry.configKey || item.id;
        const basePrice = Number(item.price) || 0;
        const addonsTotal = (entry.selectedAddons || []).reduce((sum, a) => sum + Number(a.price), 0);
        const unitPrice = entry.unitPrice || (basePrice + addonsTotal);
        const lineTotal = unitPrice * entry.quantity;

        return `
          <div class="cart-item" data-id="${entryId}" style="align-items: flex-start;">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img" style="margin-top: 4px;">
            <div class="cart-item-info">
              <div class="cart-item-title">${item.name}</div>
              
              <!-- Selected Add-ons List -->
              ${(entry.selectedAddons && entry.selectedAddons.length > 0) ? `
                <div style="margin-top: 4px; font-size: 0.8rem; color: var(--primary); background: var(--light-beige); padding: 4px 8px; border-radius: var(--radius-sm); border: 1px solid var(--primary-border);">
                  ${entry.selectedAddons.map(a => `<div>+ ${a.name} (₹${a.price}/-)</div>`).join('')}
                </div>
              ` : ''}

              <!-- Special Instructions -->
              ${entry.specialInstructions ? `
                <div style="font-size: 0.78rem; font-style: italic; color: var(--text-muted); margin-top: 4px;">
                  Note: "${entry.specialInstructions}"
                </div>
              ` : ''}

              <div class="cart-item-price" style="margin-top: 6px; font-weight: 800;">
                ₹${unitPrice}/- × ${entry.quantity} = ₹${lineTotal}/-
              </div>
            </div>

            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.5rem; flex-shrink: 0;">
              <div class="qty-control">
                <button type="button" class="qty-btn btn-minus" data-id="${entryId}">-</button>
                <span class="qty-val">${entry.quantity}</span>
                <button type="button" class="qty-btn btn-plus" data-id="${entryId}">+</button>
              </div>
              <button type="button" class="btn-remove" data-id="${entryId}" style="color: #c02626; font-size: 1.1rem; padding: 2px;" title="Remove Item">🗑️</button>
            </div>
          </div>
        `;
      }).join('');
    }

    this.drawer.innerHTML = `
      <div class="cart-header">
        <h3 class="cart-title">Your Order (${store.getCartCount()})</h3>
        <button type="button" class="icon-btn" id="close-cart-btn" aria-label="Close cart">✕</button>
      </div>

      <div class="cart-body">
        ${itemsHTML}
      </div>

      ${cart.length > 0 ? `
        <div class="cart-footer">
          <div class="cart-summary-row">
            <span>Subtotal</span>
            <span>₹${calc.subtotal}/-</span>
          </div>
          <div class="cart-summary-row">
            <span>Estimated Taxes (5% GST)</span>
            <span>₹${calc.tax}/-</span>
          </div>
          ${calc.discount > 0 ? `
            <div class="cart-summary-row" style="color: #166534; font-weight: 600;">
              <span>Special Offer Discount</span>
              <span>-₹${calc.discount}/-</span>
            </div>
          ` : ''}
          <div class="cart-summary-row total">
            <span>Grand Total</span>
            <span>₹${calc.total}/-</span>
          </div>
          <button type="button" class="btn btn-primary btn-block" id="cart-checkout-btn" style="margin-top: 1.25rem;">
            Proceed to Checkout →
          </button>
        </div>
      ` : ''}
    `;

    this.bindDynamicEvents();
  }

  bindEvents() {
    this.overlay.addEventListener('click', () => this.close());
    
    window.addEventListener('cart-updated', () => {
      this.renderContent();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
  }

  bindDynamicEvents() {
    const closeBtn = this.drawer.querySelector('#close-cart-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    const closeLink = this.drawer.querySelector('.close-cart-link');
    if (closeLink) closeLink.addEventListener('click', () => this.close());

    const checkoutBtn = this.drawer.querySelector('#cart-checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        this.close();
        openOrderModal();
      });
    }

    // Quantity buttons
    this.drawer.querySelectorAll('.btn-minus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const target = store.cart.find(i => (i.id === id || i.configKey === id || i.item.id === id));
        if (target) {
          store.updateQuantity(id, target.quantity - 1);
        }
      });
    });

    this.drawer.querySelectorAll('.btn-plus').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const target = store.cart.find(i => (i.id === id || i.configKey === id || i.item.id === id));
        if (target) {
          store.updateQuantity(id, target.quantity + 1);
        }
      });
    });

    this.drawer.querySelectorAll('.btn-remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        store.removeFromCart(id);
      });
    });
  }

  open() {
    this.isOpen = true;
    this.renderContent();
    this.overlay.classList.add('open');
    this.drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen = false;
    this.overlay.classList.remove('open');
    this.drawer.classList.remove('open');
    document.body.style.overflow = '';
  }
}

export const cartDrawer = new CartDrawer();
