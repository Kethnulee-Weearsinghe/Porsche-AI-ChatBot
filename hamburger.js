document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const sideMenu = document.getElementById("side-menu");
  const closeBtn = document.getElementById("close-menu");

  hamburger.addEventListener("click", () => {
    sideMenu.classList.add("open");
  });

  closeBtn.addEventListener("click", () => {
    sideMenu.classList.remove("open");
  });
});

