(() => {
  const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

  // Mobile nav toggle
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  function setNavOpen(isOpen) {
    if (!nav || !toggle) return;
    nav.dataset.open = String(isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) {
      // focus first link for keyboard users
      const firstLink = nav.querySelector("a");
      firstLink?.focus?.();
    } else {
      toggle.focus?.();
    }
  }

  if (toggle && nav) {
    nav.dataset.open = "false";
    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", () => {
      const open = nav.dataset.open === "true";
      setNavOpen(!open);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.dataset.open === "true") setNavOpen(false);
    });

    // Close when clicking outside (mobile)
    document.addEventListener("click", (e) => {
      if (nav.dataset.open !== "true") return;
      const t = e.target;
      if (!(t instanceof Node)) return;
      if (nav.contains(t) || toggle.contains(t)) return;
      setNavOpen(false);
    });

    // Close when selecting a link
    nav.addEventListener("click", (e) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      if (t.closest("a")) setNavOpen(false);
    });
  }

  // Scroll reveal
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const els = Array.from(document.querySelectorAll(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 }
    );
    for (const el of els) io.observe(el);
  } else {
    for (const el of document.querySelectorAll(".reveal")) el.classList.add("is-visible");
  }
})();

