import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

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
      message: 'Failed to load reviews.',
    });
    return [];
  }
}

function renderReviews(reviews) {
  const container = document.querySelector('.swiper-wrapper');
  const errorMessage = document.querySelector('.error-message');

  if (!container) return;

  if (reviews.length === 0) {
    errorMessage.classList.remove('hidden');
    return;
  }

  errorMessage.classList.add('hidden');

  reviews.forEach(({ avatar_url, author, review }) => {
    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');
    slide.innerHTML = `
      <img src="${avatar_url}" alt="${author}" class="review-avatar">
      <p class="review-author">${author}</p>
      <p class="review-text">${review}</p>
    `;
    container.appendChild(slide);
  });

  new Swiper('.swiper', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: {
      enabled: true,
    },
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const reviews = await fetchReviews();
  renderReviews(reviews);
});
