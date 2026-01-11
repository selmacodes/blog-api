const hamburger = document.querySelector(".header__hamburger");
const navList = document.querySelector(".header__nav-list");

hamburger.addEventListener("click", () => {
    const expanded = hamburger.getAttribute("aria-expanded") === "true" || false;
    hamburger.setAttribute("aria-expanded", !expanded);

    navList.classList.toggle("active");
    hamburger.classList.toggle("active");
});

hamburger.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const expanded = hamburger.getAttribute("aria-expanded") === "true" || false;
        hamburger.setAttribute("aria-expanded", !expanded);

        navList.classList.toggle("active");
        hamburger.classList.toggle("active");
    }
});