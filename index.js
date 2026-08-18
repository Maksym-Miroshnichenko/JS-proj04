import{a as g,b as D,R as O,S as q,c as B,A as P}from"./assets/vendor-C1RtILQr.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();async function x(e){return(await g.get(`https://deserts-store.b.goit.study/api/desserts?page=${e}&limit=8`)).data.desserts}async function H(e,t){return(await g.get(`https://deserts-store.b.goit.study/api/desserts?page=${e}&limit=8&category=${t}`)).data.desserts}const l=document.querySelector(".product-Items"),i=document.querySelector(".load-more-btn");let h="",y=1;function d(e){i&&(i.style.display=e?"flex":"none",i.disabled=!e,e&&(i.textContent="Завантажити ще"))}function R(e){if(!l||!Array.isArray(e))return;const t=e.map(({_id:s,name:r,description:o,price:n,category:c,image:p})=>`
      <li class="li-item-product">
        <img class="li-item-img" src="${p}" alt="${r}">
        <p class="li-item-category">${c.name}</p>
        <h4 class="li-item-h">${r}</h4>
        <p class="li-item-p">${o}</p>
        <div class="li-item-by">
          <p class="product-price">${n} грн</p>
          <a class="dessert-link" data-id="${s}">
            <svg width="24" height="24">
              <use href="/img/symbol-defs.svg#icon-arrow_outward" width="24" height="24"></use>
            </svg>
          </a>
        </div>
      </li>
    `).join("");l.insertAdjacentHTML("beforeend",t)}async function S(e=!1){if(l){e&&(y=1,l.innerHTML=""),i&&(i.disabled=!0,i.textContent="Завантаження...",i.style.display="flex");try{const t=h?await H(y,h):await x(y);if(!Array.isArray(t)||t.length===0){d(!1);return}if(R(t),y+=1,t.length<8&&t.length===0){d(!1);return}if(t.length<8){d(!1);return}d(!0)}catch(t){console.error("Не вдалося завантажити товари:",t),l&&(l.innerHTML="<li>Не вдалося завантажити товари</li>"),d(!1)}}}function j(e){h=e||"",S(!0)}i&&i.addEventListener("click",()=>S(!1));S(!0);const A=document.querySelector("#logo-link"),L=document.querySelectorAll(".js-menu-set"),u=document.querySelector(".menu-burger-btn"),E=document.querySelector(".header-nav");function F(){L.forEach(e=>{e.classList.remove("current")}),document.activeElement&&document.activeElement.blur()}A&&A.addEventListener("click",e=>{window.scrollTo({top:0,behavior:"smooth"}),v()});L.forEach(e=>{e.addEventListener("click",t=>{if(e.classList.contains("disabled")){t.preventDefault();return}const s=e.getAttribute("href"),r=document.querySelector(s);r&&(t.preventDefault(),L.forEach(o=>{o.classList.remove("current")}),e.classList.add("current"),r.scrollIntoView({behavior:"smooth",block:"start"}),v())})});window.addEventListener("scroll",()=>{window.scrollY<=10&&F()});u.addEventListener("click",()=>{E.classList.contains("is-open")?v():N()});function N(){E.classList.add("is-open"),u.classList.add("is-open"),document.body.classList.add("menu-open"),u.setAttribute("aria-label","Close menu")}function v(){E.classList.remove("is-open"),u.classList.remove("is-open"),document.body.classList.remove("menu-open"),u.setAttribute("aria-label","Open menu")}document.addEventListener("keydown",e=>{e.key==="Escape"&&v()});const I=document.querySelector(".header-btn");I.addEventListener("click",e=>{if(e.preventDefault(),I.classList.contains("disabled")){e.preventDefault();return}const t=document.querySelector("#sweets");t&&(e.preventDefault(),t.scrollIntoView({behavior:"smooth",block:"start"}))});async function _(e){const t=await getDessertById(e),s=D.create(`
    <div class="caption-card">
    <button class="modal-close">✕</button>
      <img src="${t.image}" class="caption-img" />

      <div class="caption-info">
        <h2 class="name-desert">${t.name}</h2>

        <p class="price">${t.price} грн</p>

        <div id="dessert-rating"></div>

        <p class="card-description">${t.description}</p>

        <p class="desert-composition"><strong class="word">Склад:</strong> ${t.composition}</p>

        <button class="button-primery">
          Перейти до замовлення
        </button>
      </div>
    </div>
  `);s.show(),document.body.classList.add("modal-open"),setTimeout(()=>{const r=document.querySelector("#dessert-rating"),o=document.querySelector(".button-primery"),n=document.querySelector(".modal-close");new O(r,{score:t.rate,readOnly:!0,half:!0,starType:"i",starOn:"fa-solid fa-star",starOff:"fa-regular fa-star",starHalf:"fa-solid fa-star-half-stroke"}).init(),o&&o.addEventListener("click",()=>{s.close(),s.element().remove(),document.body.classList.remove("modal-open"),setTimeout(()=>{openOrderFormModal()},10)}),n&&n.addEventListener("click",()=>{s.close(),document.body.classList.remove("modal-open")})},0)}document.addEventListener("click",e=>{const t=e.target.closest(".dessert-link");if(!t)return;const s=t.dataset.id;_(s)});const V="https://deserts-store.b.goit.study/api/orders",U=null;function G(){const e={name:"",phone:"",message:""},t=document.querySelector(".contact-form"),s="data-contact-modal",r=localStorage.getItem(s);if(r){const a=JSON.parse(r);e.name=a.name||"",e.phone=a.phone||"",e.message=a.message||"",t.elements.name.value=e.name,t.elements.phone.value=e.phone,t.elements.message.value=e.message}t.addEventListener("input",a=>{const{name:f,value:b}=a.target;e[f]=b.trim(),localStorage.setItem(s,JSON.stringify(e))}),t.addEventListener("submit",async a=>{if(a.preventDefault(),e.name===""||e.phone===""){alert("Fill please all fields");return}const f={name:e.name,phone:e.phone,dessertId:U,comment:e.message};console.log(f);try{const b=await g.post(V,f);q.fire({position:"center",icon:"success",title:"Відправлено",showConfirmButton:!1,timer:1500}),localStorage.removeItem(s),e.name="",e.phone="",e.message="",t.reset(),t.querySelectorAll(".modal-input").forEach(C=>{C.classList.remove("is-touched")}),m()}catch{q.fire({icon:"error",title:"Oops...",text:"Спробуйте ще раз"})}}),document.querySelectorAll(".modal-input").forEach(a=>{a.addEventListener("blur",()=>{a.classList.add("is-touched")}),a.addEventListener("input",()=>{a.validity.valid&&a.classList.remove("is-touched")})});const n=document.querySelector(".backdrop"),c=document.querySelector(".close-btn"),p=document.querySelector(".modal-contact-form");c.addEventListener("click",m),p.addEventListener("click",a=>{a.target===p&&m()}),document.addEventListener("keydown",a=>{a.key==="Escape"&&m()});function m(){n.classList.remove("is-open"),document.body.classList.remove("modal-open")}}new B(".about-swiper",{enabled:!1,slidesPerView:2,spaceBetween:24,breakpoints:{768:{enabled:!0,slidesPerView:2,spaceBetween:24}},navigation:{prevEl:".about-swiper-btn-prev",nextEl:".about-swiper-btn-next"},pagination:{el:".about-swiper-pagination",clickable:!0}});const J="https://deserts-store.b.goit.study/api/feedbacks?limit=10&page=1";let $=null;function K(){$||($=new B(".feedback-swiper",{slidesPerView:1,spaceBetween:20,grabCursor:!0,observer:!0,observeParents:!0,navigation:{prevEl:".swiper-btn-prev",nextEl:".swiper-btn-next"},pagination:{el:".feedback-pagination",clickable:!0},breakpoints:{768:{slidesPerView:3,spaceBetween:24},1440:{slidesPerView:3,spaceBetween:24}}}))}async function w(){const e=document.getElementById("feedback-container");if(!e){setTimeout(w,1e3);return}try{const t=await fetch(J);if(!t.ok)throw new Error("Помилка сервера");const s=await t.json(),r=Array.isArray(s)?s:s.feedbacks||s.results||[];if(r.length===0){e.innerHTML='<div class="swiper-slide">Відгуків поки немає...</div>';return}Q(r,e)}catch(t){console.error("Помилка при завантаженні API:",t),e.innerHTML='<div class="swiper-slide">Не вдалося завантажити відгуки...</div>'}}function Q(e,t){t.innerHTML="",e.forEach(r=>{const n=`
      <div class="swiper-slide">
        <div class="feedback-card">
          <div class="card-top-content">
            <div class="js-raty-stars" data-rate="${r.rate||5}"></div>
            <p class="feedback-text">${r.description||"Чудовий десерт!"}</p>
          </div>
          <p class="feedback-user">${r.author||"Анонімний клієнт"}</p>
        </div>
      </div>
    `;t.insertAdjacentHTML("beforeend",n)}),t.querySelectorAll(".js-raty-stars").forEach(r=>{const o=parseFloat(r.getAttribute("data-rate"));new O(r,{score:o,readOnly:!0,half:!0,starType:"i"}).init()}),K()}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",w):w();const Y="https://deserts-store.b.goit.study/api/categories";async function z(){const e=document.querySelector(".coverOfInputs"),t=document.querySelector("#categorySelect");if(!e||!t)return;let s=`
  <button class="button-secondary second-btn-class active activeBtn" data-id="">
      Всі десерти
  </button>`,r=`
    <option value="">Всі десерти</option>
  `;try{(await g.get(Y)).data.forEach(({_id:n,name:c})=>{s+=`
        <button class="button-secondary second-btn-class" data-id="${n}">
          ${c}
        </button>
      `,r+=`
        <option value="${n}">${c}</option>
      `}),e.innerHTML=s,t.innerHTML=r,k("")}catch(o){console.error("Помилка завантаження категорій:",o)}}function k(e){document.querySelectorAll(".second-btn-class").forEach(s=>{const r=s.dataset.id===e;s.classList.toggle("active",r),s.classList.toggle("activeBtn",r)});const t=document.querySelector("#categorySelect");t&&(t.value=e),j(e)}document.addEventListener("click",e=>{const t=e.target.closest("button[data-id]");t&&k(t.dataset.id)});const M=document.querySelector("#categorySelect");M&&M.addEventListener("change",e=>{k(e.target.value)});document.querySelector(".product-btn.active");z();const T=document.querySelector(".js-faq-accordion");T&&new P(T,{duration:300,collapse:!0,showMultiple:!1});G();
//# sourceMappingURL=index.js.map
