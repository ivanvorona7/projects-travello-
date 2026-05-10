
document.addEventListener('DOMContentLoaded', () => {
    const burgerBtn = document.getElementById('burger');
    const navMenu = document.querySelector('.nav-list');

    if (burgerBtn && navMenu) {
        console.log("Бургер знайден та готовий до роботи!"); 

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
    } else {
        console.error("Помилка: Кнопка бургера или меню не знайдені в DOM");
    }
});