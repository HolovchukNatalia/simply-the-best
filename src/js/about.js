import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { Navigation, Keyboard } from 'swiper/modules';

// new Accordion('.list-about-me', {
//   triggerClass: 'about-trigger',
//   showMultiple: true,
//   openOnInit: [0],
// });

document.addEventListener('DOMContentLoaded', function () {
  new Accordion('.list-about-me', {
    triggerClass: 'about-trigger',
    showMultiple: true,
    openOnInit: [0],
  });
});


const techSwiper = new Swiper('.tech-swiper', {
  modules: [Navigation, Keyboard],
  loop: true,
  slidesPerGroup: 1,
  spaceBetween: 0,
  watchOverflow: true,
  slidesPerView: 'auto',
  navigation: {
    nextEl: '.tech-button-next',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  grabCursor: true,
  on: {
    init: function () {
      this.navigation.update();
    },
    slideChange: function () {
      this.navigation.update();
    },
    resize: function () {
      this.navigation.update();
    },
  },
});

// const techSwiperContainer = document.querySelector('.tech-swiper');
// document.addEventListener('keydown', function (event) {
//   if (event.key === 'Tab') {
//     if (techSwiperContainer.contains(document.activeElement)) {
//       techSwiper.slideNext();
//       event.preventDefault();
//     }
//   }
// });

const techSwiperContainer = document.querySelector('.tech-swiper');

if (techSwiperContainer) {
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Tab') {
      if (techSwiperContainer.contains(document.activeElement)) {
        techSwiper.slideNext();
        event.preventDefault();
      }
    }
  });
} else {
  console.error('❌ techSwiperContainer не знайдено!');
}
