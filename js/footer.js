document.addEventListener('DOMContentLoaded', () => {
    function setupModal(btnId, modalId) {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);
        const closeBtn = modal.querySelector('[data-close]');

        if (btn && modal) {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('is-open');
                document.body.classList.add('no-scroll');
            });

            closeBtn.addEventListener('click', () => {
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
    }

    setupModal('openMobile', 'mobileModal');
    setupModal('openHelp', 'helpModal');
    setupModal('openTips', 'tipsModal');
});