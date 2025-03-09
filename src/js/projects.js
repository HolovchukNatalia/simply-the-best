import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Keyboard, A11y } from 'swiper/modules';

document.addEventListener("DOMContentLoaded", () => {
    const swiper = new Swiper('.swiper', {
        modules: [Navigation, Keyboard, A11y],
        slidesPerView: 1,
        spaceBetween: 20,
        loop: false,
        navigation: {
            prevEl: '.swiper-button-prev',
            nextEl: '.swiper-button-next',
        },
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },
        grabCursor: true,
        a11y: {
            enabled: true,
            prevSlideMessage: 'Попередній слайд',
            nextSlideMessage: 'Наступний слайд',
            firstSlideMessage: 'Це перший слайд',
            lastSlideMessage: 'Це останній слайд',
        },
        on: {
            init: function () {
                this.navigation.update();
            },
            slideChange: function () {
                this.navigation.update();
            }
        }
    });
});