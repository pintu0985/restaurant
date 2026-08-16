// Traditional Punjabi Dhaba Menu Page Renderer with Live Search & Dotted Price Menu Layout
import { restaurantData } from '../../data/restaurantData.js';
import { store } from '../store.js';
import { openOrderModal } from '../components/orderModal.js';
import { openItemCustomizationModal } from '../components/itemCustomizationModal.js';

export function renderMenuView() {
  const container = document.createElement('div');
  container.className = 'view-container';

  let currentCategory = 'all';
  let activeDietary = [];
  let searchQuery = '';
  let viewMode = 'printed'; // 'printed' (Traditional Dotted Menu Card) or 'grid' (Image Cards)

  // Check URL hash query parameters e.g. #menu?cat=paneer-tikka
  if (window.location.hash.includes('?cat=')) {
    const paramStr = window.location.hash.split('?')[1];
    const params = new URLSearchParams(paramStr);
    if (params.has('cat')) {
      currentCategory = params.get('cat');
    }
  }

  function getFilteredItems() {
    const menuList = (store.menuItems && store.menuItems.length > 0) ? store.menuItems : restaurantData.menuItems;
    return menuList.filter(item => {
      // Category check
      if (currentCategory !== 'all' && String(item.category).toLowerCase() !== String(currentCategory).toLowerCase()) {
        return false;
      }
      // Dietary check
      if (activeDietary.includes('veg') && !item.isVeg) return false;
      if (activeDietary.includes('spicy') && !item.isSpicy) return false;
      if (activeDietary.includes('bestseller') && !item.isBestseller) return false;
      if (activeDietary.includes('new') && !item.isNew) return false;

      // Search query check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description ? item.description.toLowerCase().includes(q) : false;
        const matchesCat = item.category.toLowerCase().includes(q);
        return matchesName || matchesDesc || matchesCat;
      }

      return true;
    });
  }

  function renderMenuContent() {
    const contentArea = container.querySelector('#menu-content-area');
    if (!contentArea) return;

    const items = getFilteredItems();

    if (items.length === 0) {
      contentArea.innerHTML = `
        <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <div style="font-size: 3.5rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="color: var(--deep-espresso); margin-bottom: 0.5rem;">Koi Dish Nahi Mili</h3>
          <p style="margin-bottom: 1.5rem;">Kripya search query ya filters change karein.</p>
          <button type="button" class="btn btn-secondary btn-sm" id="reset-menu-filters">Reset All Filters</button>
        </div>
      `;
      const resetBtn = contentArea.querySelector('#reset-menu-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          currentCategory = 'all';
          activeDietary = [];
          searchQuery = '';
          const searchInput = container.querySelector('#menu-search-input');
          if (searchInput) searchInput.value = '';
          updateUI();
        });
      }
      return;
    }

    if (viewMode === 'printed') {
      // Group items by category for Traditional Punjabi Printed Menu Card view
      const categoriesToRender = currentCategory === 'all' 
        ? restaurantData.categories.filter(c => c.id !== 'all' && c.id !== 'balle-balle-feast')
        : restaurantData.categories.filter(c => c.id === currentCategory);

      let html = '';
      categoriesToRender.forEach(cat => {
        const catItems = items.filter(i => i.category === cat.id);
        if (catItems.length === 0) return;

        html += `
          <div class="punjabi-category-banner" id="cat-section-${cat.id}">
            <div class="punjabi-category-title">
              <span>${cat.icon}</span>
              <span>${cat.name}</span>
            </div>
            <span style="font-size: 0.85rem; font-weight: 700; color: #fef3c7;">${catItems.length} Items</span>
          </div>

          <div class="punjabi-menu-card">
            ${catItems.map(dish => {
              const inCart = store.cart.find(c => c.item.id === dish.id);
              return `
                <div class="menu-item-row" data-id="${dish.id}">
                  <div class="menu-item-left">
                    <span class="${dish.isVeg ? 'badge-veg' : 'badge-nonveg'}" title="100% Pure Veg" style="flex-shrink: 0;"></span>
                    <span class="menu-item-name">${dish.name}</span>
                    ${dish.isSpicy ? `<span title="Spicy" style="margin-left: 4px;">🌶️</span>` : ''}
                    ${dish.isBestseller ? `<span class="tag-pill tag-bestseller" style="font-size: 0.68rem; padding: 1px 5px;">⭐ BESTSELLER</span>` : ''}
                    ${dish.isNew ? `<span class="tag-pill tag-new" style="font-size: 0.68rem; padding: 1px 5px;">NEW</span>` : ''}
                  </div>
                  
                  <div class="menu-dots-leader"></div>

                  <div style="display: flex; align-items: center; gap: 0.75rem; flex-shrink: 0;">
                    <div class="menu-item-price">₹${dish.price}/-</div>
                    ${inCart ? `
                      <span style="background-color: var(--primary-subtle); color: var(--primary); font-weight: 800; font-size: 0.8rem; padding: 2px 8px; border-radius: var(--radius-full);">
                        In Cart (${inCart.quantity})
                      </span>
                    ` : ''}
                    <button type="button" class="btn btn-primary btn-sm menu-quick-add" data-id="${dish.id}" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;">
                      + Add
                    </button>
                  </div>
                </div>
                ${dish.description ? `
                  <div style="font-size: 0.82rem; color: var(--text-muted); padding-left: 1.8rem; margin-top: -4px; margin-bottom: 6px;">
                    ${dish.description}
                  </div>
                ` : ''}
              `;
            }).join('')}
          </div>
        `;
      });

      contentArea.innerHTML = html;
    } else {
      // Modern Gourmet Card Grid View
      contentArea.innerHTML = `
        <div class="food-grid">
          ${items.map(dish => {
            const cartItem = store.cart.find(i => i.item.id === dish.id);
            const currentQty = cartItem ? cartItem.quantity : 1;

            return `
              <div class="food-card" data-id="${dish.id}">
                <div class="food-card-img-wrap">
                  <img src="${dish.image}" alt="${dish.name}" class="food-card-img">
                  <div class="food-card-badges">
                    <span class="${dish.isVeg ? 'badge-veg' : 'badge-nonveg'}" title="Vegetarian"></span>
                    ${dish.isBestseller ? `<span class="tag-pill tag-bestseller">⭐ Bestseller</span>` : ''}
                    ${dish.isSpicy ? `<span class="tag-pill tag-spicy">🌶️ Spicy</span>` : ''}
                    ${dish.isNew ? `<span class="tag-pill tag-new">🆕 NEW</span>` : ''}
                  </div>
                  <div class="food-card-rating">
                    <span class="star-icon">★</span>
                    <span>${dish.rating}</span>
                  </div>
                </div>

                <div class="food-card-body">
                  <div class="food-card-header">
                    <h3 class="food-card-title">${dish.name}</h3>
                  </div>
                  <p class="food-card-desc">${dish.description || ''}</p>
                  <div class="food-card-footer">
                    <div class="food-card-price" style="font-size: 0.92rem; font-weight: 800; color: var(--primary);">
                      ${(dish.halfPrice && dish.fullPrice && dish.halfPrice > 0) ? `Half — ₹${dish.halfPrice}/- | Full — ₹${dish.fullPrice}/-` : `₹${dish.price}/-`}
                    </div>
                    ${dish.available === false ? `
                      <span class="btn btn-secondary btn-sm" style="opacity: 0.6; cursor: not-allowed;">Out of Stock</span>
                    ` : `
                      <button type="button" class="btn btn-primary btn-sm menu-grid-add" data-id="${dish.id}">
                        + Add to Order
                      </button>
                    `}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    bindContentEvents();
  }

  function bindContentEvents() {
    const contentArea = container.querySelector('#menu-content-area');
    if (!contentArea) return;

    contentArea.querySelectorAll('.menu-quick-add, .menu-grid-add').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const menuList = (store.menuItems && store.menuItems.length > 0) ? store.menuItems : restaurantData.menuItems;
        const dish = menuList.find(i => String(i.id) === String(id));
        if (dish) {
          openItemCustomizationModal(dish);
        }
      });
    });
  }

  // Listen for Google Sheets Menu API sync
  const menuUpdateHandler = () => renderMenuContent();
  window.addEventListener('menu-updated', menuUpdateHandler);

  function updateUI() {
    container.querySelectorAll('.tab-btn').forEach(btn => {
      if (btn.dataset.cat === currentCategory) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    container.querySelectorAll('.diet-pill').forEach(pill => {
      if (activeDietary.includes(pill.dataset.diet)) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    renderMenuContent();
  }

  const feast = restaurantData.balleBalleFeast;

  container.innerHTML = `
    <!-- MENU HERO HEADER -->
    <section class="section section-dark" style="padding: 4rem 0; text-align: center; background: linear-gradient(rgba(43,13,0,0.88), rgba(43,13,0,0.88)), url('https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80') center/cover;">
      <div class="container">
        <div class="section-subtext" style="color: var(--gold-light);">Pure Veg Restaurant • Authentic Indian Taste</div>
        <h1 class="hero-title" style="margin-bottom: 0.5rem;">Desi Tadka — Complete Menu</h1>
        <p class="hero-desc" style="max-width: 720px; margin: 0 auto; color: var(--cream);">
          Pure Veg Restaurant. Traditional Flavors, Wood-Fired Tandoori Delights, Amritsari Kulche, Dal Makhani & Special Lassi.
        </p>
      </div>
    </section>

    <!-- MENU CONTAINER -->
    <section class="section">
      <div class="container">
        
        <!-- BALLE-BALLE FEAST UNLIMITED BANNER CARD -->
        <div class="balle-feast-card">
          <div class="balle-feast-badge">BEST VALUE</div>
          <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
            <span style="font-size: 2.5rem;">🎉</span>
            <div>
              <h2 style="font-size: 2rem; color: var(--gold-light); margin-bottom: 0.25rem;">${feast.title}</h2>
              <p style="font-size: 1.15rem; color: var(--cream); font-weight: 700;">${feast.subtitle}</p>
            </div>
          </div>

          <div class="balle-feast-grid">
            <div class="balle-feast-box">
              <h4>🍹 Mocktail (Single Serving)</h4>
              <p style="font-size: 0.9rem; color: rgba(255,255,255,0.9);">${feast.mocktail}</p>
            </div>
            <div class="balle-feast-box">
              <h4>🍢 Unlimited Starters (7 Varieties)</h4>
              <p style="font-size: 0.85rem; color: rgba(255,255,255,0.88); line-height: 1.5;">${feast.starters.join(' • ')}</p>
            </div>
            <div class="balle-feast-box">
              <h4>🍛 Unlimited Main Course Buffet</h4>
              <p style="font-size: 0.85rem; color: rgba(255,255,255,0.88); line-height: 1.5;">${feast.mains.join(' • ')}</p>
            </div>
            <div class="balle-feast-box">
              <h4>🍨 Desserts & Ice Cream</h4>
              <p style="font-size: 0.85rem; color: rgba(255,255,255,0.88);">${feast.desserts.join(', ')} + ${feast.iceCream.join(', ')}</p>
            </div>
          </div>

          <div style="margin-top: 1.5rem; text-align: right;">
            <button type="button" class="btn btn-primary book-feast-btn" style="background-color: var(--gold-accent); color: var(--deep-espresso); font-weight: 800;">
              Reserve Table For Balle-Balle Feast →
            </button>
          </div>
        </div>

        <!-- SEARCH BAR & VIEW SWITCHER -->
        <div class="menu-controls">
          <div style="display: flex; gap: 1rem; align-items: center; justify-content: space-between; flex-wrap: wrap;">
            <!-- Live Search Bar -->
            <div class="search-box" style="flex-grow: 1; max-width: 550px; margin: 0;">
              <span class="search-icon-inside">🔍</span>
              <input type="text" id="menu-search-input" class="search-input" placeholder="Search dish (e.g. Dal Makhani, Paneer Tikka, Kulcha, Lassi)..." value="${searchQuery}">
            </div>

            <!-- View Switcher Tabs -->
            <div style="display: flex; background: var(--white); border: 1.5px solid var(--primary-border); border-radius: var(--radius-full); padding: 4px;">
              <button type="button" class="tab-btn view-switch-btn ${viewMode === 'printed' ? 'active' : ''}" data-mode="printed" style="padding: 0.4rem 1rem; font-size: 0.85rem;">
                📜 Printed Menu (Dotted)
              </button>
              <button type="button" class="tab-btn view-switch-btn ${viewMode === 'grid' ? 'active' : ''}" data-mode="grid" style="padding: 0.4rem 1rem; font-size: 0.85rem;">
                🖼️ Image Cards Grid
              </button>
            </div>
          </div>

          <!-- Category Filter Tabs -->
          <div class="category-tabs" style="justify-content: flex-start; overflow-x: auto; padding-bottom: 6px;">
            ${restaurantData.categories.map(c => `
              <button type="button" class="tab-btn ${currentCategory === c.id ? 'active' : ''}" data-cat="${c.id}" style="white-space: nowrap;">
                <span>${c.icon}</span>
                <span>${c.name}</span>
              </button>
            `).join('')}
          </div>

          <!-- Dietary Filter Pills -->
          <div class="dietary-filters" style="justify-content: flex-start;">
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-right: 0.5rem;">Filters:</span>
            ${restaurantData.dietaryFilters.map(d => `
              <button type="button" class="diet-pill ${activeDietary.includes(d.id) ? 'active' : ''}" data-diet="${d.id}">
                ${d.icon} ${d.name}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- MAIN MENU DYNAMIC CONTENT AREA -->
        <div id="menu-content-area"></div>

        <!-- TERMS & CONDITIONS FOOTER BOX -->
        <div class="menu-terms-card">
          <h3 style="color: var(--primary); font-size: 1.3rem; margin-bottom: 1rem; border-bottom: 1.5px dashed var(--primary-border); padding-bottom: 0.5rem;">
            📌 Terms & Conditions / Menu Rules
          </h3>
          <ol class="menu-terms-list">
            ${restaurantData.menuTerms.map(term => `<li>${term}</li>`).join('')}
          </ol>
        </div>

      </div>
    </section>
  `;

  // Bind Control Events
  const searchInput = container.querySelector('#menu-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderMenuContent();
    });
  }

  container.querySelectorAll('.view-switch-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      viewMode = e.currentTarget.dataset.mode;
      container.querySelectorAll('.view-switch-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');
      renderMenuContent();
    });
  });

  container.querySelectorAll('.tab-btn[data-cat]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentCategory = e.currentTarget.dataset.cat;
      updateUI();
    });
  });

  container.querySelectorAll('.diet-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      const diet = e.currentTarget.dataset.diet;
      if (activeDietary.includes(diet)) {
        activeDietary = activeDietary.filter(d => d !== diet);
      } else {
        activeDietary.push(diet);
      }
      updateUI();
    });
  });

  const bookFeastBtn = container.querySelector('.book-feast-btn');
  if (bookFeastBtn) {
    bookFeastBtn.addEventListener('click', () => openOrderModal('dine-in'));
  }

  // Initial menu render
  setTimeout(() => renderMenuContent(), 0);

  return container;
}
