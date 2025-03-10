import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_URL = 'https://portfolio-js.b.goit.study/api/reviews';

async function fetchReviews() {
  try {
    console.log('Запрос на сервер...');
    const response = await axios.get(API_URL);
    console.log('Ответ от сервера:', response.data);
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load reviews. Please try again later.',
    });
    console.error('Ошибка при загрузке отзывов:', error);
    return [];
  }
}

function renderReviews(reviews) {
  const wrapper = document.querySelector('.reviews-list');
  const errorMessage = document.querySelector('.error-message');

  if (!wrapper) {
    console.error('Не найден .reviews-list!');
    return;
  }

  wrapper.innerHTML = '';

  if (reviews.length === 0) {
    errorMessage.classList.remove('hidden');
    console.warn('Нет отзывов, показываем Not Found.');
    return;
  }

  errorMessage.classList.add('hidden');

  reviews.forEach(({ avatar_url, author, review }) => {
    const listItem = document.createElement('li');
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

  console.log('Отзывы загружены, обновляем Swiper...');
  initSwiper();
}

function initSwiper() {
  if (!document.querySelector('.swiper-slide')) {
    console.warn('Нет слайдов, Swiper не будет инициализирован.');
    return;
  }

  const swiper = new Swiper('.swiper', {
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
    on: {
      init: function () {
        console.log('Swiper инициализирован');
      },
    },
  });

  swiper.update();
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log('Страница загружена, начинаем работу...');
  const reviews = await fetchReviews();
  renderReviews(reviews);
});
