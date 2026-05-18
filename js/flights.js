document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('flight-search-form');
    const resultsContainer = document.getElementById('flights-results-container');
    const flightsListOutput = document.getElementById('flights-list-output');

    const mockFlights = [
        { id: 1, company: "Ryanair", timeOut: "06:15", timeIn: "08:30", type: "Прямий", price: "€45" },
        { id: 2, company: "Wizz Air", timeOut: "11:00", timeIn: "13:20", type: "Прямий", price: "€60" },
        { id: 3, company: "Lufthansa", timeOut: "16:40", timeIn: "20:15", type: "1 пересадка", price: "€120" }
    ];

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fromInput = document.getElementById('from-city');
            const toInput = document.getElementById('to-city');
            const dateInput = document.getElementById('flight-date');

            const errorFrom = document.getElementById('error-from');
            const errorTo = document.getElementById('error-to');
            const errorDate = document.getElementById('error-date');

            let isValid = true;
            if (fromInput && toInput && dateInput) {
                [fromInput, toInput, dateInput].forEach(input => input.classList.remove('input-error'));
            }
            [errorFrom, errorTo, errorDate].forEach(err => {
                if (err) err.textContent = '';
            });

            if (fromInput && !fromInput.value.trim()) {
                if (errorFrom) errorFrom.textContent = 'Будь ласка, вкажіть місто вильоту';
                fromInput.classList.add('input-error');
                isValid = false;
            }

            if (toInput && !toInput.value.trim()) {
                if (errorTo) errorTo.textContent = 'Будь ласка, вкажіть місто призначення';
                toInput.classList.add('input-error');
                isValid = false;
            }

            if (dateInput && !dateInput.value) {
                if (errorDate) errorDate.textContent = 'Виберіть дату вильоту';
                dateInput.classList.add('input-error');
                isValid = false;
            }

            if (isValid && fromInput && toInput) {
                renderFlights(fromInput.value, toInput.value);
            } else {
                if (resultsContainer) resultsContainer.classList.add('hidden');
            }
        });
    }

    function renderFlights(from, to) {
        if (!flightsListOutput) return;
        flightsListOutput.innerHTML = '';

        mockFlights.forEach(flight => {
            const flightRow = document.createElement('div');
            flightRow.className = 'flight-result-row';
            flightRow.innerHTML = `
                <div class="flight-company">
                    <span class="company-icon">✈️</span>
                    <div>
                        <strong>${flight.company}</strong>
                        <p>${from} → ${to}</p>
                    </div>
                </div>
                <div class="flight-time">
                    <strong>${flight.timeOut} — ${flight.timeIn}</strong>
                    <p>${flight.type}</p>
                </div>
                <div class="flight-price-block">
                    <span class="flight-price">${flight.price}</span>
                    <button class="btn-select-ticket" data-id="${flight.id}" data-company="${flight.company}" data-price="${flight.price}" data-time="${flight.timeOut}">Вибрати</button>
                </div>
            `;
            flightsListOutput.appendChild(flightRow);
        });

        if (resultsContainer) resultsContainer.classList.remove('hidden');
    }

    // ДИНАМІЧНИЙ ВИКЛИК МОДАЛКИ ПРОПОЗИЦІЇ ГОТЕЛЮ БЕЗ КОНФЛІКТІВ З CSS
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('btn-select-ticket')) {
            e.preventDefault();
            const button = e.target;

            document.querySelectorAll('.flight-result-row').forEach(row => row.classList.remove('selected-flight'));
            const parentRow = button.closest('.flight-result-row');
            if (parentRow) parentRow.classList.add('selected-flight');

            document.querySelectorAll('.btn-select-ticket').forEach(btn => {
                btn.textContent = 'Вибрати';
                btn.style.background = '';
            });
            button.textContent = '✓ Вибрано';
            button.style.background = '#28a745';

            const ticketData = {
                company: button.getAttribute('data-company'),
                from: document.getElementById('from-city')?.value || '',
                to: document.getElementById('to-city')?.value || '',
                time: button.getAttribute('data-time'),
                price: button.getAttribute('data-price')
            };
            localStorage.setItem('selectedTicket', JSON.stringify(ticketData));

            // Перевіряємо, чи вікно вже не створено
            if (document.getElementById('dynamic-offer-modal')) return;

            // Створюємо оверлей з нуля через JS
            const overlay = document.createElement('div');
            overlay.id = 'dynamic-offer-modal';
            overlay.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                background: rgba(15, 23, 42, 0.8) !important;
                backdrop-filter: blur(10px) !important;
                -webkit-backdrop-filter: blur(10px) !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                z-index: 9999999 !important;
            `;

            // Наповнюємо контентом (всі стилі зашиті в інлайн, щоб не злетіли на GitHub)
            overlay.innerHTML = `
                <div style="background: #ffffff !important; padding: 45px 35px !important; border-radius: 28px !important; text-align: center !important; max-width: 450px !important; width: 90% !important; box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.4) !important; box-sizing: border-box !important;">
                    <div style="font-size: 60px !important; margin-bottom: 20px !important; line-height: 1 !important;">🏨</div>
                    <h2 style="font-size: 26px !important; color: #14183E !important; margin: 0 0 12px 0 !important; font-weight: 700 !important; font-family: sans-serif !important;">Бажаєте підібрати готель?</h2>
                    <p style="font-size: 15px !important; color: #5E6282 !important; line-height: 1.6 !important; margin: 0 0 30px 0 !important; font-family: sans-serif !important;">Ми можемо автоматично знайти найкращі варіанти проживання під ваш рейс зі знижкою.</p>
                    <div style="display: flex !important; gap: 15px !important; justify-content: center !important; flex-wrap: wrap !important;">
                        <button type="button" id="btn-offer-yes" style="padding: 14px 24px !important; background-color: #28a745 !important; color: #ffffff !important; border: none !important; border-radius: 12px !important; font-size: 15px !important; font-weight: 600 !important; cursor: pointer !important; min-width: 160px !important; box-shadow: 0 4px 12px rgba(40,167,69,0.2) !important;">Так, обов'язково</button>
                        <button type="button" id="btn-offer-no" style="padding: 14px 24px !important; background-color: #f8f9fa !important; color: #5E6282 !important; border: 1px solid #E5E5E5 !important; border-radius: 12px !important; font-size: 15px !important; font-weight: 600 !important; cursor: pointer !important; min-width: 160px !important;">Ні, тільки квиток</button>
                    </div>
                </div>
            `;

            document.body.appendChild(overlay);
        }

        // Обробка кліків по кнопках динамічної модалки
        if (e.target && e.target.id === 'btn-offer-yes') {
            e.preventDefault();
            window.location.href = './hotels.html';
        }

        if (e.target && e.target.id === 'btn-offer-no') {
            e.preventDefault();
            window.location.href = './reservation.html';
        }
    });
});