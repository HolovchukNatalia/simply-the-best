import{S as a,N as c,K as l,A as u,a as m}from"./assets/vendor-Dm1Ie815.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const d of t.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();document.getElementById("menu-btn").addEventListener("click",function(){document.querySelector(".header-nav").classList.toggle("visually-hidden"),document.querySelectorAll(".header-nav-list-item").forEach((o,r)=>{o.style.animationDelay=`${r*.2}s`,setTimeout(()=>{o.classList.add("visible")},r*200)}),document.addEventListener("click",function(o){o.target!==document.getElementById("menu-btn")&&document.querySelector(".header-nav").classList.add("visually-hidden")})});const f=document.getElementById("burger"),i=document.getElementById("mobile-menu"),v=document.getElementById("close-menu");f.addEventListener("click",()=>{i.classList.add("is-opened"),document.body.style.overflow="hidden"});v.addEventListener("click",()=>{i.classList.remove("is-opened"),document.body.style.overflow="auto"});document.querySelectorAll(".mobile-menu-list a").forEach(s=>{s.addEventListener("click",()=>{i.classList.remove("is-opened"),document.body.style.overflow="auto"})});document.querySelector(".mobile-order-btn").addEventListener("click",()=>{i.classList.remove("is-opened"),document.body.style.overflow="auto"});window.addEventListener("resize",()=>{window.innerWidth>=768&&i.classList.remove("is-opened")});document.addEventListener("DOMContentLoaded",()=>{new a(".swiper",{modules:[c,l,u],slidesPerView:1,spaceBetween:20,loop:!1,navigation:{prevEl:".swiper-button-prev",nextEl:".swiper-button-next"},keyboard:{enabled:!0,onlyInViewport:!0},grabCursor:!0,a11y:{enabled:!0,prevSlideMessage:"Попередній слайд",nextSlideMessage:"Наступний слайд",firstSlideMessage:"Це перший слайд",lastSlideMessage:"Це останній слайд"},on:{init:function(){this.navigation.update()},slideChange:function(){this.navigation.update()}}})});new m(".accordion-container",{triggerClass:"faq-trigger",showMultiple:!0});const g=document.querySelector(".covers-wrapper"),p=new IntersectionObserver(s=>{s.forEach(n=>{n.isIntersecting?n.target.classList.add("animation"):n.target.classList.remove("animation")})},{threshold:0});p.observe(g);
//# sourceMappingURL=index.js.map
