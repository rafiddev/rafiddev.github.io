// ====================================================
// Jordan Vale — Portfolio
// Small, dependency-free interactions.
// ====================================================

document.addEventListener("DOMContentLoaded", () => {
  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close menu after a link is tapped (mobile)
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Footer year ---- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Scroll reveal ---- */
  const revealTargets = document.querySelectorAll(
    ".about__grid, .experience__card, .skills__grid, .projects__grid, .cards--ticket, .cards--badge, .contact__grid"
  );

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    revealTargets.forEach((el) => el.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach((el) => observer.observe(el));
  }

  /* ---- Active nav link on scroll ---- */
  const sections = document.querySelectorAll("main section[id], header[id]");
  const navLinks = document.querySelectorAll(".nav__menu a");

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          const link = document.querySelector(`.nav__menu a[href="#${id}"]`);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.style.color = "");
            link.style.color = "var(--amber)";
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((s) => navObserver.observe(s));
  }
});
