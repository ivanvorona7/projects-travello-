const openModalBtn = document.querySelector('.btn-more');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('companyModal');

if (openModalBtn && modal) {
    openModalBtn.addEventListener('click', () => {
        modal.classList.add('is-open');
        document.body.classList.add('no-scroll'); 
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('is-open');
            document.body.classList.remove('no-scroll');
        }
    });
}