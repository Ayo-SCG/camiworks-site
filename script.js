// Progressive touches only. The site is fully usable without this
// script: the mobile menu is checkbox-driven in plain CSS.
(function () {
  var header = document.querySelector(".site-header");
  if (header) {
    var update = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  var navBox = document.getElementById("nav-open");
  if (navBox) {
    // Close the mobile menu after a navigation link is chosen.
    document.querySelectorAll(".site-nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        navBox.checked = false;
      });
    });
    // Close the mobile menu on Escape and return focus to the toggle.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navBox.checked) {
        navBox.checked = false;
        navBox.focus();
      }
    });
  }
})();
