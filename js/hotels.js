const hotelData = [
    { name: "Рим, Італія", price: "$5.42k", duration: "10 днів", img: "https://picsum.photos/id/43/600/800" },
    { name: "Лондон, Великобританія", price: "$4.2k", duration: "12 днів", img: "https://picsum.photos/id/57/600/800" },
    { name: "Вся Європа", price: "$15k", duration: "28 днів", img: "https://picsum.photos/id/46/600/800" },
    { name: "Париж, Франція", price: "$6.1k", duration: "7 днів", img: "https://picsum.photos/id/61/600/800" },
    { name: "Барселона, Іспанія", price: "$3.8k", duration: "9 днів", img: "https://picsum.photos/id/64/600/800" },
    { name: "Кіото, Японія", price: "$8.5k", duration: "14 днів", img: "https://picsum.photos/id/100/600/800" },
    { name: "Нью-Йорк, США", price: "$9.2k", duration: "8 днів", img: "https://picsum.photos/id/124/600/800" },
    { name: "Амстердам, Нідерланди", price: "$4.5k", duration: "10 днів", img: "https://picsum.photos/id/164/600/800" },
    { name: "Прага, Чехія", price: "$2.9k", duration: "6 днів", img: "https://picsum.photos/id/178/600/800" }
];

const hotelsGrid = document.getElementById('hotels-grid');

if (hotelsGrid) {
    hotelData.forEach(hotel => {
        const card = document.createElement('div');
        card.className = 'hotel-card';
        card.innerHTML = `
            <div class="card-image-box">
                <img src="${hotel.img}" alt="${hotel.name}">
            </div>
            <div class="hotel-info">
                <div class="info-row">
                    <span class="hotel-name">${hotel.name}</span>
                    <span class="hotel-price">${hotel.price}</span>
                </div>
                <div class="info-row bottom-row">
                    <span class="trip-duration">➔ ${hotel.duration} подорожі</span>
                </div>
            </div>
            <button class="btn-book-card">Забронювати</button>
        `;

        card.querySelector('.btn-book-card').addEventListener('click', () => {
            const hotelInfo = {
                name: hotel.name,
                price: hotel.price
            };

            localStorage.setItem('selectedHotelData', JSON.stringify(hotelInfo));
            window.location.href = './reservation.html';
        });

        hotelsGrid.appendChild(card);
    });
}