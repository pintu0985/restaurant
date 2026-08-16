// Home Page View Renderer with Ultra-Attractive Hero & Animations
import { restaurantData } from '../../data/restaurantData.js';
import { store } from '../store.js';
import { openOrderModal } from '../components/orderModal.js';
import { openItemCustomizationModal } from '../components/itemCustomizationModal.js';

function renderOpeningHoursCard() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentMins = hours * 60 + minutes;

  const openMins = 11 * 60 + 30;  // 11:30 AM = 690 mins
  const closeMins = 23 * 60 + 30; // 11:30 PM = 1410 mins

  const isOpenNow = currentMins >= openMins && currentMins < closeMins;

  return `
    <section class="section section-dark" style="background: linear-gradient(135deg, #170701 0%, #341204 50%, #170701 100%); padding: 4.5rem 0; position: relative;">
      <div class="container" style="max-width: 680px;">
        <div style="
          background: rgba(255, 247, 239, 0.04);
          border: 1.5px solid rgba(133, 46, 1, 0.4);
          border-radius: var(--radius-lg);
          padding: 3rem 2rem;
          text-align: center;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          backdrop-filter: blur(10px);
          position: relative;
        ">
          <!-- HERITAGE ICON -->
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.3));">
            🪔
          </div>

          <!-- HEADINGS -->
          <div style="font-size: 0.82rem; text-transform: uppercase; letter-spacing: 3px; color: var(--warm-beige); font-weight: 700; margin-bottom: 0.35rem;">
            Hospitality Hours
          </div>
          <h2 style="font-size: 2.2rem; color: #ffffff; font-family: var(--font-heading); font-weight: 800; margin-bottom: 0.5rem;">
            Desi Tadka Times
          </h2>
          <p style="color: rgba(255, 247, 239, 0.75); font-size: 0.95rem; margin-bottom: 1.75rem;">
            Welcoming you and your loved ones for authentic Punjabi dining.
          </p>

          <!-- DYNAMIC LIVE STATUS BADGE -->
          <div style="margin-bottom: 2rem;">
            ${isOpenNow ? `
              <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(34, 197, 94, 0.15); border: 1.5px solid #22c55e; color: #4ade80; padding: 0.45rem 1.4rem; border-radius: 50px; font-weight: 700; font-size: 0.92rem; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.2);">
                <span style="width: 9px; height: 9px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 10px #22c55e;"></span>
                <span>Open Today (11:30 AM – 11:30 PM)</span>
              </div>
            ` : `
              <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(239, 68, 68, 0.15); border: 1.5px solid #ef4444; color: #f87171; padding: 0.45rem 1.4rem; border-radius: 50px; font-weight: 700; font-size: 0.92rem;">
                <span style="width: 9px; height: 9px; border-radius: 50%; background: #ef4444;"></span>
                <span>Closed Now (Opens at 11:30 AM)</span>
              </div>
            `}
          </div>

          <!-- SCHEDULE TABLE LIST -->
          <div style="display: flex; flex-direction: column; gap: 0; max-width: 480px; margin: 0 auto; text-align: left;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.9rem 0; border-bottom: 1px dashed rgba(255, 247, 239, 0.2);">
              <span style="font-weight: 700; color: #ffffff; font-size: 1.05rem;">Weekdays</span>
              <span style="font-weight: 800; color: var(--warm-beige); font-size: 1.05rem; font-family: var(--font-heading);">11:30 AM – 11:30 PM</span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.9rem 0; border-bottom: 1px dashed rgba(255, 247, 239, 0.2);">
              <span style="font-weight: 700; color: #ffffff; font-size: 1.05rem;">Saturday</span>
              <span style="font-weight: 800; color: var(--warm-beige); font-size: 1.05rem; font-family: var(--font-heading);">11:30 AM – 11:30 PM</span>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.9rem 0; border-bottom: 1px dashed rgba(255, 247, 239, 0.2);">
              <span style="font-weight: 700; color: #ffffff; font-size: 1.05rem;">Sunday</span>
              <span style="font-weight: 800; color: var(--warm-beige); font-size: 1.05rem; font-family: var(--font-heading);">11:30 AM – 11:30 PM</span>
            </div>
          </div>

          <!-- CTA FOOTNOTE -->
          <div style="margin-top: 1.75rem; font-size: 0.88rem; color: rgba(255, 247, 239, 0.6); font-style: italic;">
            * Available for Table Service, Takeaway & Express Home Delivery
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderHomeView() {
  const container = document.createElement('div');
  container.className = 'view-container';

  const menuList = (store.menuItems && store.menuItems.length > 0) ? store.menuItems : restaurantData.menuItems;
  const popularDishes = menuList.slice(0, 6);

  const featuredCategories = [
    { 
      id: "chef-specials", 
      name: "Chef Specials", 
      subtitle: "Biryani & Royal Thalis",
      count: "5 Signature Items",
      icon: "👑",
      image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80"
    },
    { 
      id: "tandoori-platter", 
      name: "Tandoori Platter", 
      subtitle: "Charcoal Flame Kababs",
      count: "10 & 14 Pcs Platters",
      icon: "🍢",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80"
    },
    { 
      id: "paneer-special", 
      name: "Paneer Special", 
      subtitle: "Desi Ghee Rich Gravies",
      count: "29 Royal Varieties",
      icon: "🧀",
      image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
    },
    { 
      id: "desi-special-kulche-naan", 
      name: "Amritsari Kulcha & Naan", 
      subtitle: "Crispy Clay Tandoor Breads",
      count: "15 Varieties",
      icon: "🫓",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    { 
      id: "desi-special-thali", 
      name: "Punjabi Thalis", 
      subtitle: "Grand Royal Feast",
      count: "7 Deluxe Thalis",
      icon: "🍱",
      image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80"
    },
    { 
      id: "stuffed-soya-chaap", 
      name: "Stuffed Soya Chaap", 
      subtitle: "Malai & Achari Tikkas",
      count: "9 Special Tikkas",
      icon: "🌯",
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80"
    },
    { 
      id: "cold-beverages", 
      name: "Patiala Lassi & Drinks", 
      subtitle: "Makhaniya Lassi & Chhach",
      count: "Cold & Refreshing",
      icon: "🥛",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80"
    },
    { 
      id: "desserts", 
      name: "Desserts & Sweets", 
      subtitle: "Gulkandi Kheer & Gulabjamun",
      count: "Sweet Delights",
      icon: "🍰",
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
    }
  ];

  container.innerHTML = `
    <!-- HERO SECTION WITH RICH ANIMATION FRAME & FLOATING STATS -->
    <section class="hero-section" style="position: relative; overflow: hidden; padding: 4.5rem 0 5rem; background: linear-gradient(135deg, rgba(31,10,2,0.95), rgba(74,25,0,0.88)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80') center/cover;">
      <div class="container">
        <div style="display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 3.5rem; align-items: center;">
          
          <!-- LEFT HERO CONTENT -->
          <div class="hero-content" style="text-align: left; max-width: 100%;">
            
            <div class="hero-trust-badge animate-fade-in-up" style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(217, 119, 6, 0.15); border: 1.5px solid var(--gold-accent); color: var(--gold-light); padding: 0.4rem 1.25rem; border-radius: 50px; font-weight: 800; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 1.25rem;">
              <span>✨ 100% Pure Veg</span>
              <span>•</span>
              <span>Authentic Punjabi Gastronomy</span>
            </div>

            <h1 class="hero-title animate-fade-in-up" style="font-size: 3.2rem; color: var(--cream); font-family: var(--font-heading); font-weight: 900; line-height: 1.15; margin-bottom: 1.25rem; text-shadow: 0 4px 20px rgba(0,0,0,0.6);">
              ${restaurantData.tagline}
            </h1>

            <p class="hero-desc animate-fade-in-up" style="color: var(--warm-beige); font-size: 1.1rem; line-height: 1.75; margin-bottom: 2.25rem; max-width: 620px;">
              ${restaurantData.description}
            </p>

            <div class="hero-btns animate-fade-in-up" style="display: flex; gap: 1.25rem; align-items: center; flex-wrap: wrap; margin-bottom: 2.5rem;">
              <button type="button" class="btn btn-primary hero-order-now animate-pulse-glow" style="padding: 1.1rem 2.5rem; font-size: 1.1rem; font-weight: 800; background: var(--gold-accent); color: var(--deep-espresso); border: none; box-shadow: 0 10px 30px rgba(217, 119, 6, 0.4);">
                🔥 Order Food Now
              </button>
              <a href="#menu" class="btn btn-secondary" style="padding: 1.1rem 2.25rem; font-size: 1rem; font-weight: 700; border: 2px solid var(--gold-accent); color: var(--cream); background: rgba(0,0,0,0.3);">
                📜 Explore Menu (120+ Items)
              </a>
            </div>

            <!-- HERO STAT CARDS BAR -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; border-top: 1.5px dashed rgba(245, 230, 211, 0.25); padding-top: 1.75rem;">
              <div style="background: rgba(255,247,239,0.06); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid rgba(217,119,6,0.3);">
                <div style="font-size: 1.25rem; font-weight: 900; color: var(--gold-accent);">4.9 ★★★★★</div>
                <div style="font-size: 0.78rem; color: var(--warm-beige); font-weight: 600;">10,000+ Happy Food Lovers</div>
              </div>
              <div style="background: rgba(255,247,239,0.06); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid rgba(217,119,6,0.3);">
                <div style="font-size: 1.25rem; font-weight: 900; color: var(--gold-accent);">30 Mins Express</div>
                <div style="font-size: 0.78rem; color: var(--warm-beige); font-weight: 600;">Hot Doorstep Delivery</div>
              </div>
              <div style="background: rgba(255,247,239,0.06); padding: 0.85rem 1rem; border-radius: var(--radius-md); border: 1px solid rgba(217,119,6,0.3);">
                <div style="font-size: 1.25rem; font-weight: 900; color: var(--gold-accent);">Desi Ghee</div>
                <div style="font-size: 0.78rem; color: var(--warm-beige); font-weight: 600;">100% Wood-fired Tandoor</div>
              </div>
            </div>

          </div>

          <!-- RIGHT HERO — CLEAN 360° ROTATING PANEER DISH -->
          <div style="position: relative; display: flex; justify-content: center; align-items: center;">

            <!-- SPINNING PANEER IMAGE — NO AURA, NO BADGES -->
            <div class="animate-rotate-360" style="
              width: 360px;
              height: 360px;
              border-radius: 50%;
              overflow: hidden;
              z-index: 2;
              position: relative;
              flex-shrink: 0;
            ">
              <img
                src="/paneer-katori.png"
                alt="Shahi Paneer Sabji"
                style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block;"
              >
            </div>

          </div>

        </div>
      </div>
    </section>

    <!-- PREMIUM EXPLORE OUR MENU — FULL REDESIGN -->
    <section class="section explore-menu-section" style="background: linear-gradient(165deg, #1a0500 0%, #2b0d00 40%, #0f0200 100%); overflow: hidden;">
      <div class="explore-menu-inner">

        <!-- SECTION HEADER -->
        <div class="explore-header">
          <div class="explore-label">🔥 DESI TADKA CUISINE</div>
          <h2 class="explore-title">Explore Our Menu</h2>
          <p class="explore-subtitle">Rich Paneer Gravies &middot; Tandoori Platters &middot; Amritsari Kulchas &middot; Patiala Lassi</p>
        </div>

        <!-- HORIZONTAL SCROLL CARD STRIP -->
        <div class="explore-scroll-track">
          ${featuredCategories.map((cat, i) => `
            <div class="explore-card category-card" data-cat="${cat.id}" style="--card-delay: ${i * 0.08}s">
              <div class="explore-card-img-wrap">
                <img src="${cat.image}" alt="${cat.name}" class="explore-card-img">
                <div class="explore-card-shine"></div>
              </div>
              <div class="explore-card-bottom">
                <div class="explore-card-info">
                  <div class="explore-card-name">${cat.name}</div>
                  <div class="explore-card-sub">${cat.subtitle}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- BOTTOM CTA ROW -->
        <div class="explore-cta-row">
          <div class="explore-cta-text">
            <span class="explore-cta-headline">120+ Authentic Dishes Await</span>
            <span class="explore-cta-sub">Search by name · Filter by price · Choose half or full</span>
          </div>
          <a href="#menu" class="explore-cta-btn">
            View Full Menu <span>→</span>
          </a>
        </div>

      </div>
    </section>

    <!-- POPULAR DISHES -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-title-wrap">
          <div class="section-subtext">Chef's Favorites</div>
          <h2 class="section-heading">Our Most Loved Dishes</h2>
          <p class="section-desc">Handcrafted gourmet dishes cooked to perfection over charcoal and slow flame.</p>
        </div>

        <div class="food-grid">
          ${popularDishes.map(dish => `
            <div class="food-card">
              <div class="food-card-img-wrap">
                <img src="${dish.image}" alt="${dish.name}" class="food-card-img">
                <div class="food-card-badges">
                  <span class="${dish.isVeg ? 'badge-veg' : 'badge-nonveg'}" title="${dish.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
                  ${dish.isBestseller ? `<span class="tag-pill tag-bestseller">⭐ Bestseller</span>` : ''}
                  ${dish.isSpicy ? `<span class="tag-pill tag-spicy">🌶️ Spicy</span>` : ''}
                  ${dish.isNew ? `<span class="tag-pill tag-new">🆕 NEW</span>` : ''}
                </div>
                <div class="food-card-rating">
                  <span class="star-icon">★</span>
                  <span>${dish.rating || '4.9'}</span>
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
                  <button type="button" class="btn btn-primary btn-sm add-to-cart-btn" data-id="${dish.id}">
                    + Add to Order
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="text-align: center; margin-top: 3rem;">
          <a href="#menu" class="btn btn-primary" style="padding: 1rem 2.5rem; font-weight: 800;">View Complete Menu (120+ Items) →</a>
        </div>
      </div>
    </section>

    <!-- WHY CHOOSE US -->
    <section class="section">
      <div class="container">
        <div class="section-title-wrap">
          <div class="section-subtext">The Desi Tadka Promise</div>
          <h2 class="section-heading">Why Food Lovers Choose Us</h2>
        </div>

        <div class="features-grid">
          ${restaurantData.whyChooseUs.map(f => `
            <div class="feature-card">
              <div class="feature-icon">${f.icon}</div>
              <h3 class="feature-title">${f.title}</h3>
              <p class="feature-desc">${f.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- DEDICATED DESI TADKA TIMES (OPENING HOURS SECTION) -->
    ${renderOpeningHoursCard()}

    <!-- STORY PREVIEW -->
    <section class="section section-alt">
      <div class="container">
        <div class="two-col-grid">
          <div class="img-stack">
            <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80" alt="Restaurant Interior">
            <div class="experience-badge">
              <div class="exp-num">22+</div>
              <div class="exp-lbl">Years of Culinary Heritage</div>
            </div>
          </div>

          <div>
            <div class="section-subtext" style="text-align: left;">Our Culinary Heritage</div>
            <h2 class="section-heading" style="text-align: left; margin-bottom: 1.25rem;">Made for Pure Veg Food Lovers</h2>
            <p style="color: var(--text-muted); font-size: 1.05rem; margin-bottom: 1.25rem;">
              At Desi Tadka, food is not just sustenance — it is a passionate celebration of traditional Indian culture, rich hand-ground spices, and pure Desi Ghee cooking.
            </p>
            <p style="color: var(--text-muted); font-size: 1rem; margin-bottom: 2rem;">
              Whether you are sitting at Table 12 using our fast QR table order, taking away hot Amritsari Kulcha, or enjoying a family dinner, every meal is prepared with warmth and excellence.
            </p>
            <a href="#about" class="btn btn-primary">Discover Our Story →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="section">
      <div class="container">
        <div class="section-title-wrap">
          <div class="section-subtext">Guest Reviews</div>
          <h2 class="section-heading">What Our Customers Say</h2>
        </div>

        <div class="testimonials-grid">
          ${restaurantData.testimonials.map(t => `
            <div class="testimonial-card">
              <div class="testimonial-stars">★★★★★</div>
              <p class="testimonial-text">"${t.comment}"</p>
              <div class="testimonial-author">
                <img src="${t.avatar}" alt="${t.name}" class="author-avatar">
                <div>
                  <div class="author-name">${t.name}</div>
                  <div class="author-role">${t.role}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA BANNER -->
    <section class="container">
      <div class="cta-banner">
        <h2 class="cta-banner-title">Craving Something Delicious?</h2>
        <p class="cta-banner-text">Your favorite meal is just a few clicks away. Order online for table service, takeaway, or fast home delivery.</p>
        <button type="button" class="btn btn-secondary banner-order-now" style="font-size: 1.1rem; padding: 1rem 2.25rem;">
          Order Now
        </button>
      </div>
    </section>
  `;

  // Bind View Events
  container.querySelectorAll('.hero-order-now, .banner-order-now').forEach(btn => {
    btn.addEventListener('click', () => openOrderModal('dine-in'));
  });

  // Bind Category Filter Pills
  container.querySelectorAll('.menu-cat-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      const filter = e.currentTarget.dataset.filter;
      container.querySelectorAll('.menu-cat-pill').forEach(p => p.classList.remove('active'));
      e.currentTarget.classList.add('active');

      const cards = container.querySelectorAll('.menu-cat-card-modern');
      cards.forEach(card => {
        if (filter === 'all' || card.dataset.cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  container.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', (e) => {
      const cat = e.currentTarget.dataset.cat;
      window.location.hash = `#menu?cat=${cat}`;
    });
  });

  container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const dish = menuList.find(i => String(i.id) === String(id));
      if (dish) openItemCustomizationModal(dish);
    });
  });

  return container;
}
