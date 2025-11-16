const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
let navbarHidden = true;
hamburger.addEventListener('click', () => {
    if (navbarHidden === true) {
        nav.style.transform = "translateY(100%)";
        navbarHidden = false;
    } else {
        nav.style.transform = "";
        navbarHidden = true;
    }
})
window.addEventListener('resize', () => {
    if (window.innerWidth >= 600 && navbarHidden === false) {
        nav.style.transform = "";
        navbarHidden = true;
    }
})