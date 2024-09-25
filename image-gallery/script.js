const clientId = "vWthW9gGUoas3gLSoQRpz6yYpqeiBXEAHUSPqcEjruQ";
const baseUrl = "https://api.unsplash.com/search/photos";
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.form');
const searchInput = document.getElementById('search-input');
const resetBtn = document.querySelector('.header__reset-btn');
const errorMsg = document.querySelector('.error-msg');
const modal = document.querySelector('.modal');
const modalCloseElements = document.querySelectorAll('[data-close-modal]');
const modalImage = document.querySelector('.modal__image');
const modalImageCreds = document.querySelector('.modal__image-creds');
let lastQuery = 'capybara';

async function getPhotos(query) {
  const url = `${baseUrl}?query=${query}&per_page=12&orientation=landscape&client_id=${clientId}`;

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
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function showImages(arr) {
  gallery.innerHTML = '';

  arr.forEach((el) => {
    const newImage = document.createElement('div');
    newImage.classList = 'image-wrapper';
    newImage.innerHTML = `<img src="${el.urls.regular}" data-name="${el.user.name}" data-link="${el.user.links.html}" alt="Image." title="Click to enlarge" loading="lazy">`;
    gallery.append(newImage);
  })
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const query = searchInput.value;
  if (query) {
    getPhotos(query);
  }
});

form.addEventListener('reset', function () {
  searchInput.value = lastQuery;
  getPhotos(lastQuery);
  resetBtn.classList.remove('is-focused');
});

searchInput.addEventListener('input', () => {
  if (searchInput.value !== '') {
    resetBtn.classList.add('is-focused');
  } else {
    resetBtn.classList.remove('is-focused');
    getPhotos(lastQuery);
  }
});

function setFocus() {
  searchInput.focus();
}

function prepareOpening() {
  setTimeout(() => {
    modal.classList.remove('modal--preload');
  }, 100);
}

function initModal() {
  prepareOpening();
  document.addEventListener('click', (e) => {
    if (e.target.matches('.image-wrapper img')) {
      e.preventDefault();
      modal.classList.add('is-active');
      modalImage.innerHTML = '';
      modalImage.innerHTML = `<img src="${e.target.getAttribute('src')}" loading="lazy">`;
      modalImageCreds.innerHTML = `Photo by <a href="${e.target.getAttribute('data-link')}" target="_blank">${e.target.getAttribute('data-name')}</a>`
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
}

document.addEventListener('DOMContentLoaded', function () {
  getPhotos(lastQuery);
  setFocus();
  initModal();
});