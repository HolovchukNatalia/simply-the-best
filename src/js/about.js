import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
// import 'swiper/css';
// import 'swiper/css/navigation';
import { Navigation, Keyboard } from 'swiper/modules';

new Accordion('.list-about-me', {
  triggerClass: 'about-trigger',
  showMultiple: true,
  openOnInit: [0],
});

// const swiper = new Swiper('.word-list', {
//   modules: [Navigation, Keyboard],
//   slidesPerView: 2,
//   spaceBetween: 0,
//   loop: true,
//   navigation: {
//     nextEl: '.word-button-next',
//   },
//   keyboard: {
//     enabled: true,
//     onlyInViewport: true,
//   },
//   grabCursor: true,
//   //   on: {
//   //     init: function () {
//   //       this.navigation.update();
//   //     },
//   //     slideChange: function () {
//   //       this.navigation.update();
//   //     },
//   //   },
// });
