// Main Entry Point for Desi Tadka Web Application
import '../styles/main.css';
import { restaurantData } from '../data/restaurantData.js';
import { renderNavbar } from './components/navbar.js';
import { initRouter } from './router.js';
import { openOrderModal } from './components/orderModal.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  
  if (!root) {
    console.error('Root element not found!');
    return;
  }

  // 1. Render Sticky Navbar
  const navbarNode = renderNavbar();
  root.appendChild(navbarNode);

  // 2. Main View Container for SPA Router
  const mainApp = document.createElement('main');
  mainApp.id = 'app';
  root.appendChild(mainApp);

  // 3. Mobile Bottom Order Bar
  const mobileBar = document.createElement('div');
  mobileBar.className = 'mobile-bottom-bar';
  mobileBar.innerHTML = `
    <div>
      <div style="font-size: 0.75rem; font-weight: 700; color: var(--primary); text-transform: uppercase;">Desi Tadka</div>
      <div style="font-weight: 800; font-size: 0.95rem; color: var(--deep-espresso);">Quick Table & Online Order</div>
    </div>
    <button type="button" class="btn btn-primary btn-sm mobile-order-trigger">Order Now</button>
  `;
  mobileBar.querySelector('.mobile-order-trigger').addEventListener('click', () => openOrderModal('dine-in'));
  root.appendChild(mobileBar);

  // 4. Multi-Column Footer
  const footerNode = renderFooter();
  root.appendChild(footerNode);

  // 5. Initialize SPA Hash Router
  initRouter(mainApp);

  // 6. Initialize Global Scroll Reveal Animation Observer
  initScrollRevealObserver();
});

function initScrollRevealObserver() {
  if (typeof IntersectionObserver === 'undefined') return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  const observeElements = () => {
    document.querySelectorAll('.section-title, .food-card, .feature-card, .testimonial-card, .hero-content, .menu-controls').forEach(el => {
      if (!el.classList.contains('reveal-on-scroll') && !el.classList.contains('is-visible')) {
        el.classList.add('reveal-on-scroll');
        observer.observe(el);
      }
    });
  };

  observeElements();

  // Re-observe elements when route or DOM content changes
  window.addEventListener('hashchange', () => setTimeout(observeElements, 120));
  window.addEventListener('menu-updated', () => setTimeout(observeElements, 120));
  window.addEventListener('cart-updated', () => {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      badge.classList.remove('cart-badge-pop');
      void badge.offsetWidth; // Trigger reflow for animation restart
      badge.classList.add('cart-badge-pop');
    }
  });
}

function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <!-- Col 1: Brand Info -->
        <div>
          <a href="#home" class="brand-logo" style="margin-bottom: 1.25rem; display: inline-flex; align-items: center; gap: 0.85rem; text-decoration: none;">
            <div style="
              width: 60px;
              height: 60px;
              border-radius: 50%;
              overflow: hidden;
              background: #ffffff;
              border: 2.5px solid var(--gold-accent);
              box-shadow: 0 4px 15px rgba(0,0,0,0.4);
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 3px;
              flex-shrink: 0;
            ">
              <img src="/logo.png" alt="Desi Tadka" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
            </div>
            <div>
              <div style="font-weight: 800; font-size: 1.25rem; color: var(--cream); font-family: var(--font-heading); line-height: 1.1;">${restaurantData.name}</div>
              <div style="font-size: 0.68rem; color: var(--warm-beige); text-transform: uppercase; letter-spacing: 1px; font-weight: 600; margin-top: 2px;">${restaurantData.subTitle}</div>
            </div>
          </a>
          <p style="font-size: 0.9rem; color: rgba(255,247,239,0.8); line-height: 1.6; margin-bottom: 1.25rem;">
            ${restaurantData.description}
          </p>
          <div class="social-icons" style="display: flex; gap: 0.75rem; margin-top: 1rem;">
            <a href="${restaurantData.social.instagram}" target="_blank" rel="noopener noreferrer" class="social-icon social-instagram" title="Follow Desi Tadka on Instagram" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="${restaurantData.social.facebook}" target="_blank" rel="noopener noreferrer" class="social-icon social-facebook" title="Like Desi Tadka on Facebook" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="${restaurantData.social.youtube}" target="_blank" rel="noopener noreferrer" class="social-icon social-youtube" title="Subscribe to Desi Tadka on YouTube" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
            <a href="${restaurantData.social.whatsapp}" target="_blank" rel="noopener noreferrer" class="social-icon social-whatsapp" title="Chat with Desi Tadka on WhatsApp" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </a>
          </div>
        </div>

        <!-- Col 2: Quick Links -->
        <div>
          <h4 class="footer-col-title">Quick Links</h4>
          <div class="footer-links">
            <a href="#home" class="footer-link">Home</a>
            <a href="#about" class="footer-link">About Us</a>
            <a href="#menu" class="footer-link">Full Menu</a>
            <a href="#gallery" class="footer-link"> Photo Gallery</a>
            <a href="#order" class="footer-link">Online Order</a>
            <a href="#track" class="footer-link"> Track Live Order</a>
            <a href="#contact" class="footer-link">Contact Us</a>
          </div>
        </div>

        <!-- Col 3: Legal & Policies -->
        <div>
          <h4 class="footer-col-title">Legal & Policies</h4>
          <div class="footer-links">
            <a href="#privacy" class="footer-link">Privacy Policy</a>
            <a href="#refund" class="footer-link">Refund & Returns</a>
            <a href="#terms" class="footer-link">Terms & Conditions</a>
            <a href="#contact" class="footer-link">Contact Us</a>
          </div>
        </div>

        <!-- Col 4: Contact & Hours -->
        <div>
          <h4 class="footer-col-title">Contact & Hours</h4>
          <div style="font-size: 0.9rem; color: rgba(255,247,239,0.8); display: flex; flex-direction: column; gap: 0.6rem;">
            <div>📍 ${restaurantData.contact.address}</div>
            <div>📞 ${restaurantData.contact.phone}</div>
            <div>✉️ ${restaurantData.contact.email}</div>
            <div style="margin-top: 0.5rem; color: var(--warm-beige);">
              <strong>Opening Hours:</strong><br>
              Mon – Sun: 11:30 AM – 11:30 PM
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div>© 2026 ${restaurantData.name} (${restaurantData.subTitle}). All Rights Reserved.</div>
        <div style="display: flex; gap: 1.25rem; flex-wrap: wrap;">
          <a href="#privacy" style="color: inherit;">Privacy Policy</a>
          <a href="#refund" style="color: inherit;">Refund & Returns</a>
          <a href="#terms" style="color: inherit;">Terms & Conditions</a>
          <a href="#contact" style="color: inherit;">Contact Us</a>
        </div>
      </div>
    </div>
  `;

  return footer;
}
