import 'swiper/css';
import Swiper from 'swiper';
import { Navigation, Keyboard } from 'swiper/modules';

const API_URL = 'https://portfolio-js.b.goit.study/api/reviews';

const reviewsList = document.querySelector('.reviews-list');
const prevButton = document.querySelector('.swiper-button-prev');
const nextButton = document.querySelector('.swiper-button-next');

let swiperInstance = null;
let previousScreenWidth = window.innerWidth;

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
    setTimeout(() => initSwiper(), 100);
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
}

function applyResponsiveStyles() {
  const screenWidth = window.innerWidth;
  const containerReviews = document.querySelector('.container-reviews');
  const reviewsSection = document.querySelector('.reviews');
  const sliderButtons = document.querySelectorAll('.slider-btn');

  if (screenWidth <= 767) {
    containerReviews.style.padding = '0 16px';
    reviewsSection.style.padding = '32px 0';
  } else if (screenWidth <= 1439) {
    containerReviews.style.padding = '0 16px';
    reviewsSection.style.padding = '48px 0';
  } else {
    containerReviews.style.removeProperty('padding');
    reviewsSection.style.removeProperty('padding');
  }

  sliderButtons.forEach(btn => {
    btn.style.width = '52px';
    btn.style.height = '52px';
    btn.style.padding = '14px';
  });

  if (swiperInstance) swiperInstance.update();
}

function handleResize() {
  const currentScreenWidth = window.innerWidth;

  if (
    (previousScreenWidth <= 767 && currentScreenWidth > 767) ||
    (previousScreenWidth > 767 && currentScreenWidth <= 767) ||
    (previousScreenWidth <= 1439 && currentScreenWidth > 1439) ||
    (previousScreenWidth > 1439 && currentScreenWidth <= 1439)
  ) {
    setTimeout(() => {
      if (swiperInstance) {
        swiperInstance.destroy(true, true);
      }
      initSwiper();
    }, 100);
  }

  applyResponsiveStyles();
  previousScreenWidth = currentScreenWidth;
}

function initSwiper() {
  if (swiperInstance) swiperInstance.destroy(true, true);
  swiperInstance = new Swiper('.reviews-slider', {
    modules: [Navigation, Keyboard],
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 16,
    observer: true,
    observeParents: true,
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

window.addEventListener('resize', handleResize);

fetchReviews();

