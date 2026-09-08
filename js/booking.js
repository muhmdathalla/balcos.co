/**
 * Balcos.co - Booking & Reservation Controller
 * Handles Meeting Room, Space Rental & Table Inquiries
 */

const BOOKING_CONFIG = {
  whatsappNumber: "6285117439369", // 0851-1743-9369
  rates: {
    meetingRoomHourly: 50000,     // Rp 50.000 / jam (incl. Smart TV, AC, Wi-Fi, Water)
    meetingRoomFullDay: 350000,   // Rp 350.000 / full day (8 hrs)
    eventSpaceHourly: 150000,    // Rp 150.000 / jam
    communityTable: 0             // Free reserve with minimum F&B
  }
};

class BookingSystem {
  constructor() {
    this.selectedSpace = "meeting-room";
    this.selectedDate = new Date().toISOString().split("T")[0];
    this.selectedTime = "14:00";
    this.durationHours = 2;
    this.paxCount = 6;
    this.cateringAddon = false;
    this.customerName = "";
    this.customerPhone = "";
    this.notes = "";
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.updateCalculation();
  }

  bindEvents() {
    // Space type selector
    const spaceButtons = document.querySelectorAll(".space-type-btn");
    spaceButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        spaceButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.selectedSpace = btn.dataset.space;
        this.updateCalculation();
      });
    });

    // Inputs
    const dateInput = document.getElementById("booking-date");
    if (dateInput) {
      dateInput.min = new Date().toISOString().split("T")[0];
      dateInput.value = this.selectedDate;
      dateInput.addEventListener("change", (e) => {
        this.selectedDate = e.target.value;
      });
    }

    const timeInput = document.getElementById("booking-time");
    if (timeInput) {
      timeInput.addEventListener("change", (e) => {
        this.selectedTime = e.target.value;
      });
    }

    const durationInput = document.getElementById("booking-duration");
    if (durationInput) {
      durationInput.addEventListener("input", (e) => {
        this.durationHours = parseInt(e.target.value) || 1;
        document.getElementById("duration-display").textContent = `${this.durationHours} Jam`;
        this.updateCalculation();
      });
    }

    const paxInput = document.getElementById("booking-pax");
    if (paxInput) {
      paxInput.addEventListener("input", (e) => {
        this.paxCount = parseInt(e.target.value) || 1;
        document.getElementById("pax-display").textContent = `${this.paxCount} Orang`;
      });
    }

    const cateringCheck = document.getElementById("addon-catering");
    if (cateringCheck) {
      cateringCheck.addEventListener("change", (e) => {
        this.cateringAddon = e.target.checked;
        this.updateCalculation();
      });
    }

    // Submit via WhatsApp
    const submitBtn = document.getElementById("submit-booking-btn");
    if (submitBtn) {
      submitBtn.addEventListener("click", (e) => {
        e.preventDefault();
        this.submitBooking();
      });
    }
  }

  calculateTotal() {
    let ratePerHour = BOOKING_CONFIG.rates.meetingRoomHourly;
    let spaceName = "Meeting Room VIP";

    if (this.selectedSpace === "event-space") {
      ratePerHour = BOOKING_CONFIG.rates.eventSpaceHourly;
      spaceName = "Compound Event Area";
    } else if (this.selectedSpace === "community-table") {
      ratePerHour = 0;
      spaceName = "Komunal Working Table (Free Reserve)";
    }

    let subtotal = ratePerHour * this.durationHours;
    if (this.cateringAddon) {
      subtotal += (20000 * this.paxCount); // F&B Snack Package estimate
    }

    return {
      subtotal,
      spaceName,
      ratePerHour
    };
  }

  updateCalculation() {
    const calc = this.calculateTotal();
    const totalDisplay = document.getElementById("booking-total-price");
    if (totalDisplay) {
      if (calc.subtotal === 0) {
        totalDisplay.textContent = "FREE (F&B On-the-spot)";
      } else {
        totalDisplay.textContent = `Rp ${calc.subtotal.toLocaleString("id-ID")}`;
      }
    }
  }

  submitBooking() {
    const name = document.getElementById("booking-name")?.value.trim();
    const phone = document.getElementById("booking-phone")?.value.trim();
    const notes = document.getElementById("booking-notes")?.value.trim() || "-";

    if (!name || !phone) {
      alert("Mohon lengkapi Nama dan Nomor WhatsApp Anda terlebih dahulu.");
      return;
    }

    const calc = this.calculateTotal();
    const formattedPrice = calc.subtotal === 0 ? "Gratis Reservasi Meja" : `Rp ${calc.subtotal.toLocaleString("id-ID")}`;

    const message = `Halo Admin Balcos.co / Sebelas Coffee! ☕✨%0A%0ASaya ingin melakukan *Reservasi Ruang / Space di Balcos Compound*:%0A%0A` +
      `👤 *Nama*: ${encodeURIComponent(name)}%0A` +
      `📞 *No. WhatsApp*: ${encodeURIComponent(phone)}%0A` +
      `🏢 *Pilihan Ruang*: ${encodeURIComponent(calc.spaceName)}%0A` +
      `📅 *Tanggal*: ${encodeURIComponent(this.selectedDate)}%0A` +
      `⏰ *Waktu Mulai*: ${encodeURIComponent(this.selectedTime)} WIB%0A` +
      `⏳ *Durasi*: ${this.durationHours} Jam%0A` +
      `👥 *Kapasitas*: ${this.paxCount} Orang%0A` +
      `☕ *Paket F&B / Snack*: ${this.cateringAddon ? "Ya (Paket Snack/Kopi)" : "Pesan di Lokasi"}%0A` +
      `💵 *Estimasi Biaya*: ${encodeURIComponent(formattedPrice)}%0A` +
      `📝 *Catatan / Kebutuhan Khusus*: ${encodeURIComponent(notes)}%0A%0A` +
      `Mohon konfirmasi ketersediaan slotnya ya kak. Terima kasih! 🙏`;

    const waUrl = `https://wa.me/${BOOKING_CONFIG.whatsappNumber}?text=${message}`;
    window.open(waUrl, "_blank");
  }
}

// Global booking instance trigger
window.initBookingSystem = () => {
  window.balcosBooking = new BookingSystem();
};
