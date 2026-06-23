// Minimalist, Lightweight & Fast JS
const root = document.documentElement;
const themeButtons = document.querySelectorAll("[data-theme-option]");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const form = document.querySelector("#quoteForm");

// Konfigurasi WhatsApp Wali Jaya
const whatsappNumber = "6281234567890"; // Sesuaikan dengan nomor aslinya
const storageKey = "walijaya-theme";

// Tema Management
function getSystemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function readStoredTheme() {
  try { return localStorage.getItem(storageKey); } 
  catch { return null; }
}

function writeStoredTheme(theme) {
  try { localStorage.setItem(storageKey, theme); } 
  catch { return; }
}

function setTheme(theme) {
  root.dataset.theme = theme;
  writeStoredTheme(theme);

  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeOption === theme));
  });
}

// Inisialisasi Tema (Otomatis menyesuaikan preferensi perangkat jika belum ada cookie)
setTheme(readStoredTheme() || "auto");

// Listener untuk Tombol Tema
themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(button.dataset.themeOption);
  });
});

// Listener perubahan sistem secara real-time (Untuk opsi Auto)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (root.dataset.theme === 'auto') {
    // Memaksa browser merender ulang transisi secara halus saat OS berubah tema
    setTheme('auto');
  }
});

// Mobile Menu Toggle
function closeMenu() {
  document.body.classList.remove("nav-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Form Submission ke WhatsApp
form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const message = [
    "Halo *Wali Jaya Scaffolding*, saya berminat untuk menyewa/membeli scaffolding.",
    "",
    `👤 *Nama:* ${data.get("name")}`,
    `📍 *Lokasi:* ${data.get("location")}`,
    `📦 *Kebutuhan:* ${data.get("need")}`
  ].join("\n");

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});