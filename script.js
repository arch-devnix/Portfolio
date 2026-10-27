// script.js

(function () {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");

  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") root.dataset.theme = saved;
  } catch (e) {
  }

  function currentTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  if (toggle) {
    toggle.addEventListener("click", function () {
      const next = currentTheme() === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch (e) {}
    });
  }

  // Keep the footer year current
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();

(function () {
  document.querySelectorAll(".shot").forEach(function (shot) {
    const img = shot.querySelector("img");
    if (!img) return;

    function markEmpty() {
      img.remove();
      shot.classList.add("is-empty");
    }

    img.addEventListener("error", markEmpty);
    if (img.complete && img.naturalWidth === 0) markEmpty();
  });
})();

(function () {
  const hero = document.querySelector(".hero");
  const typed = document.getElementById("typed");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!hero || !typed || reduce) return;

  const text = typed.textContent;
  typed.textContent = "";
  typed.classList.add("typing");
  hero.classList.add("is-typing");

  let i = 0;
  function next() {
    i++;
    typed.textContent = text.slice(0, i);
    if (i < text.length) {
      setTimeout(next, 90);
    } else {
      setTimeout(function () {
        typed.classList.remove("typing");
        hero.classList.remove("is-typing");
      }, 350);
    }
  }
  setTimeout(next, 500);
})();