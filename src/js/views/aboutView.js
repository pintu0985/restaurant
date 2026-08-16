// Official About Us Page View Renderer for Desi Tadka
// Authentic Indian Heritage Aesthetics, Cultural Icons, Philosophy Cards & Statistics
import { restaurantData } from '../../data/restaurantData.js';

export function renderAboutView() {
  const container = document.createElement('div');
  container.className = 'view-container';

  container.innerHTML = `
    <!-- 1. HERO SECTION WITH HERITAGE STYLING -->
    <section class="section section-dark" style="padding: 5.5rem 0; text-align: center; background: linear-gradient(135deg, rgba(31,10,2,0.92), rgba(74,25,0,0.88)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80') center/cover; position: relative; border-bottom: 3px solid var(--gold-accent);">
      <div class="container" style="max-width: 900px;">
        
        <!-- 360 DEGREE CIRCULAR EMBLEM LOGO -->
        <div style="margin: 0 auto 1.5rem; width: 110px; height: 110px; border-radius: 50%; background: #ffffff; padding: 5px; border: 3.5px solid var(--gold-accent); box-shadow: 0 10px 30px rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; overflow: hidden;">
          <img src="/logo.png" alt="Desi Tadka" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
        </div>

        <div class="section-subtext" style="color: var(--warm-beige); font-size: 0.95rem; letter-spacing: 2px; text-transform: uppercase; font-weight: 700; margin-bottom: 0.5rem;">
          Est. 2016 • Pure Veg Restaurant • Authentic Indian Taste
        </div>
        
        <h1 class="hero-title" style="margin-bottom: 1rem; color: #ffffff; font-family: var(--font-heading); font-weight: 900; font-size: 2.8rem; line-height: 1.15;">
          Welcome To Desi Tadka
        </h1>
        
        <div style="display: inline-block; background: rgba(133, 46, 1, 0.7); border: 1.5px solid var(--gold-accent); padding: 0.6rem 1.75rem; border-radius: 50px; margin-bottom: 2rem;">
          <span style="font-size: 1.15rem; font-weight: 800; color: #fef3c7; font-family: var(--font-heading); letter-spacing: 2px;">
            TURBAN, BHANGRA, DHOL & FOOD
          </span>
        </div>

        <!-- 4 CULTURAL PILLARS BADGES -->
        <div style="display: flex; justify-content: center; gap: 1.25rem; flex-wrap: wrap; margin-top: 1rem;">
          <div style="background: rgba(255,247,239,0.08); border: 1px solid rgba(255,247,239,0.2); padding: 0.75rem 1.25rem; border-radius: var(--radius-md); text-align: center;">
            <span style="font-size: 1.5rem; display: block; margin-bottom: 2px;">👳🏽‍♂️</span>
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--cream);">TURBAN</span>
          </div>
          <div style="background: rgba(255,247,239,0.08); border: 1px solid rgba(255,247,239,0.2); padding: 0.75rem 1.25rem; border-radius: var(--radius-md); text-align: center;">
            <span style="font-size: 1.5rem; display: block; margin-bottom: 2px;">💃🏽</span>
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--cream);">BHANGRA</span>
          </div>
          <div style="background: rgba(255,247,239,0.08); border: 1px solid rgba(255,247,239,0.2); padding: 0.75rem 1.25rem; border-radius: var(--radius-md); text-align: center;">
            <span style="font-size: 1.5rem; display: block; margin-bottom: 2px;">🥁</span>
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--cream);">DHOL</span>
          </div>
          <div style="background: rgba(255,247,239,0.08); border: 1px solid rgba(255,247,239,0.2); padding: 0.75rem 1.25rem; border-radius: var(--radius-md); text-align: center;">
            <span style="font-size: 1.5rem; display: block; margin-bottom: 2px;">🫓</span>
            <span style="font-size: 0.85rem; font-weight: 700; color: var(--cream);">FOOD</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. OFFICIAL ABOUT CONTENT SECTION -->
    <section class="section" style="background-color: var(--cream);">
      <div class="container" style="max-width: 1040px;">
        <div class="two-col-grid" style="align-items: center; gap: 3rem;">
          
          <div class="img-stack">
            <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80" alt="Authentic Amritsari Food" style="border-radius: var(--radius-lg); box-shadow: var(--shadow-md); border: 2px solid var(--primary-border);">
            <div class="experience-badge" style="background: #852e01; color: var(--white); border: 2px solid var(--gold-accent);">
              <div class="exp-num" style="color: #fef3c7;">2016</div>
              <div class="exp-lbl">Year Established</div>
            </div>
          </div>

          <div>
            <div class="section-subtext" style="text-align: left; color: #852e01;">Our Heritage & Legacy</div>
            <h2 class="section-heading" style="text-align: left; margin-bottom: 1.25rem; color: var(--deep-espresso); font-family: var(--font-heading);">
              The Authentic Taste of Ambarsar
            </h2>
            
            <p style="color: var(--text-dark); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1rem;">
              "Turban, Bhangra, Dhol & Food gives a clear glimpse of Punjab's cultural heritage. Food delicacies viz. <strong>Kulche Chhole, Makke Di Roti & a glassful of Lassi</strong> can never be ignored."
            </p>

            <p style="color: var(--text-dark); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1rem;">
              "The symphony of exotic dishes infused in the orchestra of <strong>Desi Ghee & Looni Makkhan</strong> demarcates the authenticity of quintessential flavours of the Punjab at Desi Tadka."
            </p>

            <p style="color: var(--text-dark); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1rem;">
              "We capture the Authentic Taste of Punjab's food capital – <strong>AMBARSAR</strong>, also known as <strong>AMRITSAR</strong>."
            </p>

            <p style="color: var(--text-dark); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1rem;">
              "Since our establishment in <strong>2016</strong>, we aim at providing Simply Authentic Best Quality Nutritious Food."
            </p>

            <p style="color: var(--text-dark); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.25rem;">
              "At Desi Tadka, the balance of spices and richness of flavours developed promises a proper intake of all essential nutrients when it comes to HEALTH."
            </p>

            <p style="color: var(--text-dark); font-size: 1.05rem; line-height: 1.7; margin-bottom: 1.5rem; font-weight: 600;">
              "Hence, we assure you a roller coaster ride of True Taste of Punjab to your plate."
            </p>

            <!-- HEALTH TAGLINE BANNER -->
            <div style="background: linear-gradient(135deg, #852e01 0%, #4A1900 100%); color: #fef3c7; padding: 1rem 1.5rem; border-radius: var(--radius-md); display: inline-block; font-weight: 900; font-size: 1.15rem; letter-spacing: 1.5px; border: 1.5px solid var(--gold-accent); font-family: var(--font-heading);">
              ❤️ EAT HEALTHY! STAY HEALTHY!
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 3. OUR PHILOSOPHY SECTION -->
    <section class="section" style="background-color: var(--white);">
      <div class="container">
        <div class="section-title-wrap">
          <div class="section-subtext" style="color: #852e01;">Core Values & Standards</div>
          <h2 class="section-heading" style="color: var(--deep-espresso); font-family: var(--font-heading);">Our Philosophy</h2>
          <p class="section-desc">Guided by uncompromising commitment to traditional taste, health, and guest satisfaction.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
          
          <div style="background: var(--cream); border: 1.5px solid var(--primary-border); border-radius: var(--radius-lg); padding: 1.75rem 1.5rem; text-align: center; transition: var(--transition);">
            <div style="font-size: 2.4rem; margin-bottom: 0.75rem;">🍲</div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: #852e01; margin-bottom: 0.5rem; font-family: var(--font-heading);">Authentic Punjabi Taste</h3>
            <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.5; margin: 0;">Genuine Amritsari recipes infused with hand-crushed spices and pure Desi Ghee.</p>
          </div>

          <div style="background: var(--cream); border: 1.5px solid var(--primary-border); border-radius: var(--radius-lg); padding: 1.75rem 1.5rem; text-align: center; transition: var(--transition);">
            <div style="font-size: 2.4rem; margin-bottom: 0.75rem;">🌿</div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: #852e01; margin-bottom: 0.5rem; font-family: var(--font-heading);">Fresh Ingredients</h3>
            <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.5; margin: 0;">Freshly harvested farm vegetables, pure Looni Makkhan, and aromatic herbs.</p>
          </div>

          <div style="background: var(--cream); border: 1.5px solid var(--primary-border); border-radius: var(--radius-lg); padding: 1.75rem 1.5rem; text-align: center; transition: var(--transition);">
            <div style="font-size: 2.4rem; margin-bottom: 0.75rem;">🥗</div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: #852e01; margin-bottom: 0.5rem; font-family: var(--font-heading);">Nutritious Food</h3>
            <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.5; margin: 0;">Balanced spice profiles promising a proper intake of all essential nutrients for your health.</p>
          </div>

          <div style="background: var(--cream); border: 1.5px solid var(--primary-border); border-radius: var(--radius-lg); padding: 1.75rem 1.5rem; text-align: center; transition: var(--transition);">
            <div style="font-size: 2.4rem; margin-bottom: 0.75rem;">🏺</div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: #852e01; margin-bottom: 0.5rem; font-family: var(--font-heading);">Traditional Flavours</h3>
            <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.5; margin: 0;">Preserving timeless recipes from the cultural heartland of Punjab.</p>
          </div>

          <div style="background: var(--cream); border: 1.5px solid var(--primary-border); border-radius: var(--radius-lg); padding: 1.75rem 1.5rem; text-align: center; transition: var(--transition);">
            <div style="font-size: 2.4rem; margin-bottom: 0.75rem;">⭐</div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: #852e01; margin-bottom: 0.5rem; font-family: var(--font-heading);">Quality Food</h3>
            <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.5; margin: 0;">Uncompromising quality control and hygiene standards across every dish.</p>
          </div>

          <div style="background: var(--cream); border: 1.5px solid var(--primary-border); border-radius: var(--radius-lg); padding: 1.75rem 1.5rem; text-align: center; transition: var(--transition);">
            <div style="font-size: 2.4rem; margin-bottom: 0.75rem;">👨‍🍳</div>
            <h3 style="font-size: 1.25rem; font-weight: 800; color: #852e01; margin-bottom: 0.5rem; font-family: var(--font-heading);">Creative Chefs</h3>
            <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.5; margin: 0;">Master culinary artists bringing passion and innovation to your dining table.</p>
          </div>

        </div>
      </div>
    </section>

    <!-- 4. THREE SPECIAL FEATURE CARDS -->
    <section class="section section-alt" style="background-color: var(--warm-beige);">
      <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
          
          <div style="background: var(--white); padding: 2.25rem; border-radius: var(--radius-lg); border: 1.5px solid var(--primary-border); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 2.5rem; margin-bottom: 1rem; color: #852e01;">📜</div>
              <h3 style="font-size: 1.4rem; font-weight: 800; color: #852e01; margin-bottom: 0.75rem; font-family: var(--font-heading);">Daily Fresh Menus</h3>
              <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6;">
                "Desi Tadka helps you treat yourself with a different meal everyday, thanks to our daily changing menus and our awesome creative chefs!"
              </p>
            </div>
          </div>

          <div style="background: var(--white); padding: 2.25rem; border-radius: var(--radius-lg); border: 1.5px solid var(--primary-border); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 2.5rem; margin-bottom: 1rem; color: #852e01;">🥦</div>
              <h3 style="font-size: 1.4rem; font-weight: 800; color: #852e01; margin-bottom: 0.75rem; font-family: var(--font-heading);">Fresh Ingredients</h3>
              <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6;">
                "Who said healthy food can't also be delicious? Desi Tadka creative chefs use fresh and seasonal ingredients to make affordable, tasty and nourishing meals."
              </p>
            </div>
          </div>

          <div style="background: var(--white); padding: 2.25rem; border-radius: var(--radius-lg); border: 1.5px solid var(--primary-border); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 2.5rem; margin-bottom: 1rem; color: #852e01;">🧑‍🍳</div>
              <h3 style="font-size: 1.4rem; font-weight: 800; color: #852e01; margin-bottom: 0.75rem; font-family: var(--font-heading);">Creative Chef</h3>
              <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6;">
                "Desi Tadka helps you treat yourself with a different meal everyday, thanks to our daily changing menus and our awesome creative chefs!"
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 5. RESTAURANT STATISTICS COUNTERS -->
    <section class="section section-dark" style="background: linear-gradient(135deg, #170701 0%, #341204 100%); padding: 4.5rem 0; border-y: 2px solid var(--gold-accent);">
      <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; text-align: center;">
          
          <div style="padding: 1.5rem; background: rgba(255, 247, 239, 0.04); border-radius: var(--radius-md); border: 1px solid rgba(133, 46, 1, 0.4);">
            <div style="font-size: 2.8rem; font-weight: 900; color: #fef3c7; font-family: var(--font-heading); margin-bottom: 0.35rem;">8019+</div>
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--cream); text-transform: uppercase; letter-spacing: 1px;">Customer Served</div>
          </div>

          <div style="padding: 1.5rem; background: rgba(255, 247, 239, 0.04); border-radius: var(--radius-md); border: 1px solid rgba(133, 46, 1, 0.4);">
            <div style="font-size: 2.8rem; font-weight: 900; color: #fef3c7; font-family: var(--font-heading); margin-bottom: 0.35rem;">85+</div>
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--cream); text-transform: uppercase; letter-spacing: 1px;">Dishes In Menu</div>
          </div>

          <div style="padding: 1.5rem; background: rgba(255, 247, 239, 0.04); border-radius: var(--radius-md); border: 1px solid rgba(133, 46, 1, 0.4);">
            <div style="font-size: 2.8rem; font-weight: 900; color: #fef3c7; font-family: var(--font-heading); margin-bottom: 0.35rem;">30+</div>
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--cream); text-transform: uppercase; letter-spacing: 1px;">Working Hands</div>
          </div>

          <div style="padding: 1.5rem; background: rgba(255, 247, 239, 0.04); border-radius: var(--radius-md); border: 1px solid rgba(133, 46, 1, 0.4);">
            <div style="font-size: 2.8rem; font-weight: 900; color: #fef3c7; font-family: var(--font-heading); margin-bottom: 0.35rem;">148+</div>
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--cream); text-transform: uppercase; letter-spacing: 1px;">Positive Reviews</div>
          </div>

        </div>
      </div>
    </section>

    <!-- 6. FEATURED CUSTOMER TESTIMONIAL -->
    <section class="section" style="background-color: var(--white);">
      <div class="container" style="max-width: 800px;">
        <div class="section-title-wrap">
          <div class="section-subtext" style="color: #852e01;">What Guests Say</div>
          <h2 class="section-heading" style="color: var(--deep-espresso); font-family: var(--font-heading);">Featured Review</h2>
        </div>

        <div style="background: var(--light-beige); border: 2px solid var(--primary-border); border-radius: var(--radius-lg); padding: 2.5rem; text-align: center; box-shadow: var(--shadow-sm); position: relative;">
          <div style="font-size: 1.5rem; color: #f59e0b; margin-bottom: 1rem;">★★★★★</div>
          
          <p style="font-size: 1.15rem; color: var(--deep-espresso); font-style: italic; line-height: 1.7; margin-bottom: 1.5rem; font-weight: 600;">
            "The food is incredibly tasty. The serving portion is excellent and the price is very affordable. Amritsari kulcha and chur chur naan are their speciality but every item in the ..."
          </p>

          <div style="border-top: 1px solid var(--primary-border); padding-top: 1rem; display: inline-block;">
            <div style="font-weight: 800; font-size: 1.1rem; color: #852e01; font-family: var(--font-heading);">Dr Aashish Manghrani</div>
            <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">Verified Customer & Guest</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. CONTACT INFO, MAP LINK & OPENING HOURS DUAL SECTION -->
    <section class="section section-alt" style="background-color: var(--cream);">
      <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
          
          <!-- CONTACT DETAILS & VIEW ON MAP -->
          <div style="background: var(--white); border: 1.5px solid var(--primary-border); border-radius: var(--radius-lg); padding: 2.25rem;">
            <div style="font-size: 2.2rem; margin-bottom: 0.5rem; color: #852e01;">📍</div>
            <h3 style="font-size: 1.4rem; font-weight: 800; color: #852e01; margin-bottom: 1rem; font-family: var(--font-heading);">Contact & Location</h3>
            
            <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 0.98rem; color: var(--deep-espresso); margin-bottom: 1.75rem;">
              <div>
                <strong>📍 Address:</strong><br>
                Ajmer, Rajasthan 305001
              </div>
              <div>
                <strong>📞 Phone:</strong><br>
                <a href="tel:+919001606484" style="color: #852e01; font-weight: 700; text-decoration: underline;">+91 9799313525</a>
              </div>
              <div>
                <strong>✉️ Email:</strong><br>
                <a href="mailto:info@growthifydigital.online" style="color: #852e01; font-weight: 700; text-decoration: underline;">info@growthifydigital.online</a>
              </div>
            </div>

            <a href="https://www.google.com/maps/search/?api=1&query=Near+ICICI+Bank+Sector+2+Vaishali+Nagar+Ajmer+Rajasthan+305004" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 0.85rem 1.75rem; background-color: #852e01; font-weight: 800; display: inline-flex; align-items: center; gap: 0.5rem;">
              <span>🗺️ View On Map</span>
            </a>
          </div>

            <!-- DESI TADKA TIMES OPENING HOURS -->
          <div style="background: linear-gradient(135deg, #170701 0%, #341204 100%); border: 1.5px solid rgba(133, 46, 1, 0.4); border-radius: var(--radius-lg); padding: 2.25rem; color: var(--white); display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">⏰</div>
              <h3 style="font-size: 1.4rem; font-weight: 800; color: #ffffff; margin-bottom: 0.25rem; font-family: var(--font-heading);">Desi Tadka Times</h3>
              <p style="color: var(--warm-beige); font-size: 0.88rem; margin-bottom: 1.5rem;">Opening Hours</p>

              <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.98rem; border-top: 1px dashed rgba(255,247,239,0.2); padding-top: 1rem;">
                <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(255,247,239,0.2); padding-bottom: 0.6rem;">
                  <span>Weekdays:</span>
                  <strong style="color: var(--warm-beige);">11:30 AM – 11:30 PM</strong>
                </div>
                <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(255,247,239,0.2); padding-bottom: 0.6rem;">
                  <span>Saturday:</span>
                  <strong style="color: var(--warm-beige);">11:30 AM – 11:30 PM</strong>
                </div>
                <div style="display: flex; justify-content: space-between; padding-bottom: 0.6rem;">
                  <span>Sunday:</span>
                  <strong style="color: var(--warm-beige);">11:30 AM – 11:30 PM</strong>
                </div>
              </div>
            </div>

            <div style="margin-top: 1.5rem; background: rgba(34, 197, 94, 0.15); border: 1px solid #22c55e; color: #4ade80; padding: 0.5rem 1rem; border-radius: var(--radius-md); font-size: 0.88rem; font-weight: 700; text-align: center;">
              ● Open Today for Dining, Takeaway & Delivery
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- 8. RESPONSIVE PHOTO GALLERY WITH LIGHTBOX -->
    <section class="section" style="background-color: var(--white);">
      <div class="container">
        <div class="section-title-wrap">
          <div class="section-subtext" style="color: #852e01;">Visual Journey</div>
          <h2 class="section-heading" style="color: var(--deep-espresso); font-family: var(--font-heading);">Restaurant & Culinary Gallery</h2>
          <p class="section-desc">Click any photo to enlarge and explore our kitchen, dining hall, and signature creations.</p>
        </div>

        <div class="gallery-grid">
          ${restaurantData.gallery.map(item => `
            <div class="gallery-item" data-src="${item.image}" data-title="${item.title}">
              <img src="${item.image}" alt="${item.title}">
              <div class="gallery-overlay">
                <span style="font-size: 0.75rem; background-color: #852e01; color: var(--white); padding: 2px 8px; border-radius: 4px; width: max-content; margin-bottom: 4px;">
                  ${item.category}
                </span>
                <strong style="font-size: 1rem;">${item.title}</strong>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- LIGHTBOX MODAL CONTAINER -->
    <div class="lightbox" id="gallery-lightbox">
      <button class="lightbox-close" id="lightbox-close-btn">✕</button>
      <img src="" alt="" class="lightbox-img" id="lightbox-target-img">
    </div>
  `;

  // Bind Lightbox Events
  const lightbox = container.querySelector('#gallery-lightbox');
  const targetImg = container.querySelector('#lightbox-target-img');
  const closeBtn = container.querySelector('#lightbox-close-btn');

  container.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const src = e.currentTarget.dataset.src;
      const title = e.currentTarget.dataset.title;
      targetImg.src = src;
      targetImg.alt = title;
      lightbox.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
  }
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) lightbox.classList.remove('active');
    });
  }

  return container;
}
