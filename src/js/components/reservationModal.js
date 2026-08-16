// Table Reservation Modal Component
import { store } from '../store.js';
import { showToast } from './toast.js';

class ReservationModal {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    this.createDOM();
    this.bindEvents();
  }

  createDOM() {
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'order-modal-backdrop';
    this.backdrop.id = 'res-modal-backdrop';

    this.card = document.createElement('div');
    this.card.className = 'order-modal-card';
    this.card.style.maxWidth = '560px';

    this.renderForm();

    this.backdrop.appendChild(this.card);
    document.body.appendChild(this.backdrop);
  }

  renderForm() {
    const today = new Date().toISOString().split('T')[0];

    this.card.innerHTML = `
      <div class="order-modal-header">
        <div>
          <h2 style="font-size: 1.4rem; color: var(--deep-espresso);">Reserve a Table</h2>
          <p style="font-size: 0.85rem; color: var(--text-muted);">Enjoy an unforgettable dining experience at Desi Tadka.</p>
        </div>
        <button class="icon-btn" id="close-res-modal">✕</button>
      </div>

      <div class="order-modal-body">
        <form id="reservation-form">
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" id="res-name" class="form-control" placeholder="Enter full name" required>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
            <div class="form-group">
              <label class="form-label">Phone Number *</label>
              <input type="tel" id="res-phone" class="form-control" placeholder="Enter phone" required>
            </div>
            <div class="form-group">
              <label class="form-label">Email Address</label>
              <input type="email" id="res-email" class="form-control" placeholder="Enter email">
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem;">
            <div class="form-group">
              <label class="form-label">Date *</label>
              <input type="date" id="res-date" class="form-control" min="${today}" value="${today}" required>
            </div>
            <div class="form-group">
              <label class="form-label">Time *</label>
              <select id="res-time" class="form-control" required>
                <option value="12:00 PM">12:00 PM</option>
                <option value="01:00 PM">01:00 PM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="07:00 PM" selected>07:00 PM</option>
                <option value="08:00 PM">08:00 PM</option>
                <option value="09:00 PM">09:00 PM</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Guests *</label>
              <select id="res-guests" class="form-control" required>
                <option value="2">2 Guests</option>
                <option value="4" selected>4 Guests</option>
                <option value="6">6 Guests</option>
                <option value="8">8 Guests</option>
                <option value="10">10+ Guests</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Special Requests (Optional)</label>
            <textarea id="res-notes" class="form-control" placeholder="Anniversary, birthday, high chair, window seating..." style="min-height: 80px;"></textarea>
          </div>

          <button type="submit" class="btn btn-primary btn-block" style="padding: 0.95rem; font-size: 1rem; margin-top: 1rem;">
            Confirm Reservation ✨
          </button>
        </form>
      </div>
    `;

    this.bindFormEvents();
  }

  bindFormEvents() {
    const closeBtn = this.card.querySelector('#close-res-modal');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    const form = this.card.querySelector('#reservation-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = this.card.querySelector('#res-name').value.trim();
        const phone = this.card.querySelector('#res-phone').value.trim();
        const date = this.card.querySelector('#res-date').value;
        const time = this.card.querySelector('#res-time').value;
        const guests = this.card.querySelector('#res-guests').value;
        const email = this.card.querySelector('#res-email').value.trim();
        const notes = this.card.querySelector('#res-notes').value.trim();

        if (!name || !phone) {
          showToast('Please enter your Name and Phone number!', 'warning');
          return;
        }

        store.addInquiry({
          type: 'reservation',
          name,
          phone,
          email,
          date,
          time,
          guests,
          subject: `Table Reservation for ${guests} Guests`,
          message: `Table booking for ${guests} guests on ${date} at ${time}. ${notes ? 'Notes: ' + notes : ''}`
        });

        showToast(`Table reserved for ${guests} guests on ${date} at ${time}! ✅`, 'success');
        this.renderConfirmation(name, date, time, guests);
      });
    }
  }

  renderConfirmation(name, date, time, guests) {
    this.card.innerHTML = `
      <div class="order-modal-header" style="background-color: var(--cream);">
        <h3 style="color: var(--deep-espresso);">Table Reservation</h3>
        <button class="icon-btn" id="close-res-modal">✕</button>
      </div>

      <div class="order-modal-body" style="text-align: center; padding: 2.5rem 1.5rem;">
        <div class="success-checkmark">🥂</div>
        <h2 style="font-size: 2rem; color: var(--deep-espresso); margin-bottom: 0.5rem;">Reservation Confirmed!</h2>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">
          We look forward to welcoming you, <strong>${name}</strong>!
        </p>

        <div style="background-color: var(--white); border: 1.5px dashed var(--primary-border); padding: 1.25rem; border-radius: var(--radius-md); max-width: 380px; margin: 0 auto 1.5rem; text-align: left;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <span>Reserved Date:</span>
            <strong>${date}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <span>Reserved Time:</span>
            <strong>${time}</strong>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span>Party Size:</span>
            <strong>${guests} Guests</strong>
          </div>
        </div>

        <button class="btn btn-primary" id="res-done-btn">Done</button>
      </div>
    `;

    const closeBtn = this.card.querySelector('#close-res-modal');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    const doneBtn = this.card.querySelector('#res-done-btn');
    if (doneBtn) doneBtn.addEventListener('click', () => this.close());
  }

  bindEvents() {
    this.backdrop.addEventListener('click', (e) => {
      if (e.target === this.backdrop) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });
  }

  open() {
    this.isOpen = true;
    this.renderForm();
    this.backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen = false;
    this.backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

export const reservationModal = new ReservationModal();

export function openReservationModal() {
  reservationModal.open();
}
