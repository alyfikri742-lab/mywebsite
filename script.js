const root = document.documentElement;
const themeButtons = document.querySelectorAll("[data-theme-option]");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const form = document.querySelector("#quoteForm");
const storageKey = "rangkapro-theme";
const whatsappNumber = "6281234567890";

function readStoredTheme() {
  try {
    return localStorage.getItem(storageKey);
  } catch {
    return null;
  }
}

function writeStoredTheme(theme) {
  try {
    localStorage.setItem(storageKey, theme);
  } catch {
    return;
  }
}

function setTheme(theme) {
  root.dataset.theme = theme;
  writeStoredTheme(theme);

  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.themeOption === theme));
  });
}

setTheme(readStoredTheme() || "auto");

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(button.dataset.themeOption);
  });
});

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

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const message = [
    "Halo RangkaPro, saya ingin minta estimasi rental scaffolding.",
    "",
    `Nama: ${data.get("name")}`,
    `Lokasi: ${data.get("location")}`,
    `Kebutuhan: ${data.get("need")}`,
    `Catatan: ${data.get("message") || "-"}`,
  ].join("\n");

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
});
