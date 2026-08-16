// Restaurant Admin & Kitchen Live Management Dashboard View with PIN Passcode Security
import { store } from '../store.js';
import { showToast } from '../components/toast.js';

const ADMIN_PIN = 'Pintu@4234'; // Secret Password for restaurant staff & owner

export function renderDashboardView() {
  const container = document.createElement('div');
  container.className = 'view-container';

  let isAuthenticated = sessionStorage.getItem('desi_admin_auth') === 'true';
  let activeTab = 'orders'; // 'orders', 'inquiries'
  let orderFilter = 'all'; // 'all', 'active', 'completed', 'cancelled'

  function renderLoginScreen() {
    container.innerHTML = `
      <section class="section section-dark" style="min-height: 80vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #1f0a02 0%, #4a1900 100%);">
        <div class="container" style="max-width: 440px;">
          <div style="background: var(--white); border-radius: var(--radius-lg); padding: 2.5rem 2rem; border: 2px solid var(--gold-accent); box-shadow: 0 20px 50px rgba(0,0,0,0.5); text-align: center;">
            
            <div style="width: 70px; height: 70px; border-radius: 50%; background: var(--cream); border: 2px solid var(--primary-border); margin: 0 auto 1.25rem; display: flex; align-items: center; justify-content: center; font-size: 2rem;">
              🔒
            </div>

            <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--deep-espresso); margin-bottom: 0.35rem; font-family: var(--font-heading);">
              Admin Security Access
            </h2>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1.75rem;">
              Please enter your Secret Admin Password to open the Kitchen Management Portal.
            </p>

            <form id="admin-login-form">
              <div class="form-group" style="margin-bottom: 1.25rem;">
                <input type="password" id="admin-pin-input" class="form-control" placeholder="Enter Admin Password" maxlength="30" style="text-align: center; font-size: 1.15rem; letter-spacing: 2px; font-weight: 800; padding: 0.75rem;" autofocus required>
              </div>

              <div id="login-error-msg" style="color: #dc2626; font-size: 0.85rem; font-weight: 700; margin-bottom: 1rem; display: none;">
                ❌ Incorrect Passcode PIN! Access Denied.
              </div>

              <button type="submit" class="btn btn-primary btn-block" style="padding: 0.9rem; font-size: 1.05rem; font-weight: 800; background-color: var(--primary);">
                Unlock Admin Dashboard 🔓
              </button>
            </form>
          </div>
        </div>
      </section>
    `;

    const form = container.querySelector('#admin-login-form');
    const pinInput = container.querySelector('#admin-pin-input');
    const errorMsg = container.querySelector('#login-error-msg');

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const pin = pinInput ? pinInput.value.trim() : '';

        if (pin === ADMIN_PIN) {
          sessionStorage.setItem('desi_admin_auth', 'true');
          isAuthenticated = true;
          showToast('Welcome to Desi Tadka Admin Portal! 🔓', 'success');
          renderContent();
        } else {
          if (errorMsg) errorMsg.style.display = 'block';
          if (pinInput) {
            pinInput.value = '';
            pinInput.focus();
          }
        }
      });
    }
  }

  function renderContent() {
    if (!isAuthenticated) {
      renderLoginScreen();
      return;
    }

    const orders = store.getOrders();
    const inquiries = store.getInquiries();

    // Calculate Analytics
    const activeOrders = orders.filter(o => o.status !== 'Completed' && o.status !== 'Served' && o.status !== 'Cancelled');
    const completedOrders = orders.filter(o => o.status === 'Completed' || o.status === 'Served');
    const totalRevenue = completedOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0) + activeOrders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const unreadInquiries = inquiries.filter(i => i.status === 'Unread');

    // Filter orders
    const filteredOrders = orders.filter(o => {
      if (orderFilter === 'active') return o.status !== 'Completed' && o.status !== 'Served' && o.status !== 'Cancelled';
      if (orderFilter === 'completed') return o.status === 'Completed' || o.status === 'Served';
      if (orderFilter === 'cancelled') return o.status === 'Cancelled';
      return true;
    });

    container.innerHTML = `
      <!-- DASHBOARD HEADER -->
      <section class="section section-dark" style="padding: 3.5rem 0 2.5rem; background: linear-gradient(135deg, #1f0a02 0%, #4a1900 100%); border-bottom: 3px solid var(--gold-accent);">
        <div class="container">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <div class="section-subtext" style="color: var(--warm-beige);">Desi Tadka Admin Portal</div>
              <h1 class="hero-title" style="color: #ffffff; font-size: 2.2rem; font-family: var(--font-heading); margin: 0;">
                📊 Kitchen & Management Dashboard
              </h1>
            </div>
            
            <div style="display: flex; gap: 0.75rem; align-items: center; flex-wrap: wrap;">
              <button type="button" id="refresh-dashboard-btn" class="btn btn-outline" style="color: var(--cream); border-color: rgba(255,247,239,0.3); font-size: 0.88rem;">
                🔄 Refresh
              </button>
              <button type="button" id="admin-logout-btn" class="btn btn-primary" style="font-size: 0.88rem; background-color: #dc2626;">
                🔒 Lock Admin
              </button>
            </div>
          </div>

          <!-- TOP STATS CARDS -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; margin-top: 2rem;">
            
            <div style="background: rgba(255,247,239,0.08); border: 1px solid rgba(255,247,239,0.2); border-radius: var(--radius-md); padding: 1.25rem; color: #ffffff;">
              <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--warm-beige); letter-spacing: 1px;">Live Orders Revenue</div>
              <div style="font-size: 2rem; font-weight: 900; color: #fef3c7; font-family: var(--font-heading); margin-top: 0.2rem;">₹${totalRevenue}/-</div>
            </div>

            <div style="background: rgba(255,247,239,0.08); border: 1px solid rgba(255,247,239,0.2); border-radius: var(--radius-md); padding: 1.25rem; color: #ffffff;">
              <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--warm-beige); letter-spacing: 1px;">Kitchen Pending</div>
              <div style="font-size: 2rem; font-weight: 900; color: #f59e0b; font-family: var(--font-heading); margin-top: 0.2rem;">${activeOrders.length} Orders</div>
            </div>

            <div style="background: rgba(255,247,239,0.08); border: 1px solid rgba(255,247,239,0.2); border-radius: var(--radius-md); padding: 1.25rem; color: #ffffff;">
              <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--warm-beige); letter-spacing: 1px;">Served & Completed</div>
              <div style="font-size: 2rem; font-weight: 900; color: #4ade80; font-family: var(--font-heading); margin-top: 0.2rem;">${completedOrders.length} Orders</div>
            </div>

            <div style="background: rgba(255,247,239,0.08); border: 1px solid rgba(255,247,239,0.2); border-radius: var(--radius-md); padding: 1.25rem; color: #ffffff;">
              <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--warm-beige); letter-spacing: 1px;">Customer Enquiries</div>
              <div style="font-size: 2rem; font-weight: 900; color: #38bdf8; font-family: var(--font-heading); margin-top: 0.2rem;">${unreadInquiries.length} New</div>
            </div>

          </div>
        </div>
      </section>

      <!-- MAIN DASHBOARD CONTENT -->
      <section class="section" style="background-color: var(--cream); padding: 2.5rem 0;">
        <div class="container">
          
          <!-- TAB HEADERS -->
          <div style="display: flex; gap: 0.75rem; border-bottom: 2px solid var(--primary-border); padding-bottom: 0.75rem; margin-bottom: 2rem; overflow-x: auto;">
            <button type="button" class="tab-btn ${activeTab === 'orders' ? 'active' : ''}" data-tab="orders" style="font-weight: 800; font-size: 1rem; padding: 0.65rem 1.4rem;">
              🍳 Kitchen Orders (${orders.length})
            </button>
            <button type="button" class="tab-btn ${activeTab === 'inquiries' ? 'active' : ''}" data-tab="inquiries" style="font-weight: 800; font-size: 1rem; padding: 0.65rem 1.4rem;">
              📩 Customer Messages (${inquiries.length})
            </button>
          </div>

          <!-- TAB 1: KITCHEN ORDERS -->
          ${activeTab === 'orders' ? `
            
            <!-- ORDER SUB-FILTERS -->
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
              <button type="button" class="btn ${orderFilter === 'all' ? 'btn-primary' : 'btn-outline'}" data-filter="all" style="padding: 0.4rem 1rem; font-size: 0.85rem; font-weight: 700;">
                All Orders (${orders.length})
              </button>
              <button type="button" class="btn ${orderFilter === 'active' ? 'btn-primary' : 'btn-outline'}" data-filter="active" style="padding: 0.4rem 1rem; font-size: 0.85rem; font-weight: 700;">
                🔥 Pending & Preparing (${activeOrders.length})
              </button>
              <button type="button" class="btn ${orderFilter === 'completed' ? 'btn-primary' : 'btn-outline'}" data-filter="completed" style="padding: 0.4rem 1rem; font-size: 0.85rem; font-weight: 700;">
                ✅ Completed (${completedOrders.length})
              </button>
            </div>

            <!-- ORDERS GRID -->
            ${filteredOrders.length === 0 ? `
              <div style="background: var(--white); border: 1.5px solid var(--primary-border); border-radius: var(--radius-lg); padding: 3rem; text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🍳</div>
                <h3 style="font-size: 1.25rem; color: var(--deep-espresso);">No orders found in this filter</h3>
              </div>
            ` : `
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.5rem;">
                ${filteredOrders.map(o => `
                  <div style="background: var(--white); border: 2px solid ${o.status === 'Preparing' ? '#f59e0b' : o.status === 'Pending' ? '#852e01' : 'var(--primary-border)'}; border-radius: var(--radius-lg); padding: 1.5rem; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
                    
                    <div>
                      <!-- CARD TOP INFO -->
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.85rem; border-bottom: 1px dashed var(--primary-border); padding-bottom: 0.75rem;">
                        <div>
                          <span style="font-size: 0.78rem; font-weight: 800; text-transform: uppercase; background: var(--primary-subtle); color: var(--primary); padding: 2px 8px; border-radius: 4px;">
                            ${o.orderType === 'dine-in' ? ` Table ${o.tableNumber || 'Guest'}` : o.orderType.toUpperCase()}
                          </span>
                          <h3 style="font-size: 1.4rem; font-weight: 900; color: var(--deep-espresso); font-family: var(--font-heading); margin-top: 0.25rem; margin-bottom: 0;">
                            ${o.orderId}
                          </h3>
                        </div>

                        <div style="text-align: right;">
                          <span style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); display: block;">${o.timestampFormatted || 'Recently'}</span>
                          <span style="font-size: 0.88rem; font-weight: 800; color: ${o.status === 'Cancelled' ? '#dc2626' : o.status === 'Completed' || o.status === 'Served' ? '#166534' : 'var(--primary)'}; margin-top: 2px; display: inline-block;">
                            ${o.status}
                          </span>
                        </div>
                      </div>

                      <!-- CUSTOMER DETAILS -->
                      <div style="font-size: 0.88rem; color: var(--deep-espresso); margin-bottom: 0.85rem; background: var(--light-beige); padding: 0.6rem 0.85rem; border-radius: var(--radius-md);">
                        <div>👤 <strong>${o.customerName}</strong></div>
                        <div>📞 <a href="tel:${o.phone}" style="color: var(--primary); font-weight: 700;">${o.phone}</a></div>
                        ${o.deliveryAddress ? `<div style="margin-top: 2px; font-size: 0.82rem; color: var(--text-muted);">📍 ${o.deliveryAddress}</div>` : ''}
                      </div>

                      <!-- ITEMS LIST -->
                      <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem;">
                        ${(o.items || []).map(i => `
                          <div style="font-size: 0.9rem; border-bottom: 1px dashed var(--primary-border); padding-bottom: 0.35rem;">
                            <div style="display: flex; justify-content: space-between;">
                              <span style="font-weight: 700; color: var(--deep-espresso);">${i.item.name} × ${i.quantity}</span>
                              <span style="font-weight: 800; color: var(--primary);">₹${((Number(i.unitPrice) || Number(i.item.price) || 0) * i.quantity)}/-</span>
                            </div>
                            ${(i.selectedAddons && i.selectedAddons.length > 0) ? `
                              <div style="font-size: 0.78rem; color: var(--primary); font-weight: 600;">+ ${i.selectedAddons.map(a => a.name).join(', ')}</div>
                            ` : ''}
                          </div>
                        `).join('')}
                      </div>

                      ${o.specialInstructions ? `
                        <div style="font-size: 0.82rem; font-style: italic; background: #fff7ed; border-left: 3px solid var(--primary); padding: 0.4rem 0.75rem; margin-bottom: 1rem; color: var(--deep-espresso);">
                          Note: "${o.specialInstructions}"
                        </div>
                      ` : ''}
                    </div>

                    <!-- STATUS CHANGE BUTTONS -->
                    <div>
                      <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 1.15rem; color: var(--deep-espresso); margin-bottom: 0.85rem; border-top: 1.5px solid var(--primary-border); padding-top: 0.6rem;">
                        <span>Total:</span>
                        <span style="color: var(--primary);">₹${o.total}/- (${(o.paymentMethod || '').toUpperCase()})</span>
                      </div>

                      <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.35rem;">Update Order Status:</div>
                      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.4rem;">
                        <button type="button" class="btn btn-sm btn-status-change" data-id="${o.orderId}" data-status="Preparing" style="background: #f59e0b; color: #ffffff; padding: 0.4rem; font-weight: 700; font-size: 0.78rem;">
                          🍳 Preparing
                        </button>
                        <button type="button" class="btn btn-sm btn-status-change" data-id="${o.orderId}" data-status="Ready" style="background: #0284c7; color: #ffffff; padding: 0.4rem; font-weight: 700; font-size: 0.78rem;">
                           Ready / Out
                        </button>
                        <button type="button" class="btn btn-sm btn-status-change" data-id="${o.orderId}" data-status="Completed" style="background: #166534; color: #ffffff; padding: 0.4rem; font-weight: 700; font-size: 0.78rem;">
                          ✅ Completed
                        </button>
                        <button type="button" class="btn btn-sm btn-status-change" data-id="${o.orderId}" data-status="Cancelled" style="background: #dc2626; color: #ffffff; padding: 0.4rem; font-weight: 700; font-size: 0.78rem;">
                          ❌ Cancel
                        </button>
                      </div>
                    </div>

                  </div>
                `).join('')}
              </div>
            `}
          ` : `
            <!-- TAB 2: INQUIRIES & CONTACT MESSAGES -->
            ${inquiries.length === 0 ? `
              <div style="background: var(--white); border: 1.5px solid var(--primary-border); border-radius: var(--radius-lg); padding: 3rem; text-align: center;">
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📩</div>
                <h3 style="font-size: 1.25rem; color: var(--deep-espresso);">No customer inquiries received yet</h3>
              </div>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${inquiries.map(inq => `
                  <div style="background: var(--white); border: 1.5px solid var(--primary-border); border-radius: var(--radius-md); padding: 1.5rem; box-shadow: var(--shadow-sm);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
                      <div>
                        <span style="font-size: 0.78rem; font-weight: 800; background: var(--warm-beige); padding: 2px 8px; border-radius: 4px; color: var(--deep-espresso);">
                          ${inq.id} • ${inq.type.toUpperCase()}
                        </span>
                        <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--deep-espresso); font-family: var(--font-heading); margin-top: 0.25rem; margin-bottom: 0.1rem;">
                          ${inq.subject || 'Customer Enquiry'}
                        </h3>
                        <div style="font-size: 0.88rem; color: var(--text-muted);">
                          From: <strong>${inq.name}</strong> (${inq.email} | ${inq.phone})
                        </div>
                      </div>

                      <div style="text-align: right;">
                        <span style="font-size: 0.78rem; color: var(--text-muted); display: block;">${inq.dateFormatted || 'Recently'}</span>
                        <button type="button" class="btn btn-sm btn-mark-inquiry" data-id="${inq.id}" data-status="${inq.status === 'Read' ? 'Unread' : 'Read'}" style="margin-top: 0.35rem; padding: 0.25rem 0.75rem; font-size: 0.75rem; font-weight: 700; background: ${inq.status === 'Read' ? '#22c55e' : 'var(--primary)'}; color: #ffffff;">
                          ${inq.status === 'Read' ? '✓ Read' : 'Mark as Read'}
                        </button>
                      </div>
                    </div>

                    <div style="font-size: 0.95rem; color: var(--deep-espresso); line-height: 1.6; background: var(--cream); padding: 1rem; border-radius: var(--radius-md); border-left: 3.5px solid var(--primary);">
                      "${inq.message}"
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          `}

        </div>
      </section>
    `;

    // Bind Logout Button
    const logoutBtn = container.querySelector('#admin-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('desi_admin_auth');
        isAuthenticated = false;
        showToast('Admin Portal Locked 🔒', 'info');
        renderContent();
      });
    }

    // Bind Tab Switching Events
    container.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeTab = e.currentTarget.dataset.tab;
        renderContent();
      });
    });

    // Bind Order Sub-Filter Buttons
    container.querySelectorAll('button[data-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        orderFilter = e.currentTarget.dataset.filter;
        renderContent();
      });
    });

    // Bind Refresh Button
    const refreshBtn = container.querySelector('#refresh-dashboard-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => renderContent());
    }

    // Bind Order Status Change Buttons
    container.querySelectorAll('.btn-status-change').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const status = e.currentTarget.dataset.status;
        store.updateOrderStatus(id, status);
        renderContent();
      });
    });

    // Bind Mark Inquiry Status Buttons
    container.querySelectorAll('.btn-mark-inquiry').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const newStatus = e.currentTarget.dataset.status;
        store.markInquiryStatus(id, newStatus);
        renderContent();
      });
    });
  }

  renderContent();

  // Listen for real-time orders & inquiries events
  const handleOrdersUpdate = () => {
    if (isAuthenticated) renderContent();
  };
  const handleInquiriesUpdate = () => {
    if (isAuthenticated) renderContent();
  };

  window.addEventListener('orders-updated', handleOrdersUpdate);
  window.addEventListener('inquiries-updated', handleInquiriesUpdate);

  return container;
}
