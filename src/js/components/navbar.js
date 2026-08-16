// Sticky Navbar Component with Dynamic Cart Counter & Mobile Drawer
import { restaurantData } from '../../data/restaurantData.js';
import { store } from '../store.js';
import { cartDrawer } from './cartDrawer.js';
import { openOrderModal } from './orderModal.js';
import { openSearchModal } from './searchModal.js';

export function renderNavbar() {
  const header = document.createElement('header');
  header.className = 'navbar';
  header.id = 'main-navbar';

  header.innerHTML = `
    <div class="container navbar-container">
      <a href="#home" class="brand-logo" style="display: flex; align-items: center; gap: 0.75rem; text-decoration: none;">
        <div style="
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          background: #ffffff;
          border: 2px solid var(--gold-accent);
          box-shadow: 0 4px 12px rgba(133, 46, 1, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px;
          flex-shrink: 0;
        ">
          <img src="/logo.png" alt="Desi Tadka" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
        </div>
        <div style="display: flex; flex-direction: column;">
          <span style="font-weight: 800; font-size: 1.15rem; color: var(--deep-espresso); font-family: var(--font-heading); line-height: 1.1;">${restaurantData.name}</span>
          <span style="font-size: 0.62rem; font-family: var(--font-body); font-weight: 700; letter-spacing: 0.5px; color: var(--primary); text-transform: uppercase; margin-top: 1px;">Taste the Real India</span>
        </div>
      </a>

      <nav class="nav-menu" id="nav-menu">
        <a href="#home" class="nav-link" data-route="home">Home</a>
        <a href="#about" class="nav-link" data-route="about">About</a>
        <a href="#menu" class="nav-link" data-route="menu">Menu</a>
        <a href="#gallery" class="nav-link" data-route="gallery">Gallery</a>
        <a href="#order" class="nav-link" data-route="order">Order</a>
        <a href="#track" class="nav-link" data-route="track">Track Order </a>
        <a href="#contact" class="nav-link" data-route="contact">Contact</a>
      </nav>

      <div class="nav-actions">
        <button class="icon-btn" id="nav-search-btn" title="Search Dishes (Ctrl+K)" aria-label="Search">🔍</button>
        
        <button class="icon-btn" id="nav-cart-btn" title="View Shopping Cart" aria-label="Shopping Cart">
          🛒
          <span class="cart-badge" id="cart-badge-count">${store.getCartCount()}</span>
        </button>

        <button class="btn btn-primary btn-sm btn-order-now" id="nav-order-now-btn">
          Order Now
        </button>

        <button class="icon-btn hamburger-btn" id="hamburger-toggle" aria-label="Toggle navigation menu">
          ☰
        </button>
      </div>
    </div>
  `;

  // Bind Events
  const searchBtn = header.querySelector('#nav-search-btn');
  if (searchBtn) searchBtn.addEventListener('click', () => openSearchModal());

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearchModal();
    }
  });

  const cartBtn = header.querySelector('#nav-cart-btn');

  if (cartBtn) cartBtn.addEventListener('click', () => cartDrawer.open());

  const orderNowBtn = header.querySelector('#nav-order-now-btn');
  if (orderNowBtn) orderNowBtn.addEventListener('click', () => openOrderModal('dine-in'));

  const hamburger = header.querySelector('#hamburger-toggle');
  const navMenu = header.querySelector('#nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburger.innerHTML = navMenu.classList.contains('open') ? '✕' : '☰';
    });

    // Close menu when clicking links on mobile
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.innerHTML = '☰';
      });
    });
  }

  // Window scroll event for navbar shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Function to sync all cart badges across the site
  const updateCartBadge = () => {
    const count = store.getCartCount();
    const badges = document.querySelectorAll('.cart-badge, #cart-badge-count');
    badges.forEach(badge => {
      badge.textContent = count;
      if (count > 0) {
        badge.style.display = 'flex';
        badge.style.backgroundColor = '#d97706'; // Gold Accent Badge
      } else {
        badge.style.display = 'flex';
        badge.style.backgroundColor = '#852e01';
      }
    });
  };

  // Immediate sync on load
  setTimeout(updateCartBadge, 20);

  // Listen for cart changes to update badge
  window.addEventListener('cart-updated', () => {
    updateCartBadge();
    const badges = document.querySelectorAll('.cart-badge, #cart-badge-count');
    badges.forEach(badge => {
      badge.style.transform = 'scale(1.35)';
      setTimeout(() => { badge.style.transform = 'scale(1)'; }, 250);
    });
  });

  return header;
}

export function updateActiveNavLink(route) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    if (link.dataset.route === route) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
