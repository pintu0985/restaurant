// Smart Dish Customization & Recommended Add-ons Popup Modal Component
// Zero Scroll-jump, Zero Focus Disruption, Rock-Solid Block Layout Implementation
import { restaurantData } from '../../data/restaurantData.js';
import { store } from '../store.js';
import { showToast } from './toast.js';

class ItemCustomizationModal {
  constructor() {
    this.isOpen = false;
    this.item = null;
    this.quantity = 1;
    this.selectedAddons = [];
    this.specialInstructions = '';
    this.init();
  }

  init() {
    this.createDOM();
    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });
  }

  createDOM() {
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'order-modal-backdrop';
    this.backdrop.id = 'item-customization-backdrop';

    this.card = document.createElement('div');
    this.card.className = 'order-modal-card item-customization-card';

    // Prevent clicks inside modal card from bubbling up
    this.card.addEventListener('click', (e) => e.stopPropagation());

    this.backdrop.appendChild(this.card);
    document.body.appendChild(this.backdrop);

    // Modal ONLY closes when user explicitly clicks close button ✕ or Add to Cart
  }

  /**
   * Returns context-aware real add-ons from Desi Tadka menu based on item category
   */
  getRecommendedAddonsForItem(item) {
    if (!item) return [];

    const category = (item.category || '').toLowerCase();
    const name = (item.name || '').toLowerCase();

    // Check if store loaded add-ons from Google Sheets ADDONS table
    if (store.addons && Array.isArray(store.addons) && store.addons.length > 0) {
      const filtered = store.addons.filter(a => 
        a.available !== false && 
        (a.category.toLowerCase() === 'all' || a.category.toLowerCase() === category)
      );
      if (filtered.length > 0) return filtered;
    }

    // 1. Tandoori / Kabab / Tikka / Soya Chaap
    if (
      category.includes('kabab') ||
      category.includes('tandoori') ||
      category.includes('paneer-tikka') ||
      category.includes('stuffed-soya-chaap') ||
      name.includes('kabab') ||
      name.includes('tikka') ||
      name.includes('chaap') ||
      name.includes('platter')
    ) {
      return [
        { id: 'add-podina', name: 'Extra Podina Chutney', price: 69 },
        { id: 'add-lehsun', name: 'Extra Lehsun Desi Ghee Chutney', price: 89 },
        { id: 'add-chilly', name: 'Fried Green Chilly Plate', price: 49 },
        { id: 'add-butter', name: 'Looni Makkhan / Desi Ghee (20ml)', price: 49 },
        { id: 'add-salad', name: 'Green Salad', price: 99 },
        { id: 'add-lassi', name: 'Makhaniya Lassi', price: 159 }
      ];
    }

    // 2. Paneer / Vegetables / Main Course / Pulses
    if (
      category.includes('paneer-special') ||
      category.includes('vegetables') ||
      category.includes('pulses') ||
      category.includes('soya-chaap-gravy') ||
      category.includes('punjab-special')
    ) {
      return [
        { id: 'add-butter', name: 'Extra Desi Ghee / White Butter', price: 49 },
        { id: 'add-gravy', name: 'Extra Dal Makhani Gravy', price: 199 },
        { id: 'add-raita', name: 'Mix Veg Raita', price: 169 },
        { id: 'add-naan', name: 'Butter Naan', price: 79 },
        { id: 'add-roti', name: 'Tandoori Butter Roti', price: 29 },
        { id: 'add-rice', name: 'Steamed Basmati Rice', price: 169 },
        { id: 'add-lassi', name: 'Makhaniya Lassi', price: 159 }
      ];
    }

    // 3. Kulche / Naan / Paratha / Thalis
    if (
      category.includes('kulche-naan') ||
      category.includes('thali') ||
      category.includes('parathas') ||
      category.includes('breads') ||
      name.includes('kulcha') ||
      name.includes('paratha')
    ) {
      return [
        { id: 'add-chhole', name: 'Extra Pindi Chhole Portion', price: 149 },
        { id: 'add-butter', name: 'Extra White Butter (Looni Makkhan)', price: 49 },
        { id: 'add-lehsun', name: 'Lehsun Desi Ghee Chutney', price: 89 },
        { id: 'add-raita', name: 'Boondi Raita', price: 149 },
        { id: 'add-lassi', name: 'Makhaniya Lassi', price: 159 }
      ];
    }

    // 4. Rice / Biryani / Pulao
    if (
      category.includes('rice-pulao-biryani') ||
      name.includes('biryani') ||
      name.includes('pulao') ||
      name.includes('chawal')
    ) {
      return [
        { id: 'add-raita', name: 'Mix Veg Raita', price: 169 },
        { id: 'add-papad', name: 'Roasted Masala Papad (2 Pcs)', price: 49 },
        { id: 'add-kheecha', name: 'Fried Punjabi Kheecha', price: 69 },
        { id: 'add-gravy', name: 'Extra Dal Makhani Gravy', price: 199 },
        { id: 'add-lassi', name: 'Makhaniya Lassi', price: 159 }
      ];
    }

    // 5. Chinese / Snacks / Fast Food
    if (category.includes('chinese') || name.includes('chilli') || name.includes('fried rice')) {
      return [
        { id: 'add-mojito', name: 'Virgin Mojito', price: 119 },
        { id: 'add-coffee', name: 'Cold Coffee', price: 149 },
        { id: 'add-shake', name: 'Chocolate Milkshake', price: 169 }
      ];
    }

    // 6. Default / Desserts / Beverages
    return [
      { id: 'add-jamun', name: 'Shahi Gulabjamun (2 Pcs)', price: 149 },
      { id: 'add-icecream', name: 'Vanilla Ice Cream Scoop', price: 69 },
      { id: 'add-kheer', name: 'Kesar Gulkandi Kheer', price: 189 }
    ];
  }

  calculateTotal() {
    if (!this.item) return 0;
    const basePrice = Number(this.item.price) || 0;
    const addonsTotal = this.selectedAddons.reduce((sum, addon) => sum + (Number(addon.price) || 0), 0);
    return (basePrice + addonsTotal) * this.quantity;
  }

  render() {
    if (!this.item) return;

    const recommendedAddons = this.getRecommendedAddonsForItem(this.item);
    const totalCalc = this.calculateTotal();

    this.card.innerHTML = `
      <!-- MODAL HEADER -->
      <div class="order-modal-header" style="background-color: var(--white); border-bottom: 1.5px solid var(--primary-border); padding: 1.25rem 1.5rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span class="${this.item.isVeg ? 'badge-veg' : 'badge-nonveg'}"></span>
          <h3 style="font-size: 1.2rem; font-weight: 800; color: var(--deep-espresso); margin: 0;">${this.item.name}</h3>
        </div>
        <button type="button" class="icon-btn" id="close-custom-modal" aria-label="Close" style="width: 36px; height: 36px; font-size: 1.1rem;">✕</button>
      </div>

      <!-- MODAL BODY -->
      <div class="order-modal-body" style="padding: 1.25rem 1.5rem; max-height: 60vh; overflow-y: auto;">
        
        <!-- FOOD ITEM PREVIEW CARD -->
        <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.25rem; background: var(--white); padding: 0.85rem; border-radius: var(--radius-md); border: 1px solid var(--primary-border);">
          <img src="${this.item.image}" alt="${this.item.name}" style="width: 75px; height: 75px; border-radius: var(--radius-md); object-fit: cover; border: 1px solid var(--primary-border); flex-shrink: 0;">
          <div style="flex-grow: 1;">
            <div style="font-size: 1.25rem; font-weight: 800; color: var(--primary); font-family: var(--font-heading);">₹${this.item.price}/-</div>
            ${this.item.description ? `<p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.35; margin-top: 3px;">${this.item.description}</p>` : ''}
          </div>
        </div>

        <!-- QUANTITY SELECTOR -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; background: var(--warm-beige); padding: 0.75rem 1rem; border-radius: var(--radius-md); border: 1px solid var(--primary-border);">
          <span style="font-weight: 700; color: var(--deep-espresso); font-size: 0.92rem;">Select Quantity:</span>
          <div class="qty-control" style="background: var(--white); border: 1.5px solid var(--primary-border); padding: 2px 6px;">
            <button type="button" class="qty-btn" id="qty-minus" style="width: 32px; height: 32px;">−</button>
            <span class="qty-val" id="qty-val-display" style="font-size: 1.1rem; padding: 0 0.85rem;">${this.quantity}</span>
            <button type="button" class="qty-btn" id="qty-plus" style="width: 32px; height: 32px;">+</button>
          </div>
        </div>

        <!-- SPECIAL INSTRUCTIONS -->
        <div class="form-group" style="margin-bottom: 1.25rem;">
          <label class="form-label" style="font-weight: 700; color: var(--deep-espresso); display: flex; align-items: center; gap: 0.4rem; font-size: 0.9rem;">
            <span>📝</span> Special Instructions (Optional):
          </label>
          <input type="text" id="special-instructions-input" class="form-control" placeholder="Add instructions (e.g., extra crisp, less spicy, no onion)..." value="${this.specialInstructions}">
        </div>

        <!-- RECOMMENDED ADD-ONS SECTION -->
        <div style="border-top: 2px dashed var(--primary-border); padding-top: 1.25rem; margin-top: 0.75rem;">
          <div style="margin-bottom: 0.85rem;">
            <h3 style="font-size: 1.15rem; color: var(--primary); font-weight: 800; margin-bottom: 0.15rem; display: flex; align-items: center; gap: 0.4rem;">
              <span>⭐</span> Recommended Add-ons
            </h3>
            <p style="font-size: 0.82rem; color: var(--text-muted); font-style: italic; margin: 0;">
              "Make your order even more delicious"
            </p>
          </div>

          <div class="addons-list-wrap" style="display: flex; flex-direction: column; gap: 0.65rem;">
            ${recommendedAddons.map(addon => {
              const isChecked = this.selectedAddons.some(a => a.name === addon.name);
              return `
                <div class="addon-row ${isChecked ? 'selected' : ''}" data-name="${addon.name}" data-price="${addon.price}" style="
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  padding: 0.75rem 0.9rem;
                  border-radius: var(--radius-md);
                  border: 1.5px solid ${isChecked ? 'var(--primary)' : 'var(--primary-border)'};
                  background-color: ${isChecked ? 'var(--light-beige)' : 'var(--white)'};
                  cursor: pointer;
                  user-select: none;
                ">
                  <div style="display: flex; align-items: center; gap: 0.65rem;">
                    <div class="custom-chk" style="
                      width: 22px;
                      height: 22px;
                      border-radius: 6px;
                      border: 2px solid ${isChecked ? 'var(--primary)' : 'var(--text-muted)'};
                      background-color: ${isChecked ? 'var(--primary)' : 'var(--white)'};
                      color: var(--white);
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      font-size: 0.85rem;
                      font-weight: 800;
                    ">
                      ${isChecked ? '✓' : ''}
                    </div>
                    <span style="font-weight: 700; font-size: 0.92rem; color: var(--deep-espresso);">${addon.name}</span>
                  </div>
                  <span style="font-weight: 800; font-size: 0.92rem; color: var(--primary); font-family: var(--font-heading);">+₹${addon.price}/-</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- MODAL FOOTER WITH INSTANT DYNAMIC TOTAL PRICE & ADD TO CART BUTTON -->
      <div style="background-color: var(--cream); border-top: 1.5px solid var(--primary-border); padding: 1.1rem 1.5rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
        <div>
          <div style="font-size: 0.78rem; text-transform: uppercase; letter-spacing: 1px; color: var(--text-muted); font-weight: 700;">Total Price:</div>
          <div id="custom-total-price" style="font-size: 1.5rem; font-weight: 900; color: var(--primary); font-family: var(--font-heading); line-height: 1.1;">
            ₹${totalCalc}/-
          </div>
        </div>

        <button type="button" class="btn btn-primary" id="confirm-add-to-cart-btn" style="padding: 0.85rem 1.85rem; font-size: 1rem; font-weight: 800;">
          Add to Cart →
        </button>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    const closeBtn = this.card.querySelector('#close-custom-modal');
    if (closeBtn) closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.close();
    });

    // Quantity Plus/Minus
    const minusBtn = this.card.querySelector('#qty-minus');
    const plusBtn = this.card.querySelector('#qty-plus');
    if (minusBtn) {
      minusBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.quantity > 1) {
          this.quantity--;
          this.updateTotalDisplay();
        }
      });
    }
    if (plusBtn) {
      plusBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.quantity++;
        this.updateTotalDisplay();
      });
    }

    // Special instructions text input listener
    const instructionsInput = this.card.querySelector('#special-instructions-input');
    if (instructionsInput) {
      instructionsInput.addEventListener('input', (e) => {
        this.specialInstructions = e.target.value;
      });
    }

    // Add-on Row Click Listener (Single DIV Listener, Zero Label Double-Event, Zero Scroll Jump)
    this.card.querySelectorAll('.addon-row').forEach(row => {
      row.addEventListener('click', (e) => {
        e.stopPropagation();

        const name = row.dataset.name;
        const price = Number(row.dataset.price);

        const index = this.selectedAddons.findIndex(a => a.name === name);
        const chk = row.querySelector('.custom-chk');

        if (index > -1) {
          // Deselect
          this.selectedAddons.splice(index, 1);
          row.classList.remove('selected');
          row.style.borderColor = 'var(--primary-border)';
          row.style.backgroundColor = 'var(--white)';
          if (chk) {
            chk.style.borderColor = 'var(--text-muted)';
            chk.style.backgroundColor = 'var(--white)';
            chk.textContent = '';
          }
        } else {
          // Select
          this.selectedAddons.push({ name, price });
          row.classList.add('selected');
          row.style.borderColor = 'var(--primary)';
          row.style.backgroundColor = 'var(--light-beige)';
          if (chk) {
            chk.style.borderColor = 'var(--primary)';
            chk.style.backgroundColor = 'var(--primary)';
            chk.textContent = '✓';
          }
        }

        this.updateTotalDisplay();
      });
    });

    // Confirm Add to Cart
    const addBtn = this.card.querySelector('#confirm-add-to-cart-btn');
    if (addBtn) {
      addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!this.item) return;

        const liveInput = this.card.querySelector('#special-instructions-input');
        const instructions = liveInput ? liveInput.value.trim() : this.specialInstructions.trim();

        const cartItemConfig = {
          item: this.item,
          quantity: this.quantity,
          selectedAddons: [...this.selectedAddons],
          specialInstructions: instructions,
          unitTotalPrice: (Number(this.item.price) || 0) + this.selectedAddons.reduce((sum, a) => sum + Number(a.price), 0)
        };

        store.addToCartWithCustomization(cartItemConfig);
        showToast(`Added ${this.item.name} (${this.quantity}) to cart!`, 'success');
        this.close();
      });
    }
  }

  updateTotalDisplay() {
    const qtyDisplay = this.card.querySelector('#qty-val-display');
    const totalDisplay = this.card.querySelector('#custom-total-price');

    if (qtyDisplay) qtyDisplay.textContent = this.quantity;
    if (totalDisplay) totalDisplay.textContent = `₹${this.calculateTotal()}/-`;
  }

  open(item) {
    if (!item) return;
    this.isOpen = true;
    this.item = item;
    this.quantity = 1;
    this.selectedAddons = [];
    this.specialInstructions = '';
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

export const itemCustomizationModal = new ItemCustomizationModal();

export function openItemCustomizationModal(item) {
  itemCustomizationModal.open(item);
}
