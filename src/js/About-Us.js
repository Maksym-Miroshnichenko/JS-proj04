import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

const swiper = new Swiper('.about-swiper', {
    enabled: false,
    //loop: true,
 slidesPerView: 2,
    spaceBetween: 24,
    breakpoints: {
        768: {
            enabled: true,
            slidesPerView: 2,
            spaceBetween: 24,
        },
    },
    navigation: {
    prevEl: '.about-swiper-btn-prev',
  nextEl: '.about-swiper-btn-next',
  
},
pagination: {
  el: '.about-swiper-pagination',
    clickable: true,
},   
});