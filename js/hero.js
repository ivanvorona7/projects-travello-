const openModalBtn = document.querySelector('.btn-more');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('companyModal');

// Додаємо closeModalBtn у перевірку, щоб захистити код від помилки null
if (openModalBtn && closeModalBtn && modal) {
    
    // Відкриття модалки
    openModalBtn.addEventListener('click', () => {
        modal.classList.add('is-open');
        document.body.classList.add('no-scroll'); 
    });

    // Закриття через кнопку "Х" (тепер це абсолютно безпечно)
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
    });

    // Закриття по кліку на сірий оверлей (фон) навколо модалки
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('is-open');
            document.body.classList.remove('no-scroll');
        }
    });
}