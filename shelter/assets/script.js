const triggers = document.querySelectorAll('.js-dropdown-trigger');

function showDropdownList() {
  triggers.forEach((el) => {
    let currentEl = el;
    let dataId = currentEl.getAttribute('data-id');
    let currentContent = document.querySelector(dataId);
    el.addEventListener('click', (e) => {
      e.preventDefault();
      if (!currentContent.classList.contains('is-active')) {
        currentContent.classList.add('is-active');
        currentEl.classList.add('is-active');
      } else {
        currentContent.classList.remove('is-active');
        currentEl.classList.remove('is-active');
      }
    });
    document.addEventListener('click', (e) => {
      if (currentContent.classList.contains('is-active') && e.target !== el && !el.contains(e.target) && currentContent.contains(e.target)) {
        currentContent.classList.remove('is-active');
        currentEl.classList.remove('is-active');
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

document.addEventListener('DOMContentLoaded', function () {
  showDropdownList();
});