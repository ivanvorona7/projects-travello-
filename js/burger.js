
document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.getElementById('burger');
    const navMenu = document.querySelector('.nav-list');

    if (!burgerBtn || !navMenu) {
        return; 
    }

    burgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        burgerBtn.classList.toggle('is-open');
    });

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            burgerBtn.classList.remove('is-open');
        });
    });
});