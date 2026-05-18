document.addEventListener('DOMContentLoaded', () => {
    const ticketData = JSON.parse(localStorage.getItem('selectedTicket'));
    const hotelData = JSON.parse(localStorage.getItem('selectedHotelData'));

    let ticketPrice = 0;
    let hotelPrice = 0;

    if (ticketData) {
        ticketPrice = parseInt(ticketData.price.replace(/\D/g, '')) * 40;
        const sumTicketEl = document.getElementById('sum-ticket-price');
        if (sumTicketEl) sumTicketEl.textContent = `${ticketPrice} грн`;
    }
    
    if (hotelData) {
        hotelPrice = 4500; 
        const hotelBlock = document.getElementById('summary-hotel-block');
        const sumHotelEl = document.getElementById('sum-hotel-price');
        if (hotelBlock) hotelBlock.classList.remove('hidden');
        if (sumHotelEl) sumHotelEl.textContent = `${hotelPrice} грн`;
    }

    const totalPrice = ticketPrice + hotelPrice;
    const sumTotalEl = document.getElementById('sum-total-price');
    if (sumTotalEl) sumTotalEl.textContent = `${totalPrice} грн`;

    const btnSubmit = document.querySelector('.btn-submit-booking');
    
    if (btnSubmit) {
        btnSubmit.addEventListener('click', (e) => {
            e.preventDefault();

            const holder = document.getElementById('card-holder');
            const number = document.getElementById('card-number');
            const expiry = document.getElementById('card-expiry');
            const cvv = document.getElementById('card-cvv');

            let isValid = true;

            document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
            [holder, number, expiry, cvv].forEach(el => {
                if (el) el.classList.remove('input-error');
            });

            if (holder && !holder.value.trim()) {
                const errHolder = document.getElementById('err-holder');
                if (errHolder) errHolder.textContent = 'Введіть ім\'я власника картки';
                holder.classList.add('input-error');
                isValid = false;
            }

            if (number && number.value.replace(/\s/g, '').length < 16) {
                const errNumber = document.getElementById('err-number');
                if (errNumber) errNumber.textContent = 'Невірний номер картки (має бути 16 цифр)';
                number.classList.add('input-error');
                isValid = false;
            }

            if (expiry && !expiry.value.includes('/')) {
                const errExpiry = document.getElementById('err-expiry');
                if (errExpiry) errExpiry.textContent = 'Вкажіть формат MM/YY';
                expiry.classList.add('input-error');
                isValid = false;
            }

            if (cvv && cvv.value.length < 3) {
                const errCvv = document.getElementById('err-cvv');
                if (errCvv) errCvv.textContent = 'Введіть 3-значний код безпеки';
                cvv.classList.add('input-error');
                isValid = false;
            }

            if (isValid) {
                console.log("Форма валідна! Створюємо динамічне вікно...");

                if (document.getElementById('dynamic-success-modal')) return;

                const overlay = document.createElement('div');
                overlay.id = 'dynamic-success-modal';
                overlay.style.cssText = `
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100vw !important;
                    height: 100vh !important;
                    background: rgba(15, 23, 42, 0.85) !important;
                    backdrop-filter: blur(12px) !important;
                    -webkit-backdrop-filter: blur(12px) !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    z-index: 99999999 !important;
                `;

                overlay.innerHTML = `
                    <div style="background: #ffffff !important; padding: 45px 35px !important; border-radius: 28px !important; text-align: center !important; max-width: 450px !important; width: 90% !important; box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.5) !important; box-sizing: border-box !important;">
                        <div style="font-size: 65px !important; margin-bottom: 20px !important; line-height: 1 !important;">✅</div>
                        <h2 style="font-size: 28px !important; color: #1e1b4b !important; margin: 0 0 12px 0 !important; font-weight: 700 !important; font-family: sans-serif !important;">Оплата успішно пройшла!</h2>
                        <p style="font-size: 15px !important; color: #64748b !important; line-height: 1.6 !important; margin: 0 0 30px 0 !important; font-family: sans-serif !important;">Дякуємо! Квитки та ваучери вже надіслані на вашу електронну пошту. Приємної подорожі!</p>
                        <button type="button" id="btn-dynamic-home" style="display: inline-block !important; width: 100% !important; max-width: 220px !important; padding: 14px 24px !important; background-color: #22c55e !important; color: #ffffff !important; border: none !important; border-radius: 12px !important; font-size: 16px !important; font-weight: 600 !important; cursor: pointer !important; box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3) !important;">На головну</button>
                    </div>
                `;

                document.body.appendChild(overlay);
                console.log("Динамічне вікно успішно прикріплено до body!");
                const btnHome = document.getElementById('btn-dynamic-home');
                if (btnHome) {
                    btnHome.addEventListener('click', (e) => {
                        e.preventDefault();
                        localStorage.clear(); 
                        window.location.href = './index.html';
                    });
                }
            }
        });
    }
});