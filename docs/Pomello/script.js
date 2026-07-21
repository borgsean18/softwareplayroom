// Pomello — Privacy Policy page script
// Keeps the footer year current; the page has no other interactive behavior.
(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
