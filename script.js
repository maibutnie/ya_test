const champions = [
    { name: "Хозе-Рауль Капабланка", title: "Чемпион мира по шахматам", imgSrc: "assets/figure.png" },
    { name: "Эммануил Ласкер", title: "Чемпион мира по шахматам", imgSrc: "assets/figure.png" },
    { name: "Александр Алехин", title: "Чемпион мира по шахматам", imgSrc: "assets/figure.png" },
    { name: "Арон Нимцович", title: "Чемпион мира по шахматам", imgSrc: "assets/figure.png" },
    { name: "Рихард Рети", title: "Чемпион мира по шахматам", imgSrc: "assets/figure.png" },
    { name: "Остап Бендер", title: "Гроссмейстер", imgSrc: "assets/figure.png" }
];

const cardsContainer = document.getElementById('cardsContainer');
let previousButton = window.screen.width <= 1100
    ? document.getElementById('previous-small')
    : document.getElementById('previous');
let nextButton = window.screen.width <= 1100
    ? document.getElementById('next-small')
    : document.getElementById('next');

const blocks = document.querySelectorAll('.block:not(#hide)');
const prevBlockButton = document.getElementById('previous-block');
const nextBlockButton = document.getElementById('next-block');
const navigationDots = document.getElementById('navigation-dots');
let currentIndex = 0;

let currentPage = 0;
let cardsPerPage = 0;
let lastDirection = null;

function showBlock(index) {
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].classList.remove('active');
    }
    blocks[index].classList.add('active');
    updateButtonState();
    updateDots();
}

function updateButtonState() {
    prevBlockButton.disabled = currentIndex === 0;
    nextBlockButton.disabled = currentIndex === blocks.length - 1;
}

function createDots() {
    for (let i = 0; i < blocks.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = i;
            showBlock(currentIndex);
        });
        navigationDots.appendChild(dot);
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function calculateCardsPerPage() {
    const cardWidth = 394;
    const containerWidth = cardsContainer.clientWidth;
    cardsPerPage = Math.floor(containerWidth / cardWidth) || 1;
}

function renderCards() {
    cardsContainer.innerHTML = '';

    const start = currentPage * cardsPerPage;
    const end = Math.min(start + cardsPerPage, champions.length);

    const currentCards = champions.slice(start, end);

    currentCards.forEach(champion => {
        const card = document.createElement('div');
        card.className = 'card';

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

    if (window.screen.width <= 1100)
        document.getElementById('amount-small').textContent = `${displayEnd}`;
    else
        document.getElementById('amount').textContent = `${displayEnd}`;

    previousButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage >= totalPages - 1;
}

function goToNextPage() {
    console.log('cdjk');

    lastDirection = 'next';
    currentPage++;
    renderCards();
}

function goToPreviousPage() {
    lastDirection = 'previous';
    currentPage--;
    renderCards();
}

prevBlockButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : 0;
    showBlock(currentIndex);
});

nextBlockButton.addEventListener('click', () => {
    currentIndex = (currentIndex < blocks.length - 1) ? currentIndex + 1 : blocks.length - 1;
    showBlock(currentIndex);
});

nextButton.addEventListener('click', goToNextPage);
previousButton.addEventListener('click', goToPreviousPage);

window.addEventListener('resize', () => {
    previousButton = window.screen.width <= 1100
        ? document.getElementById('previous-small')
        : document.getElementById('previous');
    nextButton = window.screen.width <= 1100
        ? document.getElementById('next-small')
        : document.getElementById('next');

    previousButton.addEventListener('click', goToPreviousPage);
    nextButton.addEventListener('click', goToNextPage);
    calculateCardsPerPage();
    renderCards();
});

calculateCardsPerPage();
renderCards();

createDots();
showBlock(currentIndex);