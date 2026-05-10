// Находим элементы
const openModalBtn = document.querySelector('.btn-more');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('companyModal');

if (openModalBtn && modal) {
    // Открыть
    openModalBtn.addEventListener('click', () => {
        modal.classList.add('is-open');
        document.body.classList.add('no-scroll'); // Чтобы страница не крутилась под модалкой
    });

    // Закрыть по кнопке
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
    });

    // Закрыть при клике на темный фон
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('is-open');
            document.body.classList.remove('no-scroll');
        }
    });
}