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
    console.error(error);
    return [];
  }
}

function renderReviews(reviews) {
  const wrapper = document.querySelector('.reviews-list');
  const errorMessage = document.querySelector('.error-message');

  if (!wrapper) {
    console.error('Reviews list not found');
    return;
  }

  wrapper.innerHTML = '';

  if (reviews.length === 0) {
    errorMessage.classList.remove('hidden');
    return;
  }

  errorMessage.classList.add('hidden');

  reviews.forEach(({ avatar_url, author, review }) => {
    const listItem = document.createElement('li');
    listItem.classList.add('swiper-slide');
    listItem.innerHTML = `
      <img src="${avatar_url}" alt="${author}" class="review-avatar"> <!-- Объект №8 -->
      <div class="review-content"> <!-- Объект №9 -->
        <h3 class="review-author">${author}</h3>
        <p class="review-text">${review}</p>
      </div>
    `;
    wrapper.appendChild(listItem);
  });

  initSwiper();
}

function initSwiper() {
  if (!document.querySelector('.swiper-slide')) {
    return;
  }

  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
      disabledClass: 'swiper-button-disabled',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    watchOverflow: true,
    breakpoints: {
      768: { slidesPerView: 2 },
      1440: { slidesPerView: 4 },
    },
    on: {
      init: function () {
        updateButtons(this);
      },
      slideChange: function () {
        updateButtons(this);
      },
    },
  });

  swiper.update();
}

function updateButtons(swiper) {
  document.querySelector('.swiper-button-prev').disabled = swiper.isBeginning;
  document.querySelector('.swiper-button-next').disabled = swiper.isEnd;
}

document.addEventListener('DOMContentLoaded', async () => {
  const reviews = await fetchReviews();
  renderReviews(reviews);
});
