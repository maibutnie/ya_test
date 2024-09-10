const champions = [
    { name: "Хозе-Рауль Капабланка", title: "Чемпион мира по шахматам", imgSrc: "assets/figure.png" },
    { name: "Эммануил Ласкер", title: "Чемпион мира по шахматам", imgSrc: "assets/figure.png" },
    { name: "Александр Алехин", title: "Чемпион мира по шахматам", imgSrc: "assets/figure.png" },
    { name: "Арон Нимцович", title: "Чемпион мира по шахматам", imgSrc: "assets/figure.png" },
    { name: "Рихард Рети", title: "Чемпион мира по шахматам", imgSrc: "assets/figure.png" },
    { name: "Остап Бендер", title: "Гроссмейстер", imgSrc: "assets/figure.png" }
];

const cardsContainer = document.getElementById('cardsContainer');
const previousButton = document.getElementById('previous');
const nextButton = document.getElementById('next');
const pageIndicator = document.getElementById('pageIndicator');

let currentPage = 0;
let cardsPerPage = 0;

function calculateCardsPerPage() {
    const cardWidth = 394;
    const containerWidth = cardsContainer.clientWidth;
    cardsPerPage = Math.floor(containerWidth / cardWidth) || 1;
}

let lastDirection = null; // Для отслеживания направления

function renderCards() {
    // Сброс анимации перед рендерингом новых карточек
    cardsContainer.innerHTML = '';

    const start = currentPage * cardsPerPage;
    const end = Math.min(start + cardsPerPage, champions.length);

    const currentCards = champions.slice(start, end);

    currentCards.forEach(champion => {
        const card = document.createElement('div');
        card.className = 'card';

        // Добавление анимации в зависимости от направления
        if (lastDirection === 'next') {
            card.classList.add('slide-right');
        } else if (lastDirection === 'previous') {
            card.classList.add('slide-left');
        }

        card.innerHTML = `
            <img src="${champion.imgSrc}" alt="figure" />
            <h4>${champion.name}</h4>
            <p>${champion.title}</p>
            <button class="blue">Подробнее</button>
        `;
        cardsContainer.appendChild(card);
    });

    const totalPages = Math.ceil(champions.length / cardsPerPage);
    const displayEnd = end;

    document.getElementById('amount').textContent = `${displayEnd}`;

    previousButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage >= totalPages - 1;
}

function goToNextPage() {
    lastDirection = 'next'; // Запоминаем направление
    currentPage++;
    renderCards();
}

function goToPreviousPage() {
    lastDirection = 'previous'; // Запоминаем направление
    currentPage--;
    renderCards();
}


nextButton.addEventListener('click', goToNextPage);
previousButton.addEventListener('click', goToPreviousPage);

window.addEventListener('resize', () => {
    calculateCardsPerPage();
    renderCards();
});

calculateCardsPerPage();
renderCards();
