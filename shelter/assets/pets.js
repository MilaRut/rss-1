const popup = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close-btn');
const triggers = document.querySelectorAll('.js-dropdown-trigger');
const navItems = document.querySelectorAll('.nav__item');
const body = document.querySelector('body');

// MENU

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

const petsData = [
  {
    "name": "Jennifer",
    "img": "pets-jennifer.png",
    "type": "Dog",
    "breed": "Labrador",
    "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    "age": "2 months",
    "inoculations": ["none"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Sophia",
    "img": "pets-sophia.png",
    "type": "Dog",
    "breed": "Shih tzu",
    "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    "age": "1 month",
    "inoculations": ["parvovirus"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Woody",
    "img": "pets-woody.png",
    "type": "Dog",
    "breed": "Golden Retriever",
    "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    "age": "3 years 6 months",
    "inoculations": ["adenovirus", "distemper"],
    "diseases": ["right back leg mobility reduced"],
    "parasites": ["none"]
  },
  {
    "name": "Scarlett",
    "img": "pets-scarlett.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    "age": "3 months",
    "inoculations": ["parainfluenza"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Katrine",
    "img": "pets-katrine.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    "age": "6 months",
    "inoculations": ["panleukopenia"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Timmy",
    "img": "pets-timmy.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    "age": "2 years 3 months",
    "inoculations": ["calicivirus", "viral rhinotracheitis"],
    "diseases": ["kidney stones"],
    "parasites": ["none"]
  },
  {
    "name": "Freddie",
    "img": "pets-freddie.png",
    "type": "Cat",
    "breed": "British Shorthair",
    "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    "age": "2 months",
    "inoculations": ["rabies"],
    "diseases": ["none"],
    "parasites": ["none"]
  },
  {
    "name": "Charly",
    "img": "pets-charly.png",
    "type": "Dog",
    "breed": "Jack Russell Terrier",
    "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    "age": "8 years",
    "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
    "diseases": ["deafness", "blindness"],
    "parasites": ["lice", "fleas"]
  }
];

// Функция для случайной сортировки
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const shuffledPetsData = shuffleArray(petsData);
let nestedArray = [];
let finalArr = [];

const createFinalArr = () => {
  for (let i = 0; i < 6; i++) {
    if (i === 1 || i === 4) {
      nestedArray.push(shuffledPetsData);
    } else if (i === 2 || i === 5) {
      let shuffled = [];
      shuffled.push(shuffledPetsData[3]);
      shuffled.push(shuffledPetsData[2]);
      shuffled.push(shuffledPetsData[1]);
      shuffled.push(shuffledPetsData[0]);
      shuffled.push(shuffledPetsData[7]);
      shuffled.push(shuffledPetsData[6]);
      shuffled.push(shuffledPetsData[5]);
      shuffled.push(shuffledPetsData[4]);
      nestedArray.push(shuffled);
    } else if (i === 3) {
      let shuffled = [];
      shuffled.push(shuffledPetsData[0]);
      shuffled.push(shuffledPetsData[3]);
      shuffled.push(shuffledPetsData[2]);
      shuffled.push(shuffledPetsData[1]);
      shuffled.push(shuffledPetsData[5]);
      shuffled.push(shuffledPetsData[4]);
      shuffled.push(shuffledPetsData[7]);
      shuffled.push(shuffledPetsData[6]);
      nestedArray.push(shuffled);
    } else {
      let shuffled = [];
      shuffled.push(shuffledPetsData[2]);
      shuffled.push(shuffledPetsData[3]);
      shuffled.push(shuffledPetsData[0]);
      shuffled.push(shuffledPetsData[1]);
      shuffled.push(shuffledPetsData[4]);
      shuffled.push(shuffledPetsData[5]);
      shuffled.push(shuffledPetsData[7]);
      shuffled.push(shuffledPetsData[6]);
      nestedArray.push(shuffled);
    }
  }
  finalArr = nestedArray.flat();
  console.log(finalArr);
}

createFinalArr();

const petsList = document.getElementById('petsList');
const currentPageElem = document.getElementById('currentPage');
const firstPageBtn = document.getElementById('firstPage');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const lastPageBtn = document.getElementById('lastPage');

let currentPage = 1;
let itemsPerPage = 8;

function updateItemsPerPage() {
  const width = window.innerWidth;
  if (width >= 1280) {
    itemsPerPage = 8;
  } else if (width >= 768) {
    itemsPerPage = 6;
  } else {
    itemsPerPage = 3;
  }
}

function renderCards() {
  petsList.innerHTML = '';
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const itemsToRender = finalArr.slice(start, end);

  itemsToRender.forEach(item => {
    const petItem = document.createElement('li');
    petItem.className = 'pets__item';
    petItem.innerHTML = `
      <div class="pets__content">
          <div class="pets__image">
              <img src="./assets/img/${item.img}" width="270" height="270" alt="Photo of ${item.name}.">
          </div>
          <p class="pets__name">${item.name}</p>
          <button type="button" class="pets__more-btn">Learn more</button>
      </div>
  `;
    petsList.appendChild(petItem);
    petItem.addEventListener('click', () => openPopup(item));
  });

  currentPageElem.textContent = currentPage;
  updatePaginationButtons();
}

function openPopup(item) {
  document.querySelector('.popup__img').setAttribute('src', `./assets/img/${item.img}`);
  document.querySelector('.popup__name').innerText = item.name;
  document.querySelector('.popup__type').innerText = item.type;
  document.querySelector('.popup__breed').innerText = item.breed;
  document.querySelector('.popup__description').innerText = item.description;
  document.querySelector('.popup__age').innerText = item.age;
  document.querySelector('.popup__inoculations').innerText = item.inoculations;
  document.querySelector('.popup__diseases').innerText = item.diseases;
  document.querySelector('.popup__parasites').innerText = item.parasites;
  popup.classList.add('active');
}

popupCloseBtn.addEventListener('click', () => {
  popup.classList.remove('active');
});

document.addEventListener('click', (e) => {
  if (e.target === popup) {
    e.stopPropagation();
    popup.classList.remove('active');
  }
})

function updatePaginationButtons() {
  const totalPages = Math.ceil(finalArr.length / itemsPerPage);
  firstPageBtn.classList.toggle('disabled', currentPage === 1);
  prevPageBtn.classList.toggle('disabled', currentPage === 1);
  nextPageBtn.classList.toggle('disabled', currentPage === totalPages);
  lastPageBtn.classList.toggle('disabled', currentPage === totalPages);
}

function goToPage(page) {
  currentPage = Math.max(1, Math.min(page, Math.ceil(finalArr.length / itemsPerPage)));
  renderCards();
}

firstPageBtn.addEventListener('click', (e) => {
  e.preventDefault();
  goToPage(1);
});
prevPageBtn.addEventListener('click', (e) => {
  e.preventDefault();
  goToPage(currentPage - 1)
});
nextPageBtn.addEventListener('click', (e) => {
  e.preventDefault();
  goToPage(currentPage + 1)
});
lastPageBtn.addEventListener('click', (e) => {
  e.preventDefault();
  goToPage(Math.ceil(finalArr.length / itemsPerPage))
});

window.addEventListener('resize', () => {
  updateItemsPerPage();
  goToPage(1); // Сброс на первую страницу при изменении размера
});

// Инициализация
updateItemsPerPage();
renderCards();
showDropdownList()