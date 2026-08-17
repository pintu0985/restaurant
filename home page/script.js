// =============================================
// DESI TADKA — HOME PAGE JAVASCRIPT
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hamburger Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger-toggle');
  const navMenu = document.getElementById('nav-menu');
  
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

  // 2. Dynamic Live Opening Hours Checker (11:30 AM – 11:30 PM)
  function updateLiveHours() {
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();
    const openMins = 11 * 60 + 30;  // 11:30 AM = 690 mins
    const closeMins = 23 * 60 + 30; // 11:30 PM = 1410 mins
    const isOpen = currentMins >= openMins && currentMins < closeMins;
    
    const container = document.getElementById('live-status-container');
    if (container) {
      if (isOpen) {
        container.innerHTML = `
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(34, 197, 94, 0.15); border: 1.5px solid #22c55e; color: #4ade80; padding: 0.45rem 1.4rem; border-radius: 50px; font-weight: 700; font-size: 0.92rem; box-shadow: 0 4px 15px rgba(34, 197, 94, 0.2);">
            <span style="width: 9px; height: 9px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 10px #22c55e;"></span>
            <span>Open Today (11:30 AM – 11:30 PM)</span>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(239, 68, 68, 0.15); border: 1.5px solid #ef4444; color: #f87171; padding: 0.45rem 1.4rem; border-radius: 50px; font-weight: 700; font-size: 0.92rem;">
            <span style="width: 9px; height: 9px; border-radius: 50%; background: #ef4444;"></span>
            <span>Closed Now (Opens at 11:30 AM)</span>
          </div>
        `;
      }
    }
  }

  updateLiveHours();
  setInterval(updateLiveHours, 60000); // Recheck every minute

  // 3. Smooth Scroll for Explore Menu horizontal track (Touch / Mouse wheel)
  const track = document.getElementById('explore-track');
  if (track) {
    let isDown = false;
    let startX;
    let scrollLeft;

    track.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });

    track.addEventListener('mouseleave', () => { isDown = false; });
    track.addEventListener('mouseup', () => { isDown = false; });

    track.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });
  }
});
