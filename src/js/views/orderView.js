// Dedicated Order Page View Renderer
import { restaurantData } from '../../data/restaurantData.js';
import { store } from '../store.js';
import { openOrderModal } from '../components/orderModal.js';

export function renderOrderView() {
  const container = document.createElement('div');
  container.className = 'view-container';

  const tableNum = store.getTableNumber();
  const cart = store.cart;
  const calc = store.getCartCalculation('dine-in');

  container.innerHTML = `
    <!-- ORDER HERO HEADER -->
    <section class="section section-dark" style="padding: 4rem 0; text-align: center; background: linear-gradient(rgba(43,13,0,0.88), rgba(43,13,0,0.88)), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80') center/cover;">
      <div class="container">
        <div class="section-subtext" style="color: var(--warm-beige);">Online Ordering Hub</div>
        <h1 class="hero-title" style="margin-bottom: 0.5rem;">Order Your Favorites</h1>
        <p class="hero-desc" style="max-width: 600px; margin: 0 auto; color: var(--cream);">
          Freshly prepared gourmet dishes delivered straight to your table, for pickup, or home delivery.
        </p>
      </div>
    </section>

    <!-- MAIN ORDERING HUB CONTENT -->
    <section class="section">
      <div class="container">
        ${tableNum ? `
          <div class="qr-table-banner" style="margin-bottom: 2rem;">
            <span style="font-size: 1.5rem;">📍</span>
            <div>
              <strong>QR Code Table Detected:</strong> You are currently seated at <strong>Table ${tableNum}</strong>. Orders placed will be dispatched directly to your table!
            </div>
          </div>
        ` : ''}

        <div style="display: grid; grid-template-columns: 1fr; gap: 2.5rem;" class="order-page-layout">
          <!-- Quick Order Launcher Card -->
          <div style="background-color: var(--white); border-radius: var(--radius-lg); padding: 2.5rem; border: 1.5px solid var(--primary-border); box-shadow: var(--shadow-md); text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem; color: var(--primary);">✨</div>
            <h2 style="font-size: 2rem; color: var(--deep-espresso); margin-bottom: 0.75rem;">Fast 1-Click Restaurant Ordering</h2>
            <p style="color: var(--text-muted); max-width: 580px; margin: 0 auto 2rem; font-size: 1.05rem;">
              Click below to open our interactive Order Popup where you can select <strong>Dine-In (Table Number)</strong>, <strong>Takeaway</strong>, or <strong>Delivery</strong>, customize your dishes, and place your order instantly!
            </p>
            
            <button type="button" class="btn btn-primary open-order-popup-btn" style="padding: 1.1rem 2.5rem; font-size: 1.15rem;">
              🚀 Open Order Popup Now
            </button>
          </div>

          <!-- Quick Cart Overview on Order Page -->
          <div style="background-color: var(--white); border-radius: var(--radius-lg); padding: 2rem; border: 1px solid var(--primary-border); box-shadow: var(--shadow-sm);">
            <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1.5px solid var(--primary-border); padding-bottom: 1rem; margin-bottom: 1.5rem;">
              <h3 style="color: var(--deep-espresso);">Your Current Cart Summary (${store.getCartCount()} Items)</h3>
              <a href="#menu" class="btn btn-secondary btn-sm">+ Add More Dishes</a>
            </div>

            ${cart.length === 0 ? `
              <div style="text-align: center; padding: 2rem 1rem; color: var(--text-muted);">
                <p style="font-size: 1.1rem; margin-bottom: 1rem;">Your shopping cart is currently empty.</p>
                <a href="#menu" class="btn btn-primary btn-sm">Explore Menu Items</a>
              </div>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem;">
                ${cart.map(c => `
                  <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px dashed var(--cream); padding-bottom: 0.75rem;">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                      <img src="${c.item.image}" alt="${c.item.name}" style="width: 48px; height: 48px; border-radius: 6px; object-fit: cover;">
                      <div>
                        <strong style="display: block; font-size: 0.95rem;">${c.item.name}</strong>
                        <span style="font-size: 0.85rem; color: var(--primary); font-weight: 700;">₹${c.item.price} × ${c.quantity}</span>
                      </div>
                    </div>
                    <div style="font-weight: 800; font-size: 1.05rem; color: var(--deep-espresso);">
                      ₹${c.item.price * c.quantity}
                    </div>
                  </div>
                `).join('')}
              </div>

              <div style="background-color: var(--cream); padding: 1.25rem; border-radius: var(--radius-md); font-size: 0.95rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem; color: var(--text-muted);">
                  <span>Items Subtotal:</span>
                  <span>₹${calc.subtotal}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem; color: var(--text-muted);">
                  <span>Taxes (5% GST):</span>
                  <span>₹${calc.tax}</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 1.2rem; color: var(--deep-espresso); border-top: 1.5px solid var(--primary-border); padding-top: 0.5rem; margin-top: 0.5rem;">
                  <span>Grand Total:</span>
                  <span style="color: var(--primary);">₹${calc.total}</span>
                </div>
              </div>

              <button type="button" class="btn btn-primary btn-block open-order-popup-btn" style="margin-top: 1.5rem; padding: 1rem; font-size: 1.05rem;">
                Proceed to Checkout →
              </button>
            `}
          </div>
        </div>
      </div>
    </section>
  `;

  // Bind Events
  container.querySelectorAll('.open-order-popup-btn').forEach(btn => {
    btn.addEventListener('click', () => openOrderModal('dine-in'));
  });

  return container;
}
