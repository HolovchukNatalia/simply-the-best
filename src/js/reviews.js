import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_URL = 'https://portfolio-js.b.goit.study/api/reviews';

async function fetchReviews() {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load reviews. Please try again later.',
    });
    return [];
  }
}

function renderReviews(reviews) {
  const wrapper = document.querySelector('.swiper-wrapper');
  const errorMessage = document.querySelector('.error-message');

  if (!wrapper) {
    console.error('Не найден .swiper-wrapper');
    return;
  }

  wrapper.innerHTML = '';

  if (reviews.length === 0) {
    errorMessage.classList.remove('hidden');
    return;
  }

  errorMessage.classList.add('hidden');

  reviews.forEach(({ avatar_url, author, review }) => {
    const listItem = document.createElement('div'); // Должен быть <div>, не <li>!
    listItem.classList.add('swiper-slide');
    listItem.innerHTML = `
      <div class="review-content">
        <img src="${avatar_url}" alt="${author}" class="review-avatar">
        <h3 class="review-author">${author}</h3>
        <p class="review-text">${review}</p>
      </div>
    `;
    wrapper.appendChild(listItem);
  });

  console.log('Отзывы загружены, инициализируем Swiper...');
  initSwiper();
}

function initSwiper() {
  new Swiper('.swiper', {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    watchOverflow: true,
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    },
  });

  console.log('Swiper успешно инициализирован!');
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Загрузка отзывов...');
  const reviews = await fetchReviews();
  renderReviews(reviews);
});
