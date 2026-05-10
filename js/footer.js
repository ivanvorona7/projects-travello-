document.addEventListener('DOMContentLoaded', () => {
    let modalCount = 0;

    function setupModal(btnId, modalId) {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);

        if (btn && modal) {
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
        } else {
            console.warn(`Modal setup failed: Elements with ID ${btnId} or ${modalId} not found.`);
        }
    }

    setupModal('openMobile', 'mobileModal');
    setupModal('openHelp', 'helpModal');
    setupModal('openTips', 'tipsModal');
});