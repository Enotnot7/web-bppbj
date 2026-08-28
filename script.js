// ========================================
// AKSESIBILITAS - FULL SCRIPT
// ========================================

// ===== 1. TOGGLE MENU =====
function toggleMenu(el) {
  const item = el.closest(".menu-item");
  const wasOpen = item.classList.contains("open");
  document
    .querySelectorAll(".menu-item.open")
    .forEach((i) => i.classList.remove("open"));
  if (!wasOpen) item.classList.add("open");
}

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".menu-item")) {
    document
      .querySelectorAll(".menu-item.open")
      .forEach((i) => i.classList.remove("open"));
  }
});

// ===== 2. CLOCK =====
function updateClock() {
  const now = new Date();
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MEI",
    "JUN",
    "JUL",
    "AGU",
    "SEP",
    "OKT",
    "NOV",
    "DES",
  ];
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = months[now.getMonth()];
  const yyyy = now.getFullYear();
  const hh = String(now.getHours()).padStart(2, "0");
  const mi = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");
  const el = document.getElementById("live-clock");
  if (el) el.innerText = `${dd} ${mm} ${yyyy} | ${hh}:${mi}:${ss}`;
}
updateClock();
setInterval(updateClock, 1000);

// ===== 3. HERO SLIDER =====
let slideIndex = 0;
const slides = document.querySelectorAll(".hero-slide");
const dotsWrap = document.getElementById("hero-dots");

if (dotsWrap && slides.length > 0) {
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "hero-dot" + (i === 0 ? " active" : "");
    dot.onclick = () => goToSlide(i);
    dotsWrap.appendChild(dot);
  });
}

function renderSlide() {
  slides.forEach((s, i) => s.classList.toggle("active", i === slideIndex));
  document
    .querySelectorAll(".hero-dot")
    .forEach((d, i) => d.classList.toggle("active", i === slideIndex));
}

function changeSlide(dir) {
  if (slides.length === 0) return;
  slideIndex = (slideIndex + dir + slides.length) % slides.length;
  renderSlide();
}

function goToSlide(i) {
  slideIndex = i;
  renderSlide();
}

// Auto-slide setiap 6 detik
if (slides.length > 0) {
  setInterval(() => changeSlide(1), 6000);
}

// ===== 4. AKSESIBILITAS - PANEL =====
function toggleAccessibility() {
  const overlay = document.getElementById("accessibilityOverlay");
  if (overlay) {
    overlay.classList.toggle("active");
    document.body.style.overflow = overlay.classList.contains("active")
      ? "hidden"
      : "";
  }
}

function closeAccessibility() {
  const overlay = document.getElementById("accessibilityOverlay");
  if (overlay) {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// Close with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAccessibility();
});

// Close when clicking outside panel
document.addEventListener("click", (e) => {
  const overlay = document.getElementById("accessibilityOverlay");
  if (e.target === overlay) closeAccessibility();
});

// ===== 5. AKSESIBILITAS - FUNGSI =====

// 5a. Font Size
function setFontSize(size) {
  const body = document.body;
  // Remove all font classes
  body.classList.remove(
    "font-small",
    "font-medium",
    "font-large",
    "font-xl",
    "font-xxl",
  );
  if (size !== "normal") {
    body.classList.add("font-" + size);
  }
  // Save preference
  localStorage.setItem("access-font-size", size);
  updateActiveButtons();
}

// 5b. Contrast
function toggleContrast() {
  document.body.classList.toggle("high-contrast");
  localStorage.setItem(
    "access-contrast",
    document.body.classList.contains("high-contrast") ? "on" : "off",
  );
  updateActiveButtons();
}

// 5c. Grayscale
function toggleGrayscale() {
  document.body.classList.toggle("grayscale");
  localStorage.setItem(
    "access-grayscale",
    document.body.classList.contains("grayscale") ? "on" : "off",
  );
  updateActiveButtons();
}

// 5d. Brightness
function toggleBrightness() {
  document.body.classList.toggle("bright-mode");
  localStorage.setItem(
    "access-brightness",
    document.body.classList.contains("bright-mode") ? "on" : "off",
  );
  updateActiveButtons();
}

// 5e. Highlight Links
function toggleHighlightLinks() {
  document.body.classList.toggle("highlight-links");
  localStorage.setItem(
    "access-highlight-links",
    document.body.classList.contains("highlight-links") ? "on" : "off",
  );
  updateActiveButtons();
}

// 5f. Readable Font
function toggleReadableFont() {
  document.body.classList.toggle("readable-font");
  localStorage.setItem(
    "access-readable-font",
    document.body.classList.contains("readable-font") ? "on" : "off",
  );
  updateActiveButtons();
}

// 5g. Reset All
function resetAccessibility() {
  const body = document.body;
  body.classList.remove(
    "high-contrast",
    "grayscale",
    "bright-mode",
    "highlight-links",
    "readable-font",
    "font-small",
    "font-medium",
    "font-large",
    "font-xl",
    "font-xxl",
  );
  localStorage.removeItem("access-contrast");
  localStorage.removeItem("access-grayscale");
  localStorage.removeItem("access-brightness");
  localStorage.removeItem("access-highlight-links");
  localStorage.removeItem("access-readable-font");
  localStorage.removeItem("access-font-size");
  updateActiveButtons();

  // Show feedback
  const resetBtn = document.querySelector(".access-reset");
  if (resetBtn) {
    const originalText = resetBtn.textContent;
    resetBtn.textContent = "✅ Reset Berhasil!";
    resetBtn.style.background = "#22c55e";
    setTimeout(() => {
      resetBtn.textContent = originalText;
      resetBtn.style.background = "";
    }, 2000);
  }
}

