import"./burger-DBoXYxpr.js";/* empty css               */var e=[{name:`Рим, Італія`,price:`$5.42k`,duration:`10 днів`,img:`https://picsum.photos/id/43/600/800`},{name:`Лондон, Великобританія`,price:`$4.2k`,duration:`12 днів`,img:`https://picsum.photos/id/57/600/800`},{name:`Вся Європа`,price:`$15k`,duration:`28 днів`,img:`https://picsum.photos/id/46/600/800`},{name:`Париж, Франція`,price:`$6.1k`,duration:`7 днів`,img:`https://picsum.photos/id/61/600/800`},{name:`Барселона, Іспанія`,price:`$3.8k`,duration:`9 днів`,img:`https://picsum.photos/id/64/600/800`},{name:`Кіото, Японія`,price:`$8.5k`,duration:`14 днів`,img:`https://picsum.photos/id/100/600/800`},{name:`Нью-Йорк, США`,price:`$9.2k`,duration:`8 днів`,img:`https://picsum.photos/id/124/600/800`},{name:`Амстердам, Нідерланди`,price:`$4.5k`,duration:`10 днів`,img:`https://picsum.photos/id/164/600/800`},{name:`Прага, Чехія`,price:`$2.9k`,duration:`6 днів`,img:`https://picsum.photos/id/178/600/800`}],t=document.getElementById(`hotels-grid`);t&&e.forEach(e=>{let n=document.createElement(`div`);n.className=`hotel-card`,n.innerHTML=`
            <div class="card-image-box">
                <img src="${e.img}" alt="${e.name}">
            </div>
            <div class="hotel-info">
                <div class="info-row">
                    <span class="hotel-name">${e.name}</span>
                    <span class="hotel-price">${e.price}</span>
                </div>
                <div class="info-row bottom-row">
                    <span class="trip-duration">➔ ${e.duration} подорожі</span>
                </div>
            </div>
            <button class="btn-book-card">Забронювати</button>
        `,n.querySelector(`.btn-book-card`).addEventListener(`click`,()=>{let t={name:e.name,price:e.price};localStorage.setItem(`selectedHotelData`,JSON.stringify(t)),window.location.href=`./reservation.html`}),t.appendChild(n)});