document.addEventListener('DOMContentLoaded', () => {
    function setupModal(btnId, modalId) {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);

        if (btn && modal) {
            const closeBtn = modal.querySelector('[data-close]');

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('is-open');
                document.body.classList.add('no-scroll');
            });

            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    modal.classList.remove('is-open');
                    document.body.classList.remove('no-scroll');
                });
            }

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('is-open');
                    document.body.classList.remove('no-scroll');
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