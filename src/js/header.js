import Accordion from "accordion-js";
import "accordion-js/dist/accordion.min.css";

import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

import axios from 'axios';

document.getElementById('menu-btn').addEventListener('click', function() {
  const nav = document.querySelector('.header-nav');
  nav.classList.toggle('visually-hidden');
  const navListItems = document.querySelectorAll('.header-nav-list-item');
  navListItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
    setTimeout(() => {
      item.classList.add('visible');
    }, index * 200);
  });
    document.addEventListener('click', function (event) {
    if (event.target !== document.getElementById('menu-btn')) {
document.querySelector('.header-nav').classList.add('visually-hidden');
    }
});
});


const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');

burger.addEventListener('click', () => {
mobileMenu.classList.add('is-opened');
document.body.style.overflow = 'hidden';
});


closeMenu.addEventListener('click', () => {
mobileMenu.classList.remove('is-opened');
    document.body.style.overflow = 'auto';
    
});

document.querySelectorAll('.mobile-menu-list a').forEach(link => {
link.addEventListener('click', () => {
mobileMenu.classList.remove('is-opened');
document.body.style.overflow = 'auto';
});
});

document.querySelector('.mobile-order-btn').addEventListener('click', () => {
    mobileMenu.classList.remove('is-opened');
    document.body.style.overflow = 'auto';
});

window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
        mobileMenu.classList.remove('is-opened');
    }
});


    