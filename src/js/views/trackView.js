// Customer Live Order Tracking View with Real-time Status Updates
import { store } from '../store.js';

export function renderTrackView() {
  const container = document.createElement('div');
  container.className = 'view-container';

  // Extract order ID from URL hash query e.g. #track?id=#ORD-84920
  let orderId = null;
  if (window.location.hash.includes('?id=')) {
    const query = window.location.hash.split('?id=')[1];
    orderId = decodeURIComponent(query);
  } else {
    orderId = store.getLastActiveOrderId();
  }

  function getStatusProgress(status) {
    switch ((status || '').toLowerCase()) {
      case 'pending':
      case 'received':
        return 25;
      case 'preparing':
        return 50;
      case 'ready':
      case 'out for delivery':
        return 75;
      case 'served':
      case 'completed':
      case 'delivered':
        return 100;
      case 'cancelled':
        return 0;
      default:
        return 25;
    }
  }

  function renderContent() {
    const order = store.getOrderById(orderId);
    const progress = order ? getStatusProgress(order.status) : 0;

    container.innerHTML = `
      <!-- HERO -->
      <section class="section section-dark" style="padding: 4rem 0 3rem; text-align: center; background: linear-gradient(135deg, rgba(31,10,2,0.95), rgba(74,25,0,0.9)), url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80') center/cover; border-bottom: 3px solid var(--gold-accent);">
        <div class="container" style="max-width: 800px;">
          <div class="section-subtext" style="color: var(--warm-beige);">Real-Time Kitchen Sync</div>
          <h1 class="hero-title" style="color: #ffffff; font-size: 2.4rem; font-family: var(--font-heading); margin-bottom: 0.75rem;">
             Live Order Tracking
          </h1>
          <p style="color: var(--cream); font-size: 1.05rem; max-width: 580px; margin: 0 auto 1.5rem;">
            Track your freshly prepared Punjabi meal live as our kitchen chefs cook and assemble your order.
          </p>

          <!-- ORDER ID SEARCH INPUT BAR -->
          <div style="display: flex; gap: 0.5rem; max-width: 480px; margin: 0 auto; background: rgba(255,247,239,0.1); padding: 6px; border-radius: 50px; border: 1.5px solid var(--gold-accent);">
            <input type="text" id="track-order-id-input" placeholder="Enter Order ID (e.g. #ORD-84920)" value="${orderId || ''}" style="flex-grow: 1; border: none; background: transparent; padding: 0.6rem 1.25rem; color: #ffffff; font-weight: 700; font-size: 0.95rem; outline: none;">
            <button type="button" id="track-search-btn" class="btn btn-primary" style="padding: 0.6rem 1.4rem; border-radius: 40px; font-weight: 800; background-color: var(--primary);">
              Track 🔍
            </button>
          </div>
        </div>
      </section>

      <!-- MAIN STATUS CONTAINER -->
      <section class="section" style="background-color: var(--cream); padding: 3.5rem 0;">
        <div class="container" style="max-width: 800px;">
          
          ${!order ? `
            <div style="background: var(--white); border: 2px solid var(--primary-border); border-radius: var(--radius-lg); padding: 3rem 1.5rem; text-align: center; box-shadow: var(--shadow-sm);">
              <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
              <h3 style="font-size: 1.5rem; color: var(--deep-espresso); margin-bottom: 0.5rem; font-family: var(--font-heading);">No Order Selected</h3>
              <p style="color: var(--text-muted); font-size: 1rem; max-width: 460px; margin: 0 auto 1.5rem;">
                Please enter your Order ID above or place a fresh order from our delicious Punjabi menu!
              </p>
              <a href="#menu" class="btn btn-primary" style="padding: 0.85rem 1.75rem; font-weight: 800;">
                🍲 Browse Menu & Order
              </a>
            </div>
          ` : `
            <!-- LIVE TRACKER CARD -->
            <div style="background: var(--white); border: 2px solid var(--primary-border); border-radius: var(--radius-lg); padding: 2.25rem; box-shadow: var(--shadow-md); margin-bottom: 2rem;">
              
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; border-bottom: 1.5px dashed var(--primary-border); padding-bottom: 1.25rem; margin-bottom: 1.5rem;">
                <div>
                  <span style="background: var(--primary-subtle); color: var(--primary); font-weight: 800; padding: 4px 12px; border-radius: 50px; font-size: 0.82rem; text-transform: uppercase;">
                    ${order.orderType === 'dine-in' ? ` Table ${order.tableNumber || 'Guest'}` : order.orderType.toUpperCase()}
                  </span>
                  <h2 style="font-size: 1.75rem; font-weight: 900; color: var(--deep-espresso); font-family: var(--font-heading); margin-top: 0.35rem; margin-bottom: 0.1rem;">
                    ${order.orderId}
                  </h2>
                  <div style="font-size: 0.88rem; color: var(--text-muted);">
                    Guest: <strong>${order.customerName}</strong> (${order.phone})
                  </div>
                </div>

                <div style="text-align: right;">
                  <div style="font-size: 0.78rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); font-weight: 700;">Current Status</div>
                  <div style="font-size: 1.35rem; font-weight: 900; color: ${order.status === 'Cancelled' ? '#dc2626' : 'var(--primary)'}; font-family: var(--font-heading); display: inline-flex; align-items: center; gap: 0.35rem;">
                    ${order.status === 'Pending' ? '⏳ Order Received' :
                      order.status === 'Preparing' ? '🍳 Preparing in Kitchen' :
                      order.status === 'Ready' || order.status === 'Out for Delivery' ? ' Ready / On The Way' :
                      order.status === 'Served' || order.status === 'Completed' ? '✅ Served & Completed' :
                      '❌ Order Cancelled'}
                  </div>
                </div>
              </div>

              <!-- PROGRESS BAR -->
              <div style="margin: 2rem 0;">
                <div style="height: 8px; background: var(--warm-beige); border-radius: 10px; overflow: hidden; position: relative; margin-bottom: 1.5rem;">
                  <div style="height: 100%; width: ${progress}%; background: linear-gradient(90deg, #852e01 0%, #22c55e 100%); transition: width 0.5s ease-in-out;"></div>
                </div>

                <!-- 4 STEP NODES -->
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); text-align: center; gap: 0.5rem;">
                  <div>
                    <div style="width: 38px; height: 38px; border-radius: 50%; margin: 0 auto 0.4rem; background: ${progress >= 25 ? '#852e01' : 'var(--warm-beige)'}; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem;">
                      ${progress >= 25 ? '✓' : '1'}
                    </div>
                    <div style="font-size: 0.85rem; font-weight: 700; color: ${progress >= 25 ? 'var(--deep-espresso)' : 'var(--text-muted)'};">
                      Received
                    </div>
                  </div>

                  <div>
                    <div style="width: 38px; height: 38px; border-radius: 50%; margin: 0 auto 0.4rem; background: ${progress >= 50 ? '#852e01' : 'var(--warm-beige)'}; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem;">
                      ${progress >= 50 ? '🍳' : '2'}
                    </div>
                    <div style="font-size: 0.85rem; font-weight: 700; color: ${progress >= 50 ? 'var(--deep-espresso)' : 'var(--text-muted)'};">
                      Preparing
                    </div>
                  </div>

                  <div>
                    <div style="width: 38px; height: 38px; border-radius: 50%; margin: 0 auto 0.4rem; background: ${progress >= 75 ? '#852e01' : 'var(--warm-beige)'}; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem;">
                      ${progress >= 75 ? '' : '3'}
                    </div>
                    <div style="font-size: 0.85rem; font-weight: 700; color: ${progress >= 75 ? 'var(--deep-espresso)' : 'var(--text-muted)'};">
                      ${order.orderType === 'delivery' ? 'Out for Delivery' : 'Ready'}
                    </div>
                  </div>

                  <div>
                    <div style="width: 38px; height: 38px; border-radius: 50%; margin: 0 auto 0.4rem; background: ${progress >= 100 ? '#22c55e' : 'var(--warm-beige)'}; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1rem;">
                      ${progress >= 100 ? '✅' : '4'}
                    </div>
                    <div style="font-size: 0.85rem; font-weight: 700; color: ${progress >= 100 ? 'var(--deep-espresso)' : 'var(--text-muted)'};">
                      ${order.orderType === 'dine-in' ? 'Served' : 'Completed'}
                    </div>
                  </div>
                </div>
              </div>

              <!-- ORDER ITEMS BREAKDOWN -->
              <div style="background: var(--cream); padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--primary-border); margin-top: 1.5rem;">
                <h4 style="font-size: 1.05rem; font-weight: 800; color: var(--deep-espresso); margin-bottom: 0.75rem;">
                  📋 Order Items Summary
                </h4>

                <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1rem;">
                  ${(order.items || []).map(i => `
                    <div style="display: flex; justify-content: space-between; font-size: 0.92rem; border-bottom: 1px dashed var(--primary-border); padding-bottom: 0.4rem;">
                      <div>
                        <strong style="color: var(--deep-espresso);">${i.item.name} × ${i.quantity}</strong>
                        ${(i.selectedAddons && i.selectedAddons.length > 0) ? `
                          <div style="font-size: 0.8rem; color: var(--primary); font-weight: 600;">
                            ${i.selectedAddons.map(a => `+ ${a.name}`).join(', ')}
                          </div>
                        ` : ''}
                      </div>
                      <span style="font-weight: 800; color: var(--primary);">₹${((Number(i.unitPrice) || Number(i.item.price) || 0) * i.quantity)}/-</span>
                    </div>
                  `).join('')}
                </div>

                <div style="display: flex; justify-content: space-between; font-weight: 900; font-size: 1.2rem; color: var(--deep-espresso); border-top: 1.5px solid var(--primary-border); padding-top: 0.6rem;">
                  <span>Grand Total Paid:</span>
                  <span style="color: var(--primary);">₹${order.total}/-</span>
                </div>
              </div>
            </div>
          `}

          <!-- REAL-TIME SYNC NOTICE BANNER -->
          <div style="background: #ffffff; border: 1.5px solid var(--primary-border); border-radius: var(--radius-md); padding: 1.25rem; text-align: center; font-size: 0.9rem; color: var(--text-muted);">
            ⚡ <strong>Live Real-time Sync Active:</strong> This screen automatically updates as soon as the kitchen updates your order status!
          </div>

        </div>
      </section>
    `;

    // Bind Search Button & Input
    const searchBtn = container.querySelector('#track-search-btn');
    const searchInput = container.querySelector('#track-order-id-input');

    const handleSearch = () => {
      const val = searchInput ? searchInput.value.trim() : '';
      if (val) {
        orderId = val;
        window.location.hash = `#track?id=${encodeURIComponent(val)}`;
        renderContent();
      }
    };

    if (searchBtn) searchBtn.addEventListener('click', handleSearch);
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSearch();
      });
    }
  }

  renderContent();

  // Listen to real-time order updates from kitchen dashboard
  const handleOrdersUpdate = () => {
    renderContent();
  };
  window.addEventListener('orders-updated', handleOrdersUpdate);

  return container;
}
