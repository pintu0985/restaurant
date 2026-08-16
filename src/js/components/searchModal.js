// Global Instant Dish Search Modal Component
import { restaurantData } from '../../data/restaurantData.js';
import { store } from '../store.js';
import { openItemCustomizationModal } from './itemCustomizationModal.js';

class SearchModal {
  constructor() {
    this.isOpen = false;
    this.query = '';
    this.init();
  }

  init() {
    this.createDOM();
    this.bindEvents();
  }

  createDOM() {
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'order-modal-backdrop';
    this.backdrop.id = 'global-search-backdrop';

    this.card = document.createElement('div');
    this.card.className = 'order-modal-card';
    this.card.style.maxWidth = '680px';

    this.render();

    this.backdrop.appendChild(this.card);
    document.body.appendChild(this.backdrop);
  }

  render() {
    let results = [];
    if (this.query.trim()) {
      const q = this.query.toLowerCase();
      results = restaurantData.menuItems.filter(item => {
        const nameMatch = item.name.toLowerCase().includes(q);
        const descMatch = item.description ? item.description.toLowerCase().includes(q) : false;
        const catMatch = item.category.toLowerCase().includes(q);
        return nameMatch || descMatch || catMatch;
      });
    }

    this.card.innerHTML = `
      <div class="order-modal-header" style="background-color: var(--white); border-bottom: 1.5px solid var(--primary-border);">
        <div style="position: relative; flex-grow: 1; margin-right: 1rem;">
          <span style="position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); font-size: 1.2rem; color: var(--primary);">🔍</span>
          <input type="text" id="global-search-input" class="form-control" placeholder="Search 120+ dishes (e.g. Paneer Tikka, Dal Makhani, Kulcha, Lassi)..." value="${this.query}" style="padding-left: 3rem; font-size: 1.05rem; border-radius: var(--radius-full); border-color: var(--primary);">
        </div>
        <button class="icon-btn" id="close-search-modal" aria-label="Close search">✕</button>
      </div>

      <div class="order-modal-body" style="padding: 1.5rem; max-height: 440px; overflow-y: auto;">
        ${!this.query.trim() ? `
          <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
            <div style="font-size: 3rem; margin-bottom: 0.75rem;">🔍</div>
            <h4 style="color: var(--deep-espresso); margin-bottom: 0.5rem;">Search Any Dish or Drink</h4>
            <p style="font-size: 0.9rem; max-width: 400px; margin: 0 auto 1.5rem;">
              Type dish name, ingredient (Paneer, Chaap, Biryani, Naan, Lassi) to get instant results.
            </p>
            <div style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
              <span class="search-tag-chip" data-q="Paneer Tikka">🧀 Paneer Tikka</span>
              <span class="search-tag-chip" data-q="Dal Makhani">🍛 Dal Makhani</span>
              <span class="search-tag-chip" data-q="Amritsari Kulcha">🫓 Amritsari Kulcha</span>
              <span class="search-tag-chip" data-q="Patiala Lassi">🥛 Patiala Lassi</span>
              <span class="search-tag-chip" data-q="Gulab Jamun">🍰 Gulab Jamun</span>
            </div>
          </div>
        ` : results.length === 0 ? `
          <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
            <div style="font-size: 3rem; margin-bottom: 0.75rem;">😕</div>
            <h4 style="color: var(--deep-espresso); margin-bottom: 0.5rem;">No dishes found for "${this.query}"</h4>
            <p style="font-size: 0.9rem;">Check for spelling errors or try searching for general items like 'Paneer', 'Rotis', or 'Biryani'.</p>
          </div>
        ` : `
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--primary); margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 1px;">
            Found ${results.length} matching dish${results.length > 1 ? 'es' : ''}:
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${results.map(dish => {
              const inCart = store.cart.find(i => i.item.id === dish.id);
              return `
                <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem; border: 1px solid var(--primary-border); border-radius: var(--radius-md); background: var(--white); gap: 1rem;">
                  <img src="${dish.image}" alt="${dish.name}" style="width: 56px; height: 56px; border-radius: var(--radius-sm); object-fit: cover;">
                  <div style="flex-grow: 1;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <span class="${dish.isVeg ? 'badge-veg' : 'badge-nonveg'}"></span>
                      <strong style="font-size: 1rem; color: var(--deep-espresso);">${dish.name}</strong>
                      ${dish.isBestseller ? `<span class="tag-pill tag-bestseller" style="font-size: 0.65rem; padding: 1px 5px;">⭐ BESTSELLER</span>` : ''}
                    </div>
                    <div style="font-size: 0.9rem; color: var(--primary); font-weight: 800; margin-top: 2px;">₹${dish.price}/-</div>
                    ${dish.description ? `<div style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.3;">${dish.description}</div>` : ''}
                  </div>
                  
                  <div style="display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0;">
                    ${inCart ? `
                      <span style="font-size: 0.8rem; font-weight: 800; color: #166534; background: #dcfce7; padding: 4px 10px; border-radius: var(--radius-full);">
                        In Cart (${inCart.quantity})
                      </span>
                    ` : ''}
                    <button type="button" class="btn btn-primary btn-sm search-add-btn" data-id="${dish.id}" style="padding: 0.4rem 0.85rem; font-size: 0.85rem;">
                      + Add
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `}
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const input = this.card.querySelector('#global-search-input');
    if (input) {
      input.addEventListener('input', (e) => {
        this.query = e.target.value;
        this.render();
        const freshInput = this.card.querySelector('#global-search-input');
        if (freshInput) {
          freshInput.focus();
          freshInput.setSelectionRange(freshInput.value.length, freshInput.value.length);
        }
      });
    }

    const closeBtn = this.card.querySelector('#close-search-modal');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    this.card.querySelectorAll('.search-tag-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        this.query = e.currentTarget.dataset.q;
        this.render();
        // Restore focus to input after render
        const freshInput = this.card.querySelector('#global-search-input');
        if (freshInput) {
          freshInput.focus();
          freshInput.setSelectionRange(freshInput.value.length, freshInput.value.length);
        }
      });
    });

    this.card.querySelectorAll('.search-add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const dish = restaurantData.menuItems.find(i => i.id === id);
        if (dish) {
          this.close();
          openItemCustomizationModal(dish);
        }
      });
    });

    this.backdrop.onclick = (e) => {
      if (e.target === this.backdrop) this.close();
    };
  }

  open(initialQuery = '') {
    this.isOpen = true;
    this.query = initialQuery;
    this.render();
    this.backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const input = this.card.querySelector('#global-search-input');
      if (input) input.focus();
    }, 100);
  }

  close() {
    this.isOpen = false;
    this.backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

export const searchModal = new SearchModal();

export function openSearchModal(query = '') {
  searchModal.open(query);
}
