import Accordion from "accordion-js";
import "accordion-js/dist/accordion.min.css";

import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

import axios from 'axios';


        document.addEventListener("DOMContentLoaded", function() {
            new Accordion('.accordion-container', {
                duration: 400,
                showMultiple: true
            });
        });

    document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".word-list", {
        loop: true,
        slidesPerView: 1,
        allowTouchMove: false,
    });

    document.querySelector(".arrow-right").addEventListener("click", function () {
        swiper.slideNext();
    });
});
