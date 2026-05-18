document.addEventListener('DOMContentLoaded', () => {
    let modalCount = 0;

    function setupModal(btnId, modalId) {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);

        // Якщо хоча б одного елемента немає (наприклад, на сторінці оплати),
        // скрипт просто тихо і безглуздо виходить з функції, нічого не ламаючи
        if (!btn || !modal) {
            return; 
        }

        const closeBtn = modal.querySelector('[data-close]');

        btn.addEventListener('click', (e) => {
            e.preventDefault();

            modal.classList.add('is-open');
            modalCount++;
            if (modalCount === 1) {
                document.body.classList.add('no-scroll');
            }
        });

        const closeModal = () => {
            modal.classList.remove('is-open');
            modalCount--;
            if (modalCount === 0) {
                document.body.classList.remove('no-scroll');
            }
        };

        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Спокійно викликаємо на всіх сторінках
    setupModal('openMobile', 'mobileModal');
    setupModal('openHelp', 'helpModal');
    setupModal('openTips', 'tipsModal');
});