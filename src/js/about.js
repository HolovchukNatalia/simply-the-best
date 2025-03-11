import Accordion from "accordion-js";
import "accordion-js/dist/accordion.min.css";

import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

import axios from 'axios';


document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".about-me-item");

    items.forEach(item => {
        const toggleContainer = item.querySelector(".toggle-container");
        const content = item.querySelector(".list-content");
        const icon = item.querySelector(".arrow-icon");

        toggleContainer.addEventListener("click", function () {
            content.classList.toggle("active");
            toggleContainer.classList.toggle("active");
        });
    });
});



document.addEventListener("DOMContentLoaded", function () {
    const wordList = document.querySelectorAll(".word-list .teach");
    const arrow = document.querySelector(".right-arrow-icon");

    arrow.addEventListener("click", function () {
        let texts = Array.from(wordList).map(el => el.textContent); // Отримуємо всі тексти
        texts.unshift(texts.pop()); // Переміщуємо останній елемент на перше місце

        wordList.forEach((el, index) => {
            el.style.opacity = "0"; // Плавне зникнення тексту

            setTimeout(() => {
                el.textContent = texts[index]; // Зміна тексту
                el.style.opacity = "1"; // Плавне повернення тексту
            }, 300); // Час зміни тексту (має співпадати з CSS)
        });
    });
});
