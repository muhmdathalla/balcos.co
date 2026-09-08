/**
 * Balcos.co - Main Application Controller
 * High-performance, multi-theme, interactive coffee shop & compound experience
 */

class BalcosApp {
  constructor() {
    this.currentTheme = localStorage.getItem("balcos-theme") || "terracotta";
    this.cart = JSON.parse(localStorage.getItem("balcos-cart") || "[]");
    this.activeCategory = "all";
    this.searchQuery = "";
    this.audioSynth = null;
    this.isPlayingAmbient = false;
    this.activeStoryIndex = 0;
    this.storyTimer = null;

    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.initThemeSwitchers();
    this.initLiveStatusAndCrowd();
    this.renderStoriesBar();
    this.renderMenu();
    this.initMenuFilters();
    this.initCart();
    this.renderReviews();
    this.initAmbientSound();
    this.initScrollObservers();
    this.initStoryModal();
    this.initFaqAccordion();

    if (window.initBookingSystem) {
      window.initBookingSystem();
    }
  }

  // --- THEME ENGINE ---
  applyTheme(themeName) {
    document.documentElement.setAttribute("data-theme", themeName);
    localStorage.setItem("balcos-theme", themeName);
    this.currentTheme = themeName;

    document.querySelectorAll(".theme-toggle-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.theme === themeName);
    });

    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (metaThemeColor) {
      const colors = {
        terracotta: "#D85A32",
        midnight: "#121417",
        matcha: "#2E5339",
        neon: "#0B0C10"
      };
      metaThemeColor.setAttribute("content", colors[themeName] || "#D85A32");
    }
  }

  initThemeSwitchers() {
    const themeButtons = document.querySelectorAll(".theme-toggle-btn");
    themeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        this.applyTheme(btn.dataset.theme);
      });
    });

    // Theme select dropdown in mobile menu if exists
    const themeSelect = document.getElementById("mobile-theme-select");
    if (themeSelect) {
      themeSelect.value = this.currentTheme;
      themeSelect.addEventListener("change", (e) => {
        this.applyTheme(e.target.value);
      });
    }
  }

  // --- LIVE STATUS & CROWD LEVEL ---
  initLiveStatusAndCrowd() {
    const updatePulse = () => {
      const now = new Date();
      // Yogyakarta is UTC+7
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const wibDate = new Date(utc + (3600000 * 7));
      const hours = wibDate.getHours();
      const minutes = String(wibDate.getMinutes()).padStart(2, "0");

      const timeEl = document.getElementById("live-time-display");
      if (timeEl) {
        timeEl.textContent = `${String(hours).padStart(2, "0")}:${minutes} WIB`;
      }

      // Crowd curve based on Google Maps data for Balcos Compound
      let crowdText = "Suasana Tenang & Cozy (Ideal nugas/deep focus)";
      let crowdBadge = "35% Kapasitas";
      let crowdClass = "low";

      if (hours >= 15 && hours <= 18) {
        crowdText = "Sore Santai & Diskusi Komunitas (Tempat favorit)";
        crowdBadge = "68% Kapasitas";
        crowdClass = "medium";
      } else if (hours >= 19 && hours <= 23) {
        crowdText = "Jam Ramai & Vibrant (Music & hangout vibe)";
        crowdBadge = "88% Kapasitas";
        crowdClass = "high";
      } else if (hours >= 0 && hours <= 4) {
        crowdText = "Midnight Owl & Deadline Fighters (Tenang & ber-AC)";
        crowdBadge = "45% Kapasitas";
        crowdClass = "low";
      } else if (hours >= 5 && hours <= 11) {
        crowdText = "Pagi Segar & Sarapan Buryam Sebelas (Fresh coffee)";
        crowdBadge = "40% Kapasitas";
        crowdClass = "low";
      }

      const crowdEl = document.getElementById("live-crowd-status");
      const crowdMeter = document.getElementById("live-crowd-meter");
      if (crowdEl) {
        crowdEl.innerHTML = `<span class="pulse-dot"></span> <strong>Buka 24 Jam:</strong> ${crowdText} <span class="crowd-tag ${crowdClass}">${crowdBadge}</span>`;
      }
      if (crowdMeter) {
        const meterFill = document.getElementById("crowd-meter-fill");
        if (meterFill) {
          meterFill.style.width = crowdBadge.replace(" Kapasitas", "");
        }
      }
    };

    updatePulse();
    setInterval(updatePulse, 30000);
  }

  // --- INSTAGRAM STORIES / HIGHLIGHTS BAR ---
  renderStoriesBar() {
    const container = document.getElementById("stories-track");
    if (!container || !BALCOS_STORIES) return;

    container.innerHTML = BALCOS_STORIES.map((story, idx) => `
      <div class="story-bubble-item" data-index="${idx}">
        <div class="story-avatar-ring">
          <img src="${story.cover}" alt="${story.title}" loading="lazy" class="story-avatar-img">
          <div class="story-icon-badge"><i class="bi ${story.icon}"></i></div>
        </div>
        <span class="story-title-text">${story.title}</span>
      </div>
    `).join("");

    container.querySelectorAll(".story-bubble-item").forEach(item => {
      item.addEventListener("click", () => {
        const idx = parseInt(item.dataset.index);
        this.openStory(idx);
      });
    });
  }

  initStoryModal() {
    const modal = document.getElementById("story-modal");
    const closeBtn = document.getElementById("close-story-modal");
    const prevBtn = document.getElementById("story-prev-btn");
    const nextBtn = document.getElementById("story-next-btn");

    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => this.closeStory());
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.prevStory());
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.nextStory());
    }

    // Close on backdrop click
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) this.closeStory();
      });
    }

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!modal || !modal.classList.contains("active")) return;
      if (e.key === "Escape") this.closeStory();
      if (e.key === "ArrowLeft") this.prevStory();
      if (e.key === "ArrowRight") this.nextStory();
    });
  }

  openStory(index) {
    const modal = document.getElementById("story-modal");
    if (!modal) return;
    this.activeStoryIndex = index;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    this.renderCurrentStory();
  }

  closeStory() {
    const modal = document.getElementById("story-modal");
    if (modal) modal.classList.remove("active");
    document.body.style.overflow = "";
    if (this.storyTimer) clearInterval(this.storyTimer);
  }

  renderCurrentStory() {
    const story = BALCOS_STORIES[this.activeStoryIndex];
    if (!story) return;

    const modal = document.getElementById("story-modal");
    const coverImg = document.getElementById("story-modal-img");
    const title = document.getElementById("story-modal-title");
    const headline = document.getElementById("story-modal-headline");
    const text = document.getElementById("story-modal-text");
    const tagsContainer = document.getElementById("story-modal-tags");
    const progressBar = document.getElementById("story-progress-bar");

    if (coverImg) coverImg.src = story.cover;
    if (title) title.innerHTML = `<i class="bi ${story.icon}"></i> ${story.title}`;
    if (headline) headline.textContent = story.headline;
    if (text) text.textContent = story.content;
    if (tagsContainer) {
      tagsContainer.innerHTML = story.tags.map(t => `<span class="badge bg-secondary">${t}</span>`).join(" ");
    }

    // Reset and animate progress bar
    if (progressBar) {
      progressBar.style.width = "0%";
      if (this.storyTimer) clearInterval(this.storyTimer);
      let progress = 0;
      this.storyTimer = setInterval(() => {
        progress += 2;
        progressBar.style.width = `${progress}%`;
        if (progress >= 100) {
          clearInterval(this.storyTimer);
          this.nextStory();
        }
      }, 100);
    }
  }

  nextStory() {
    if (this.activeStoryIndex < BALCOS_STORIES.length - 1) {
      this.activeStoryIndex++;
      this.renderCurrentStory();
    } else {
      this.closeStory();
    }
  }

  prevStory() {
    if (this.activeStoryIndex > 0) {
      this.activeStoryIndex--;
      this.renderCurrentStory();
    }
  }

  // --- MENU DISPLAY & FILTERING ---
  renderMenu() {
    const grid = document.getElementById("menu-items-grid");
    if (!grid || !BALCOS_MENU) return;

    let items = BALCOS_MENU;

    if (this.activeCategory !== "all") {
      items = items.filter(item => item.category === this.activeCategory);
    }

    if (this.searchQuery.trim() !== "") {
      const q = this.searchQuery.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.tag && item.tag.toLowerCase().includes(q))
      );
    }

    if (items.length === 0) {
      grid.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="empty-state-icon"><i class="bi bi-cup-hot display-4 text-muted"></i></div>
          <h4 class="mt-3">Menu tidak ditemukan</h4>
          <p class="text-muted">Coba kata kunci lain atau pilih kategori lain di atas.</p>
          <button class="btn btn-outline-primary mt-2" onclick="window.balcosApp.resetMenuFilters()">Reset Filter</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = items.map(item => {
      const cartItem = this.cart.find(c => c.id === item.id);
      const qtyInCart = cartItem ? cartItem.quantity : 0;

      return `
        <div class="col-md-6 col-lg-4 mb-4" data-category="${item.category}">
          <div class="card menu-card h-100 shadow-sm border-0">
            <div class="menu-card-img-wrapper position-relative">
              <img src="${item.image}" alt="${item.name}" loading="lazy" class="card-img-top menu-img">
              ${item.badge ? `<span class="badge menu-badge-floating">${item.badge}</span>` : ""}
              <span class="badge menu-tag-floating">${item.tag}</span>
            </div>
            <div class="card-body d-flex flex-column justify-content-between p-3">
              <div>
                <div class="d-flex justify-content-between align-items-start mb-1">
                  <h5 class="card-title menu-item-title mb-0">${item.name}</h5>
                </div>
                <div class="menu-rating-row mb-2">
                  <span class="star-rating"><i class="bi bi-star-fill text-warning"></i> ${item.rating}</span>
                  <span class="text-muted review-count">(${item.reviews} reviews)</span>
                </div>
                <p class="card-text text-muted menu-desc">${item.description}</p>
                <div class="dietary-tags-row mb-3">
                  ${item.dietary.map(d => `<span class="dietary-pill">${d}</span>`).join("")}
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center pt-2 border-top">
                <div class="menu-price-text">Rp ${item.price.toLocaleString("id-ID")}</div>
                <div class="menu-card-actions">
                  ${qtyInCart > 0 ? `
                    <div class="qty-control-group d-flex align-items-center">
                      <button class="btn btn-sm btn-outline-secondary qty-btn" onclick="window.balcosApp.updateCartQty('${item.id}', -1)">-</button>
                      <span class="qty-value px-2 fw-bold">${qtyInCart}</span>
                      <button class="btn btn-sm btn-primary qty-btn" onclick="window.balcosApp.updateCartQty('${item.id}', 1)">+</button>
                    </div>
                  ` : `
                    <button class="btn btn-sm btn-primary add-cart-btn px-3" onclick="window.balcosApp.addToCart('${item.id}')">
                      <i class="bi bi-plus-lg me-1"></i> Pesan
                    </button>
                  `}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  initMenuFilters() {
    const filterPills = document.querySelectorAll(".menu-filter-btn");
    filterPills.forEach(btn => {
      btn.addEventListener("click", () => {
        filterPills.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        this.activeCategory = btn.dataset.category;
        this.renderMenu();
      });
    });

    const searchInput = document.getElementById("menu-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value;
        this.renderMenu();
      });
    }
  }

  resetMenuFilters() {
    this.activeCategory = "all";
    this.searchQuery = "";
    const searchInput = document.getElementById("menu-search-input");
    if (searchInput) searchInput.value = "";
    document.querySelectorAll(".menu-filter-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.category === "all");
    });
    this.renderMenu();
  }

  // --- CART & ORDERING SYSTEM ---
  addToCart(itemId) {
    const item = BALCOS_MENU.find(i => i.id === itemId);
    if (!item) return;

    const existing = this.cart.find(c => c.id === itemId);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1
      });
    }

    this.saveCart();
    this.renderMenu();
    this.updateCartUI();
    this.showToast(`Berhasil menambah "${item.name}" ke pesanan!`);
  }

  updateCartQty(itemId, delta) {
    const index = this.cart.findIndex(c => c.id === itemId);
    if (index === -1) return;

    this.cart[index].quantity += delta;
    if (this.cart[index].quantity <= 0) {
      this.cart.splice(index, 1);
    }

    this.saveCart();
    this.renderMenu();
    this.updateCartUI();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    this.renderMenu();
    this.updateCartUI();
  }

  saveCart() {
    localStorage.setItem("balcos-cart", JSON.stringify(this.cart));
  }

  initCart() {
    const cartToggleBtns = document.querySelectorAll(".cart-drawer-toggle");
    const cartDrawer = document.getElementById("cart-drawer");
    const cartOverlay = document.getElementById("cart-drawer-overlay");
    const closeCartBtn = document.getElementById("close-cart-btn");
    const clearCartBtn = document.getElementById("clear-cart-btn");
    const checkoutWaBtn = document.getElementById("checkout-wa-btn");

    const toggleDrawer = () => {
      if (cartDrawer) cartDrawer.classList.toggle("open");
      if (cartOverlay) cartOverlay.classList.toggle("open");
      document.body.style.overflow = cartDrawer?.classList.contains("open") ? "hidden" : "";
    };

    cartToggleBtns.forEach(b => b.addEventListener("click", toggleDrawer));
    if (closeCartBtn) closeCartBtn.addEventListener("click", toggleDrawer);
    if (cartOverlay) cartOverlay.addEventListener("click", toggleDrawer);
    if (clearCartBtn) clearCartBtn.addEventListener("click", () => this.clearCart());
    if (checkoutWaBtn) checkoutWaBtn.addEventListener("click", () => this.dispatchWhatsAppOrder());

    this.updateCartUI();
  }

  updateCartUI() {
    const badgeElements = document.querySelectorAll(".cart-count-badge");
    const totalQty = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    badgeElements.forEach(badge => {
      badge.textContent = totalQty;
      badge.style.display = totalQty > 0 ? "inline-flex" : "none";
    });

    const floatingBar = document.getElementById("mobile-cart-floating-bar");
    if (floatingBar) {
      floatingBar.classList.toggle("visible", totalQty > 0);
      const floatQty = document.getElementById("float-cart-qty");
      const floatTotal = document.getElementById("float-cart-total");
      if (floatQty) floatQty.textContent = `${totalQty} Item`;
      if (floatTotal) floatTotal.textContent = `Rp ${subtotal.toLocaleString("id-ID")}`;
    }

    const cartList = document.getElementById("cart-items-list");
    const subtotalEl = document.getElementById("cart-subtotal-price");
    const emptyState = document.getElementById("cart-empty-state");
    const cartContent = document.getElementById("cart-content-wrapper");

    if (subtotalEl) {
      subtotalEl.textContent = `Rp ${subtotal.toLocaleString("id-ID")}`;
    }

    if (emptyState && cartContent) {
      if (this.cart.length === 0) {
        emptyState.style.display = "block";
        cartContent.style.display = "none";
      } else {
        emptyState.style.display = "none";
        cartContent.style.display = "block";
      }
    }

    if (cartList && this.cart.length > 0) {
      cartList.innerHTML = this.cart.map(item => `
        <div class="cart-item-row d-flex align-items-center justify-content-between py-2 border-bottom">
          <div class="d-flex align-items-center gap-2">
            <img src="${item.image}" alt="${item.name}" class="cart-item-thumb rounded">
            <div>
              <h6 class="cart-item-name mb-0">${item.name}</h6>
              <span class="cart-item-price text-muted">Rp ${item.price.toLocaleString("id-ID")}</span>
            </div>
          </div>
          <div class="qty-control-group d-flex align-items-center">
            <button class="btn btn-sm btn-outline-secondary qty-btn" onclick="window.balcosApp.updateCartQty('${item.id}', -1)">-</button>
            <span class="qty-value px-2 fw-bold">${item.quantity}</span>
            <button class="btn btn-sm btn-primary qty-btn" onclick="window.balcosApp.updateCartQty('${item.id}', 1)">+</button>
          </div>
        </div>
      `).join("");
    }
  }

  dispatchWhatsAppOrder() {
    if (this.cart.length === 0) return;

    const orderType = document.querySelector("input[name='order-type']:checked")?.value || "Dine-in";
    const tableNumber = document.getElementById("cart-table-number")?.value.trim() || "-";
    const customerName = document.getElementById("cart-customer-name")?.value.trim() || "Pelanggan Balcos";
    const customerNotes = document.getElementById("cart-order-notes")?.value.trim() || "Tidak ada";

    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    let itemsListText = "";
    this.cart.forEach((item, i) => {
      itemsListText += `${i + 1}. *${item.name}* (x${item.quantity}) - Rp ${(item.price * item.quantity).toLocaleString("id-ID")}%0A`;
    });

    const message = `Halo Barista Balcos.co / Sebelas Coffee! ☕🛵%0A%0ASaya ingin melakukan pemesanan via *Website Balcos*:%0A%0A` +
      `👤 *Nama*: ${encodeURIComponent(customerName)}%0A` +
      `📍 *Tipe Pesanan*: ${encodeURIComponent(orderType)} (Meja / Lokasi: ${encodeURIComponent(tableNumber)})%0A%0A` +
      `📋 *Daftar Pesanan*:%0A` +
      itemsListText +
      `%0A💵 *Total Pembayaran*: *Rp ${subtotal.toLocaleString("id-ID")}*%0A` +
      `📝 *Catatan Khusus*: ${encodeURIComponent(customerNotes)}%0A%0A` +
      `Mohon segera diproses ya kak. Terima kasih! ✨`;

    const waUrl = `https://wa.me/6285117439369?text=${message}`;
    window.open(waUrl, "_blank");
  }

  // --- REVIEWS RENDERING ---
  renderReviews() {
    const container = document.getElementById("reviews-grid");
    if (!container || !BALCOS_REVIEWS) return;

    container.innerHTML = BALCOS_REVIEWS.map(r => `
      <div class="col-md-6 col-lg-3 mb-4">
        <div class="card review-card h-100 shadow-sm border-0 p-3">
          <div class="d-flex align-items-center justify-content-between mb-2">
            <div class="d-flex align-items-center gap-2">
              <div class="review-avatar"><i class="bi bi-person-circle"></i></div>
              <div>
                <h6 class="mb-0 review-author">${r.author}</h6>
                <small class="text-muted review-badge">${r.badge}</small>
              </div>
            </div>
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" width="18" height="18">
          </div>
          <div class="star-rating mb-2">
            ${Array(r.rating).fill('<i class="bi bi-star-fill text-warning"></i>').join("")}
            <span class="ms-2 text-muted small">${r.date}</span>
          </div>
          <p class="review-comment text-secondary">${r.comment}</p>
          ${r.ownerReply ? `
            <div class="owner-reply p-2 mt-auto rounded">
              <small class="fw-bold d-block text-primary"><i class="bi bi-arrow-return-right"></i> Respon Balcos:</small>
              <small class="text-muted">${r.ownerReply}</small>
            </div>
          ` : ""}
        </div>
      </div>
    `).join("");
  }

  // --- AMBIENT SOUND LOFI GENERATOR (Web Audio API) ---
  initAmbientSound() {
    const soundToggle = document.getElementById("ambient-sound-toggle");
    if (!soundToggle) return;

    soundToggle.addEventListener("click", () => {
      if (this.isPlayingAmbient) {
        this.stopAmbientSound();
        soundToggle.classList.remove("active");
        soundToggle.innerHTML = `<i class="bi bi-volume-mute"></i> <span>Play Café Lofi</span>`;
      } else {
        this.startAmbientSound();
        soundToggle.classList.add("active");
        soundToggle.innerHTML = `<i class="bi bi-volume-up-fill pulse-icon"></i> <span>Playing Chill Vibe</span>`;
      }
    });
  }

  startAmbientSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.audioCtx = new AudioContext();

      // Create warm vinyl cafe noise buffer
      const bufferSize = this.audioCtx.sampleRate * 2;
      const noiseBuffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.03;
      }

      this.whiteNoise = this.audioCtx.createBufferSource();
      this.whiteNoise.buffer = noiseBuffer;
      this.whiteNoise.loop = true;

      // Filter for warm lofi coffee shop crackle/rain texture
      const filter = this.audioCtx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 850;
      filter.Q.value = 0.8;

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.35, this.audioCtx.currentTime);

      this.whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.audioCtx.destination);

      this.whiteNoise.start();
      this.isPlayingAmbient = true;
    } catch (e) {
      console.warn("Audio Context init blocked until interaction:", e);
    }
  }

  stopAmbientSound() {
    if (this.whiteNoise) {
      try { this.whiteNoise.stop(); } catch(e) {}
    }
    if (this.audioCtx) {
      try { this.audioCtx.close(); } catch(e) {}
    }
    this.isPlayingAmbient = false;
  }

  // --- FAQ ACCORDION ---
  initFaqAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
      const question = item.querySelector(".faq-question");
      if (question) {
        question.addEventListener("click", () => {
          const isOpen = item.classList.contains("open");
          faqItems.forEach(i => i.classList.remove("open"));
          if (!isOpen) item.classList.add("open");
        });
      }
    });
  }

  // --- SCROLL OBSERVERS & SMOOTH NAVIGATION ---
  initScrollObservers() {
    const navbar = document.querySelector(".balcos-navbar");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 40) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }
    }, { passive: true });

    // Smooth scroll for nav anchor links
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
      anchor.addEventListener("click", function(e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#" || targetId.length <= 1) return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  showToast(message) {
    const toast = document.getElementById("balcos-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2800);
  }
}

// Bootstrap Balcos App
document.addEventListener("DOMContentLoaded", () => {
  window.balcosApp = new BalcosApp();
});
