// Progressive touch only: shadow under the fixed header once the page
// scrolls. The site is fully usable without this script.
(function () {
  var header = document.querySelector(".site-header");
  if (!header) return;
  var update = function () {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
})();
