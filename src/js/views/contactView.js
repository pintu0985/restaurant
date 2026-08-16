// Contact Us Page View Renderer with Table Reservation CTA
import { restaurantData } from '../../data/restaurantData.js';
import { store } from '../store.js';
import { showToast } from '../components/toast.js';
import { openReservationModal } from '../components/reservationModal.js';

export function renderContactView() {
  const container = document.createElement('div');
  container.className = 'view-container';

  container.innerHTML = `
    <!-- CONTACT HERO -->
    <section class="section section-dark" style="padding: 4rem 0; text-align: center; background: linear-gradient(rgba(43,13,0,0.85), rgba(43,13,0,0.85)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80') center/cover;">
      <div class="container">
        <div class="section-subtext" style="color: var(--warm-beige);">We Are At Your Service</div>
        <h1 class="hero-title" style="margin-bottom: 0.5rem;">Get In Touch</h1>
        <p class="hero-desc" style="max-width: 600px; margin: 0 auto; color: var(--cream);">
          We'd love to hear from you. Reach out for inquiries, private dining, or feedback.
        </p>
      </div>
    </section>

    <!-- CONTACT INFO & FORM -->
    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <!-- Information Cards -->
          <div class="info-cards">
            <div class="info-card">
              <div class="info-icon">📍</div>
              <div>
                <h4 style="font-size: 1.1rem; color: var(--deep-espresso); margin-bottom: 0.35rem;">Restaurant Location</h4>
                <p style="color: var(--text-muted); font-size: 0.95rem;">${restaurantData.contact.address}</p>
              </div>
            </div>

            <div class="info-card">
              <div class="info-icon">📞</div>
              <div>
                <h4 style="font-size: 1.1rem; color: var(--deep-espresso); margin-bottom: 0.35rem;">Phone & Reservations</h4>
                <p style="color: var(--text-muted); font-size: 0.95rem;">${restaurantData.contact.phone}</p>
                <p style="color: var(--text-muted); font-size: 0.88rem;">${restaurantData.contact.phoneSecondary}</p>
              </div>
            </div>

            <div class="info-card">
              <div class="info-icon">✉️</div>
              <div>
                <h4 style="font-size: 1.1rem; color: var(--deep-espresso); margin-bottom: 0.35rem;">Email Address</h4>
                <p style="color: var(--text-muted); font-size: 0.95rem;">${restaurantData.contact.email}</p>
              </div>
            </div>

            <div class="info-card">
              <div class="info-icon">⏰</div>
              <div>
                <h4 style="font-size: 1.1rem; color: var(--deep-espresso); margin-bottom: 0.35rem;">Opening Hours</h4>
                <p style="color: var(--text-muted); font-size: 0.95rem;"><strong>Monday – Sunday:</strong> 11:30 AM – 11:30 PM</p>
              </div>
            </div>

            <div class="info-card">
              <div class="info-icon">📲</div>
              <div>
                <h4 style="font-size: 1.1rem; color: var(--deep-espresso); margin-bottom: 0.35rem;">Social Media Channels</h4>
                <div style="display: flex; gap: 0.6rem; margin-top: 0.5rem;">
                  <a href="${restaurantData.social.instagram}" target="_blank" rel="noopener noreferrer" class="social-icon social-instagram" title="Instagram">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                  <a href="${restaurantData.social.facebook}" target="_blank" rel="noopener noreferrer" class="social-icon social-facebook" title="Facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a href="${restaurantData.social.youtube}" target="_blank" rel="noopener noreferrer" class="social-icon social-youtube" title="YouTube">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                  </a>
                  <a href="${restaurantData.social.whatsapp}" target="_blank" rel="noopener noreferrer" class="social-icon social-whatsapp" title="WhatsApp">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Inquiry Form -->
          <div class="form-box">
            <h3 style="font-size: 1.6rem; color: var(--deep-espresso); margin-bottom: 0.5rem;">Send Us a Message</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">Have a question or custom catering request? Fill out the form below.</p>
            
            <form id="contact-us-form">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                  <label class="form-label">Full Name *</label>
                  <input type="text" id="contact-name" class="form-control" placeholder="John Doe" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Email Address *</label>
                  <input type="email" id="contact-email" class="form-control" placeholder="john@example.com" required>
                </div>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                  <label class="form-label">Phone Number *</label>
                  <input type="tel" id="contact-phone" class="form-control" placeholder="+91 98765 43210" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Subject</label>
                  <input type="text" id="contact-subject" class="form-control" placeholder="General Inquiry / Feedback">
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Your Message *</label>
                <textarea id="contact-message" class="form-control" placeholder="Write your message here..." required></textarea>
              </div>

              <button type="submit" class="btn btn-primary btn-block" style="padding: 0.95rem; font-size: 1rem;">
                Send Message 📤
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- GOOGLE MAPS EMBED -->
    <section class="section section-alt" style="padding-bottom: 0;">
      <div class="container">
        <div class="section-title-wrap" style="margin-bottom: 1.5rem;">
          <div class="section-subtext">Find Us</div>
          <h2 class="section-heading">Our Location</h2>
        </div>

        <div style="border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow-md); border: 1px solid var(--primary-border); height: 380px;">
          <iframe 
            src="${restaurantData.contact.mapEmbedUrl}" 
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy">
          </iframe>
        </div>
      </div>
    </section>

    <!-- RESERVATION CTA -->
    <section class="section">
      <div class="container">
        <div class="cta-banner" style="background: linear-gradient(135deg, var(--primary) 0%, var(--dark-brown) 100%);">
          <h2 class="cta-banner-title">Planning a Visit?</h2>
          <p class="cta-banner-text">Reserve your table ahead of time and enjoy a memorable, frictionless dining experience with your family and loved ones.</p>
          <button type="button" class="btn btn-secondary contact-reserve-btn" style="font-size: 1.1rem; padding: 1rem 2.25rem;">
            Reserve a Table
          </button>
        </div>
      </div>
    </section>
  `;

  // Bind Form Event
  const form = container.querySelector('#contact-us-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = container.querySelector('#contact-name').value.trim();
      const email = container.querySelector('#contact-email').value.trim();
      const phone = container.querySelector('#contact-phone').value.trim();
      const subject = container.querySelector('#contact-subject').value.trim();
      const message = container.querySelector('#contact-message').value.trim();

      if (!name || !email || !phone || !message) {
        showToast('Please fill in all required fields!', 'warning');
        return;
      }

      store.addInquiry({
        type: 'contact',
        name,
        email,
        phone,
        subject,
        message
      });

      form.reset();
      showToast('Message sent successfully! We will get back to you soon. ✅', 'success');
    });
  }

  const resBtn = container.querySelector('.contact-reserve-btn');
  if (resBtn) {
    resBtn.addEventListener('click', () => openReservationModal());
  }

  return container;
}
