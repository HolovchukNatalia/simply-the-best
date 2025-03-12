import 'swiper/css';
import Swiper from 'swiper';
import { Navigation, Keyboard } from 'swiper/modules';

const API_URL = 'https://portfolio-js.b.goit.study/api/reviews';

const reviewsList = document.querySelector('.reviews-list');
const prevButton = document.querySelector('.swiper-button-prev');
const nextButton = document.querySelector('.swiper-button-next');

let swiperInstance = null;

async function fetchReviews() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const reviews = await response.json();

    if (!Array.isArray(reviews) || reviews.length === 0) {
      reviewsList.innerHTML = `<p class="not-found">Not found</p>`;
      disableButtons();
      return;
    }

    renderReviews(reviews);

    setTimeout(() => {
      equalizeReviewHeights();
      initSwiper();
    }, 0);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    reviewsList.innerHTML = `<li class="not-found"><p>Not found</p></li>`;
    disableButtons();
  }
}

function renderReviews(reviews) {
  reviewsList.innerHTML = '';
  reviews.forEach(({ avatar_url, author, review }) => {
    const reviewItem = document.createElement('li');
    reviewItem.classList.add('swiper-slide', 'review-card');
    reviewItem.innerHTML = `
            <img src="${avatar_url}" alt="${author}" class="review-avatar">
            <h3 class="review-name">${author}</h3>
            <p class="review-text">${review}</p>
        `;
    reviewsList.appendChild(reviewItem);
  });

  applyResponsiveStyles();
  window.addEventListener('resize', handleResize);
}

function equalizeReviewHeights() {
  const reviewCards = document.querySelectorAll('.review-card');
  if (!reviewCards.length) return;

  let maxHeight = 0;

  reviewCards.forEach(card => {
    card.style.height = 'auto'; // Скидаємо висоту перед вимірюванням
    maxHeight = Math.max(maxHeight, card.offsetHeight);
  });

  reviewCards.forEach(card => {
    card.style.height = `${maxHeight}px`;
  });

  if (swiperInstance) swiperInstance.update();
}

function applyResponsiveStyles() {
  const screenWidth = window.innerWidth;
  const containerReviews = document.querySelector('.container-reviews');
  const reviewsSection = document.querySelector('.reviews');
  const sliderButtons = document.querySelectorAll('.slider-btn');

  containerReviews.style.removeProperty('max-width');
  containerReviews.style.removeProperty('width');
  containerReviews.style.removeProperty('padding');
  reviewsSection.style.removeProperty('padding');

  if (screenWidth <= 767) {
    containerReviews.style.maxWidth = '375px';
    containerReviews.style.maxHeight = '302px';
    containerReviews.style.padding = '0 16px';
    reviewsSection.style.padding = '32px 0';
  } else if (screenWidth <= 1439) {
    containerReviews.style.width = '734px';
    containerReviews.style.padding = '0 16px';
    reviewsSection.style.padding = '48px 0';
  } else {
  }

  sliderButtons.forEach(btn => {
    btn.style.width = '52px';
    btn.style.height = '52px';
    btn.style.padding = '14px';
  });

  equalizeReviewHeights(); 
}

function handleResize() {
  applyResponsiveStyles();
  if (swiperInstance) swiperInstance.update();
}

function initSwiper() {
  if (swiperInstance) swiperInstance.destroy(true, true);

  swiperInstance = new Swiper('.reviews-slider', {
    modules: [Navigation, Keyboard],
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    breakpoints: {
      375: { slidesPerView: 1, slidesPerGroup: 1 },
      768: { slidesPerView: 2, slidesPerGroup: 1 },
      1440: { slidesPerView: 4, slidesPerGroup: 1 },
    },
    on: {
      init: function () {
        updateNavigation(this);
        equalizeReviewHeights();
      },
      slideChange: function () {
        updateNavigation(this);
      },
    },
  });
  updateNavigation(swiperInstance);
}

function updateNavigation(swiper) {
  if (swiper.isBeginning) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }
  if (swiper.isEnd) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
}

function disableButton(button) {
  button.classList.add('swiper-button-disabled');
  button.setAttribute('disabled', 'true');
}

function enableButton(button) {
  button.classList.remove('swiper-button-disabled');
  button.removeAttribute('disabled');
}

function disableButtons() {
  disableButton(prevButton);
  disableButton(nextButton);
}

fetchReviews();
