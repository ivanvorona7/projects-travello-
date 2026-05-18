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
            [fromInput, toInput, dateInput].forEach(input => input.classList.remove('input-error'));
            [errorFrom, errorTo, errorDate].forEach(err => err.textContent = '');

            if (!fromInput.value.trim()) {
                errorFrom.textContent = 'Будь ласка, вкажіть місто вильоту';
                fromInput.classList.add('input-error');
                isValid = false;
            }

            if (!toInput.value.trim()) {
                errorTo.textContent = 'Будь ласка, вкажіть місто призначення';
                toInput.classList.add('input-error');
                isValid = false;
            }

            if (!dateInput.value) {
                errorDate.textContent = 'Виберіть дату вильоту';
                dateInput.classList.add('input-error');
                isValid = false;
            }

            if (isValid) {
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

            const offerModal = document.querySelector('.hotel-modal-overlay');
            if (offerModal) {
                console.log("JS убирает hidden и принудительно ставит стили отображения!");
                offerModal.classList.remove('hidden');
                offerModal.style.setProperty('display', 'flex', 'important');
                offerModal.style.setProperty('position', 'fixed', 'important');
                offerModal.style.setProperty('z-index', '999999', 'important');
                offerModal.style.setProperty('visibility', 'visible', 'important');
                offerModal.style.setProperty('opacity', '1', 'important');
            } else {
                console.error("JS не смог найти блок с классом .hotel-modal-overlay");
            }
        }

        if (e.target && e.target.id === 'btn-offer-yes') {
            window.location.href = './hotels.html';
        }

        if (e.target && e.target.id === 'btn-offer-no') {
            window.location.href = './reservation.html';
        }
    });
});