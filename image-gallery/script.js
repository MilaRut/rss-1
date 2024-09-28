const clientId = "vWthW9gGUoas3gLSoQRpz6yYpqeiBXEAHUSPqcEjruQ";
const baseUrl = "https://api.unsplash.com/search/photos";
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const form = document.querySelector('.form');
const searchInput = document.getElementById('search-input');
const resetBtn = document.querySelector('.header__reset-btn');
const errorMsg = document.querySelector('.error-msg');
const modal = document.querySelector('.modal');
const modalCloseElements = document.querySelectorAll('[data-close-modal]');
const modalImage = document.querySelector('.modal__image');
const modalImageCreds = document.querySelector('.modal__image-creds');
const modalImageLikes = document.querySelector('.modal__likes');
const hoverEffect = document.querySelector('.hover-effect');
const showMoreBtn = document.querySelector('.show-more');
let lastQuery = 'capybara';

// Получение данных от API
async function getPhotos(query) {
  const url = `${baseUrl}?query=${query}&per_page=24&orientation=landscape&client_id=${clientId}`;

  loader.style.display = 'grid';
  gallery.style.display = 'none';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      gallery.innerHTML = '';
      errorMsg.classList.add('is-visible');
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.results.length === 0) {
      gallery.innerHTML = '';
      errorMsg.classList.add('is-visible');
    } else {
      errorMsg.classList.remove('is-visible');
      showImages(data.results);
      lastQuery = query;
      console.log(data.results);
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  } 
}

// Рендеринг галереи
function showImages(arr) {
  gallery.innerHTML = '';
  showMoreBtn.classList.add('is-hidden');
  const isMobile = window.innerWidth <= 768;
  let loadedImagesCount = 0;

  arr.forEach((el, index) => {
    const newImage = document.createElement('div');
    newImage.classList = 'image-wrapper';
    const loadingAttribute = (isMobile && index >= 2) || (!isMobile && index >= 12) ? 'lazy' : '';
    const isHidden = (index >= 12) ? 'is-hidden' : '';
    
    const img = document.createElement('img');
    img.src = el.urls.regular;
    img.setAttribute('data-name', el.user.name);
    img.setAttribute('data-likes', el.likes);
    img.setAttribute('data-link', el.user.links.html);
    img.alt = el.alt_description;
    img.setAttribute('loading', loadingAttribute);
    img.className = isHidden;

    img.addEventListener('load', () => {
      loadedImagesCount++;
      if ((isMobile && loadedImagesCount == 1) || (!isMobile && loadedImagesCount == 11)) {
        loader.style.display = 'none';
        gallery.style.display = 'grid';
        showMoreBtn.classList.remove('is-hidden');
      }
    });

    newImage.appendChild(img);
    gallery.append(newImage);
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const query = searchInput.value;
  if (query) {
    getPhotos(query);
  }
});

form.addEventListener('reset', function () {
  resetBtn.classList.remove('is-focused');
  if (gallery.children.length === 0) {
    searchInput.value = lastQuery;
    getPhotos(lastQuery);
  }
});

searchInput.addEventListener('input', () => {
  if (searchInput.value !== '') {
    resetBtn.classList.add('is-focused');
  } else {
    resetBtn.classList.remove('is-focused');
    if (gallery.children.length === 0) {
      getPhotos(lastQuery);
    }
  }
});

// Установка фокуса в инпут
function setFocus() {
  searchInput.focus();
}

function prepareOpening() {
  setTimeout(() => {
    modal.classList.remove('modal--preload');
  }, 100);
}

let currentImageIndex = 0;
let imagesArray = [];

// Рендеринг и открытие модалки
function initModal() {
  prepareOpening();
  document.addEventListener('click', (e) => {
    if (e.target.matches('.image-wrapper img')) {
      e.preventDefault();
      currentImageIndex = Array.from(gallery.children).indexOf(e.target.parentElement);
      imagesArray = Array.from(gallery.children).map(imgWrapper => {
        const img = imgWrapper.querySelector('img');
        return {
          src: img.getAttribute('src'),
          name: img.getAttribute('data-name'),
          likes: img.getAttribute('data-likes'),
          link: img.getAttribute('data-link')
        };
      });
      openModal(currentImageIndex);
    }
  });

  modalCloseElements.forEach((el) => {
    el.addEventListener('click', () => {
      modal.classList.remove('is-active');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.classList.remove('is-active');
    }
  });
  
  document.querySelector('.modal__control--prev').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
    updateModalContent();
  });

  document.querySelector('.modal__control--next').addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
    updateModalContent();
  });
}

function openModal(index) {
  modal.classList.add('is-active');
  currentImageIndex = index;
  updateModalContent();
}

function updateModalContent() {
  const currentImage = imagesArray[currentImageIndex];
  
  modalImage.style.opacity = 0;

  setTimeout(() => {
      modalImage.innerHTML = `<img src="${currentImage.src}">`;
      modalImageCreds.innerHTML = `
          Photo by <a href="${currentImage.link}" target="_blank">${currentImage.name}</a>`;
      modalImageLikes.textContent = currentImage.likes;

      modalImage.style.opacity = 1;
  }, 300);
}

// Анимирование курсора по ховеру на избражение
function animateCursor() {
  gallery.addEventListener('mousemove', (e) => {
    const target = e.target;

    if (target.matches('img')) {
      hoverEffect.style.left = `${e.pageX}px`;
      hoverEffect.style.top = `${e.pageY}px`;
      hoverEffect.classList.add('is-active');
    } else {
      hoverEffect.classList.remove('is-active');
    }
  });

  gallery.addEventListener('mouseleave', () => {
    hoverEffect.classList.remove('is-active');
  });
}

// Показать еще

function showMore() {
  showMoreBtn.addEventListener('click', () => {
    document.querySelectorAll('img.is-hidden').forEach((el) => {
      el.classList.remove('is-hidden');
    })
  })
}

document.addEventListener('DOMContentLoaded', function () {
  getPhotos(lastQuery);
  setFocus();
  initModal();
  animateCursor();
  showMore();
});
