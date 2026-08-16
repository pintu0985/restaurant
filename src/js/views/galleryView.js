// Desi Tadka Restaurant Photo Gallery View with Dynamic Varied-Size Grid & Interactive Lightbox Modal
import { openItemCustomizationModal } from '../components/itemCustomizationModal.js';
import { store } from '../store.js';

export function renderGalleryView() {
  const container = document.createElement('div');
  container.className = 'gallery-page-view';

  // Gallery Photos Dataset with Varied Sizes & Categories
  const galleryItems = [
    {
      id: 'gal-1',
      title: 'Slow-Simmered Dal Makhani with Looni Makkhan',
      category: 'dishes',
      categoryLabel: 'Signature Dish',
      aspect: 'large', // Double span feature
      image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=80',
      description: 'Our iconic 12-hour slow-simmered black lentils garnished with fresh cream & white butter.'
    },
    {
      id: 'gal-2',
      title: 'Amritsari Special Chhole Kulche',
      category: 'kulche',
      categoryLabel: 'Kulchas & Thalis',
      aspect: 'tall', // 3:4 aspect
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
      description: 'Crispy wood-fired stuffed tandoori kulcha served with spicy Pindi Chhole & pickled onions.'
    },
    {
      id: 'gal-3',
      title: 'Chargrilled Paneer Tikka Tandoori',
      category: 'tandoori',
      categoryLabel: 'Tandoori & Grills',
      aspect: 'square', // 1:1 aspect
      image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80',
      description: 'Fresh cottage cheese cubes marinated in mustard oil, yellow chili & clay oven roasted.'
    },
    {
      id: 'gal-4',
      title: 'Royal Punjabi Dining Ambiance',
      category: 'ambiance',
      categoryLabel: 'Ambiance & Kitchen',
      aspect: 'wide', // 16:9 aspect
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      description: 'Warm ethnic Punjabi heritage dining hall with handcrafted wooden interiors.'
    },
    {
      id: 'gal-5',
      title: 'King Ambarsari Grand Royal Thali',
      category: 'kulche',
      categoryLabel: 'Kulchas & Thalis',
      aspect: 'square',
      image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80',
      description: 'Full feast comprising 3 Sabjis, Jeera Rice, 2 Butter Naans, Raita & Gulabjamun.'
    },
    {
      id: 'gal-6',
      title: 'Patiala Shahi Makhaniya Lassi',
      category: 'drinks',
      categoryLabel: 'Drinks & Desserts',
      aspect: 'tall',
      image: 'https://images.unsplash.com/photo-1571006682858-a458b8a69288?auto=format&fit=crop&w=800&q=80',
      description: 'Thick chilled churned sweet yogurt topped with thick malai layer & pistachio flakes.'
    },
    {
      id: 'gal-7',
      title: 'Amritsari Chur Chur Butter Naan',
      category: 'kulche',
      categoryLabel: 'Kulchas & Thalis',
      aspect: 'wide',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1000&q=80',
      description: 'Hand-crushed crispy tandoori naan dripping with pure Desi Ghee.'
    },
    {
      id: 'gal-8',
      title: 'Wood-fired Clay Tandoor Kitchen',
      category: 'ambiance',
      categoryLabel: 'Ambiance & Kitchen',
      aspect: 'tall',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      description: 'Our master chefs crafting fresh tandoori rotis & naan in live clay ovens.'
    },
    {
      id: 'gal-9',
      title: 'Paneer Butter Masala Gourmet Bowl',
      category: 'dishes',
      categoryLabel: 'Signature Dish',
      aspect: 'square',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80',
      description: 'Rich velvety tomato cashew gravy with melt-in-mouth cottage cheese.'
    },
    {
      id: 'gal-10',
      title: 'Mushroom Do Pyaza Special',
      category: 'dishes',
      categoryLabel: 'Signature Dish',
      aspect: 'square',
      image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80',
      description: 'Fresh button mushrooms tossed with caramelised onions & hand-ground spices.'
    },
    {
      id: 'gal-11',
      title: 'Soya Malai Chaap Platter',
      category: 'tandoori',
      categoryLabel: 'Tandoori & Grills',
      aspect: 'wide',
      image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1000&q=80',
      description: 'Tender soya chaap marinated in rich cashew cream & cardamom powder.'
    },
    {
      id: 'gal-12',
      title: 'Kesar Gulkandi Shahi Kheer',
      category: 'drinks',
      categoryLabel: 'Drinks & Desserts',
      aspect: 'square',
      image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      description: 'Slow-cooked aromatic basmati rice pudding infused with Kashmiri saffron & rose preserve.'
    },
    {
      id: 'gal-13',
      title: 'Courtyard Outdoor Terrace Seating',
      category: 'ambiance',
      categoryLabel: 'Ambiance & Kitchen',
      aspect: 'wide',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      description: 'Beautiful ambient warm fairy light outdoor garden seating area.'
    },
    {
      id: 'gal-14',
      title: 'Gulabjamun with Vanilla Ice Cream',
      category: 'drinks',
      categoryLabel: 'Drinks & Desserts',
      aspect: 'tall',
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80',
      description: 'Piping hot mawa gulabjamun served with chilled vanilla ice cream scoop.'
    }
  ];

  let currentCategoryFilter = 'all';
  let activeLightboxIndex = -1;

  function renderContent() {
    const filteredList = currentCategoryFilter === 'all'
      ? galleryItems
      : galleryItems.filter(item => item.category === currentCategoryFilter);

    container.innerHTML = `
      <!-- HERO BANNER -->
      <section class="section section-dark" style="padding: 5rem 0 3.5rem; text-align: center; background: linear-gradient(135deg, rgba(31,10,2,0.94), rgba(74,25,0,0.88)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80') center/cover; position: relative; border-bottom: 3px solid var(--gold-accent);">
        <div class="container" style="max-width: 900px;">
          
          <div style="margin: 0 auto 1.25rem; width: 80px; height: 80px; border-radius: 50%; background: #ffffff; padding: 4px; border: 2.5px solid var(--gold-accent); box-shadow: 0 8px 25px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;">
            <img src="/logo.png" alt="Desi Tadka" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
          </div>

          <div style="color: var(--gold-accent); font-size: 0.9rem; font-weight: 800; letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 0.5rem;">
             Visual Experience
          </div>
          <h1 class="hero-title" style="font-size: 2.75rem; color: var(--cream); font-family: var(--font-heading); margin-bottom: 1rem;">
            Desi Tadka Photo Gallery
          </h1>
          <p class="hero-desc" style="color: var(--warm-beige); font-size: 1.1rem; max-width: 720px; margin: 0 auto; line-height: 1.6;">
            Explore our rich Punjabi food artistry, wood-fired tandoor specialties, artisanal kulchas, and warm heritage dining ambiance.
          </p>
        </div>
      </section>

      <!-- GALLERY CONTROLS & FILTER TABS -->
      <section class="section" style="padding: 2.5rem 0 5rem;">
        <div class="container">
          
          <!-- Category Filter Pills -->
          <div style="display: flex; gap: 0.65rem; justify-content: center; align-items: center; flex-wrap: wrap; margin-bottom: 2.5rem;">
            <button type="button" class="tab-btn gallery-filter-btn ${currentCategoryFilter === 'all' ? 'active' : ''}" data-filter="all">
               All Photos (${galleryItems.length})
            </button>
            <button type="button" class="tab-btn gallery-filter-btn ${currentCategoryFilter === 'dishes' ? 'active' : ''}" data-filter="dishes">
              🍛 Signature Dishes
            </button>
            <button type="button" class="tab-btn gallery-filter-btn ${currentCategoryFilter === 'tandoori' ? 'active' : ''}" data-filter="tandoori">
              🍢 Tandoori & Grills
            </button>
            <button type="button" class="tab-btn gallery-filter-btn ${currentCategoryFilter === 'kulche' ? 'active' : ''}" data-filter="kulche">
              🥘 Kulchas & Thalis
            </button>
            <button type="button" class="tab-btn gallery-filter-btn ${currentCategoryFilter === 'drinks' ? 'active' : ''}" data-filter="drinks">
              🍹 Drinks & Desserts
            </button>
            <button type="button" class="tab-btn gallery-filter-btn ${currentCategoryFilter === 'ambiance' ? 'active' : ''}" data-filter="ambiance">
              ✨ Ambiance & Kitchen
            </button>
          </div>

          <!-- MASONRY / VARIED SIZE PHOTO GRID -->
          <div class="gallery-masonry-grid">
            ${filteredList.map((item, idx) => `
              <div class="gallery-item-card aspect-${item.aspect}" data-idx="${idx}" data-id="${item.id}">
                <div class="gallery-img-wrapper">
                  <img src="${item.image}" alt="${item.title}" class="gallery-img" loading="lazy">
                  
                  <div class="gallery-overlay">
                    <span class="gallery-tag">${item.categoryLabel}</span>
                    <h3 class="gallery-item-title">${item.title}</h3>
                    <p class="gallery-item-desc">${item.description}</p>
                    <div class="gallery-view-btn">
                      <span>🔍 Fullview</span>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

        </div>
      </section>

      <!-- INTERACTIVE LIGHTBOX MODAL -->
      <div class="lightbox-modal" id="gallery-lightbox">
        <div class="lightbox-backdrop"></div>
        <div class="lightbox-dialog">
          <button type="button" class="lightbox-close-btn" id="close-lightbox" aria-label="Close">✕</button>
          
          <div class="lightbox-content-box">
            <div class="lightbox-image-container">
              <img id="lightbox-img" src="" alt="Gallery Image">
              <button type="button" class="lightbox-nav-btn prev-btn" id="lightbox-prev">‹</button>
              <button type="button" class="lightbox-nav-btn next-btn" id="lightbox-next">›</button>
            </div>
            
            <div class="lightbox-details">
              <span id="lightbox-tag" class="gallery-tag">Tag</span>
              <h2 id="lightbox-title" style="font-size: 1.5rem; color: var(--cream); font-family: var(--font-heading); margin: 0.5rem 0;">Title</h2>
              <p id="lightbox-desc" style="color: var(--warm-beige); font-size: 0.95rem; line-height: 1.5;">Description</p>
              <div style="font-size: 0.8rem; color: var(--gold-accent); font-weight: 700; margin-top: 0.75rem;" id="lightbox-counter">Photo 1 of 10</div>
            </div>
          </div>
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    // Filter Tabs
    container.querySelectorAll('.gallery-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        currentCategoryFilter = e.currentTarget.dataset.filter;
        renderContent();
      });
    });

    const filteredList = currentCategoryFilter === 'all'
      ? galleryItems
      : galleryItems.filter(item => item.category === currentCategoryFilter);

    // Open Lightbox on Image Click
    container.querySelectorAll('.gallery-item-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.idx, 10);
        openLightbox(idx, filteredList);
      });
    });

    // Lightbox Controls
    const lightbox = container.querySelector('#gallery-lightbox');
    const closeBtn = container.querySelector('#close-lightbox');
    const prevBtn = container.querySelector('#lightbox-prev');
    const nextBtn = container.querySelector('#lightbox-next');
    const backdrop = container.querySelector('.lightbox-backdrop');

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (backdrop) backdrop.addEventListener('click', closeLightbox);

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (activeLightboxIndex > 0) {
          openLightbox(activeLightboxIndex - 1, filteredList);
        } else {
          openLightbox(filteredList.length - 1, filteredList);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (activeLightboxIndex < filteredList.length - 1) {
          openLightbox(activeLightboxIndex + 1, filteredList);
        } else {
          openLightbox(0, filteredList);
        }
      });
    }

    // Keyboard navigation
    const keyHandler = (e) => {
      if (!lightbox || !lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
      if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
    };

    window.removeEventListener('keydown', keyHandler);
    window.addEventListener('keydown', keyHandler);
  }

  function openLightbox(index, currentList) {
    const lightbox = container.querySelector('#gallery-lightbox');
    if (!lightbox || !currentList[index]) return;

    activeLightboxIndex = index;
    const item = currentList[index];

    container.querySelector('#lightbox-img').src = item.image;
    container.querySelector('#lightbox-img').alt = item.title;
    container.querySelector('#lightbox-tag').innerText = item.categoryLabel;
    container.querySelector('#lightbox-title').innerText = item.title;
    container.querySelector('#lightbox-desc').innerText = item.description;
    container.querySelector('#lightbox-counter').innerText = `Photo ${index + 1} of ${currentList.length}`;

    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const lightbox = container.querySelector('#gallery-lightbox');
    if (lightbox) {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  renderContent();
  return container;
}
