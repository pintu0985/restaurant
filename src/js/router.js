// SPA Hash Router with Clean Query Parsing, SEO Dynamic Titles & QR Table Detection
import { renderHomeView } from './views/homeView.js';
import { renderAboutView } from './views/aboutView.js';
import { renderMenuView } from './views/menuView.js';
import { renderGalleryView } from './views/galleryView.js';
import { renderOrderView } from './views/orderView.js';
import { renderContactView } from './views/contactView.js';
import { renderLegalView } from './views/legalView.js';
import { renderTrackView } from './views/trackView.js';
import { renderDashboardView } from './views/dashboardView.js';
import { updateActiveNavLink } from './components/navbar.js';
import { store } from './store.js';

const routes = {
  home: {
    title: "Desi Tadka | Pure Veg Restaurant & Authentic Indian Taste",
    render: renderHomeView
  },
  about: {
    title: "About Desi Tadka | Our Story & Authentic Indian Heritage",
    render: renderAboutView
  },
  menu: {
    title: "Restaurant Menu | Desi Tadka",
    render: renderMenuView
  },
  gallery: {
    title: "Photo Gallery | Desi Tadka",
    render: renderGalleryView
  },
  order: {
    title: "Order Food Online | Desi Tadka",
    render: renderOrderView
  },
  contact: {
    title: "Contact Desi Tadka | Location & Hours",
    render: renderContactView
  },
  track: {
    title: "Live Order Tracking | Desi Tadka",
    render: renderTrackView
  },
  dashboard: {
    title: "Restaurant Management & Kitchen Dashboard | Desi Tadka",
    render: renderDashboardView
  },
  admin: {
    title: "Restaurant Management & Kitchen Dashboard | Desi Tadka",
    render: renderDashboardView
  },
  terms: {
    title: "Terms & Conditions | Desi Tadka",
    render: () => renderLegalView('terms')
  },
  privacy: {
    title: "Privacy Policy | Desi Tadka",
    render: () => renderLegalView('privacy')
  },
  refund: {
    title: "Refund Policy | Desi Tadka",
    render: () => renderLegalView('refund')
  }
};

export function initRouter(appElement) {
  function handleRoute() {
    let rawHash = window.location.hash ? window.location.hash.slice(1) : '';
    let routeName = 'home';
    let queryParams = new URLSearchParams();

    // Separate route name from query parameters e.g. #menu?cat=paneer-tikka or #order?table=12
    if (rawHash.includes('?')) {
      const parts = rawHash.split('?');
      routeName = parts[0] || 'home';
      queryParams = new URLSearchParams(parts[1]);
    } else if (rawHash.trim()) {
      routeName = rawHash.trim();
    }

    // Check for QR table parameter in hash or window search
    if (queryParams.has('table')) {
      store.setTableNumber(queryParams.get('table'));
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.has('table')) {
        store.setTableNumber(searchParams.get('table'));
      }
    }

    // Validate route or fallback to 'home'
    if (!routes[routeName]) {
      routeName = 'home';
    }

    const currentRoute = routes[routeName];

    // Update document title
    document.title = currentRoute.title;

    // Render View cleanly
    appElement.innerHTML = '';
    try {
      const viewNode = currentRoute.render();
      if (viewNode) {
        appElement.appendChild(viewNode);
      }
    } catch (err) {
      console.error('Error rendering route:', routeName, err);
      // Fallback rendering
      appElement.appendChild(renderHomeView());
    }

    // Update active nav link
    updateActiveNavLink(routeName);

    // Scroll top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  window.addEventListener('hashchange', handleRoute);
  
  // Set default hash if empty
  if (!window.location.hash) {
    window.location.hash = '#home';
  } else {
    handleRoute();
  }
}
