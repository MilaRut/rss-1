
const triggers = document.querySelectorAll('.js-dropdown-trigger');
const navItems = document.querySelectorAll('.nav__item');
const body = document.querySelector('body');
const popup = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close-btn');

function openMenu(el1, el2) {
  el1.classList.add('is-active');
  el2.classList.add('is-active');
  body.classList.add('no-scroll');
}

function closeMenu(el1, el2) {
  el1.classList.remove('is-active');
  el2.classList.remove('is-active');
  body.classList.remove('no-scroll');
}

function showDropdownList() {
  triggers.forEach((el) => {
    let currentEl = el;
    let dataId = currentEl.getAttribute('data-id');
    let currentContent = document.querySelector(dataId);
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (!currentContent.classList.contains('is-active')) {
        openMenu(currentContent, currentEl);
      } else {
        closeMenu(currentContent, currentEl);
      }
    });
    navItems.forEach((item) => {
      item.addEventListener('click', () => {
        closeMenu(currentContent, currentEl);
      });
    });
    document.addEventListener('click', (e) => {
      if (currentContent.classList.contains('is-active') && e.target !== el && !el.contains(e.target) && !currentContent.contains(e.target)) {
        closeMenu(currentContent, currentEl);
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        currentContent.classList.remove('is-active');
        currentEl.classList.remove('is-active');
      }
    });
  });
}

let petsData = [];

function getData() {
  fetch('pets.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      petsData = data;
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

let currentIndex = 0;
let cardsPerSlide = 3; // По умолчанию 3 карточки
const petsCarousel = document.querySelector('.pets__carousel');
let previousCards = [];

function getRandomCards(exclude = []) {
  const availableCards = petsData.filter((_, index) => !exclude.includes(index));
  const shuffledCards = availableCards.sort(() => Math.random() - 0.5);
  return shuffledCards.slice(0, cardsPerSlide);
}

function renderCards(cards) {
  petsCarousel.innerHTML = '';
  cards.forEach(card => {
    const cardElement = document.createElement('li');
    cardElement.classList.add('pets__item');
    cardElement.innerHTML =
      `<div class="pets__content">
      <div class="pets__image">
        <img src="./assets/img/${card.img}" alt="${card.name}" width="270" height="270">
      </div>
      <p class="pets__name">${card.name}</p>
      <button type="button" class="pets__more-btn">Learn more</button>
  </div>`;
    cardElement.addEventListener('click', () => openPopup(card));
    petsCarousel.appendChild(cardElement);
  });
}

function openPopup(card) {
  document.querySelector('.popup__img').setAttribute('src', `./assets/img/${card.img}`);
  document.querySelector('.popup__name').innerText = card.name;
  document.querySelector('.popup__type').innerText = card.type;
  document.querySelector('.popup__breed').innerText = card.breed;
  document.querySelector('.popup__description').innerText = card.description;
  document.querySelector('.popup__age').innerText = card.age;
  document.querySelector('.popup__inoculations').innerText = card.inoculations;
  document.querySelector('.popup__diseases').innerText = card.diseases;
  document.querySelector('.popup__parasites').innerText = card.parasites;
  popup.style.display = 'block';
}

popupCloseBtn.addEventListener('click', () => {
  popup.style.display = 'none';
});

document.addEventListener('click', (e) => {
  if (e.target === popup) {
    e.stopPropagation();
    popup.style.display = 'none';
  }
})

function updateCards(direction) {
  // Сохраняем текущие карточки
  previousCards = Array.from(petsCarousel.children).map(card => {
    const name = card.querySelector('p').innerText;
    return petsData.findIndex(item => item.name === name);
  });

  // Получаем новые карточки, исключая предыдущие
  const newCards = getRandomCards(previousCards);
  renderCards(newCards);
}

document.querySelector('.slider__btn--prev').addEventListener('click', () => {
  updateCards(-1);
});

document.querySelector('.slider__btn--next').addEventListener('click', () => {
  updateCards(1);
});

let timeout = false;

function changeByResize() {
  if (window.innerWidth < 768) {
    cardsPerSlide = 1;
  } else if (window.innerWidth < 1280) {
    cardsPerSlide = 2;
  } else {
    cardsPerSlide = 3;
  }
  renderCards(getRandomCards(previousCards));
}

window.addEventListener('resize', function () {
  clearTimeout(timeout);
  timeout = setTimeout(changeByResize, 200);
});

document.addEventListener('DOMContentLoaded', function () {
  showDropdownList();
  getData();
  setTimeout(() => {
    const initialCards = getRandomCards();
    renderCards(initialCards);
  }, 100);
});