// ===== 6. UPDATE ACTIVE BUTTONS =====
function updateActiveButtons() {
  const body = document.body;
  const btns = document.querySelectorAll(".access-btn");

  btns.forEach((btn) => {
    btn.classList.remove("active");
    const action = btn.dataset.action;

    if (action === "contrast" && body.classList.contains("high-contrast")) {
      btn.classList.add("active");
    }
    if (action === "grayscale" && body.classList.contains("grayscale")) {
      btn.classList.add("active");
    }
    if (action === "brightness" && body.classList.contains("bright-mode")) {
      btn.classList.add("active");
    }
    if (
      action === "highlight-links" &&
      body.classList.contains("highlight-links")
    ) {
      btn.classList.add("active");
    }
    if (
      action === "readable-font" &&
      body.classList.contains("readable-font")
    ) {
      btn.classList.add("active");
    }
    if (action === "font-small" && body.classList.contains("font-small")) {
      btn.classList.add("active");
    }
    if (action === "font-medium" && body.classList.contains("font-medium")) {
      btn.classList.add("active");
    }
    if (action === "font-large" && body.classList.contains("font-large")) {
      btn.classList.add("active");
    }
    if (action === "font-xl" && body.classList.contains("font-xl")) {
      btn.classList.add("active");
    }
    if (action === "font-xxl" && body.classList.contains("font-xxl")) {
      btn.classList.add("active");
    }
  });
}

// ===== 7. LOAD SAVED PREFERENCES =====
function loadAccessibilityPreferences() {
  const body = document.body;

  // Load contrast
  if (localStorage.getItem("access-contrast") === "on") {
    body.classList.add("high-contrast");
  }

  // Load grayscale
  if (localStorage.getItem("access-grayscale") === "on") {
    body.classList.add("grayscale");
  }

  // Load brightness
  if (localStorage.getItem("access-brightness") === "on") {
    body.classList.add("bright-mode");
  }

  // Load highlight links
  if (localStorage.getItem("access-highlight-links") === "on") {
    body.classList.add("highlight-links");
  }

  // Load readable font
  if (localStorage.getItem("access-readable-font") === "on") {
    body.classList.add("readable-font");
  }

  // Load font size
  const fontSize = localStorage.getItem("access-font-size");
  if (fontSize && fontSize !== "normal") {
    body.classList.add("font-" + fontSize);
  }

  updateActiveButtons();
}

// ===== 8. VOICE (Text-to-Speech) =====
let speechSynth = window.speechSynthesis;
let isSpeaking = false;
let currentUtterance = null;

function toggleVoice() {
  const btn = document.querySelector('[data-action="voice"]');

  // If currently speaking, stop
  if (isSpeaking) {
    speechSynth.cancel();
    isSpeaking = false;
    if (btn) btn.classList.remove("active");
    return;
  }

  // Get all text content from main area
  const mainContent =
    document.querySelector("main") ||
    document.querySelector(".container") ||
    document.body;
  const textNodes = mainContent.querySelectorAll(
    "h1, h2, h3, h4, p, li, .news-title, .annc-title, .hero-title, .hero-sub",
  );
  let fullText = "";

  textNodes.forEach((el) => {
    const text = el.textContent.trim();
    if (text.length > 0) fullText += text + ". ";
  });

  if (fullText.length === 0) {
    fullText = document.body.textContent.trim();
  }

  // Clean up text
  fullText = fullText.replace(/\s+/g, " ").trim();

  if (fullText.length === 0) {
    alert("Tidak ada teks untuk dibacakan.");
    return;
  }

  // Create utterance
  const utterance = new SpeechSynthesisUtterance(fullText);
  utterance.lang = "id-ID";
  utterance.rate = 0.9;
  utterance.pitch = 1;
  utterance.volume = 1;

  utterance.onstart = () => {
    isSpeaking = true;
    if (btn) btn.classList.add("active");
  };

  utterance.onend = () => {
    isSpeaking = false;
    if (btn) btn.classList.remove("active");
  };

  utterance.onerror = () => {
    isSpeaking = false;
    if (btn) btn.classList.remove("active");
    alert("Maaf, fitur suara tidak didukung di browser ini.");
  };

  currentUtterance = utterance;
  speechSynth.speak(utterance);
}

// ===== 9. INIT =====
document.addEventListener("DOMContentLoaded", function () {
  // Load saved preferences
  loadAccessibilityPreferences();

  // Update active buttons after DOM is ready
  setTimeout(updateActiveButtons, 100);
});

// ===== 10. KEYBOARD SHORTCUTS =====
document.addEventListener("keydown", (e) => {
  // Ctrl + Shift + A = Open Accessibility
  if (e.ctrlKey && e.shiftKey && (e.key === "a" || e.key === "A")) {
    e.preventDefault();
    toggleAccessibility();
  }
});
