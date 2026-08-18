import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
import { setCurrentDessertId } from './Products.js';
import {initContactForm} from "./Contact-Modal.js"

async function getDessertById(id) {
  const response = await fetch(`https://deserts-store.b.goit.study/api/desserts/${id}`);

  if (!response.ok) {
    throw new Error('Не вдалося завантажити десерт');
  }

  return response.json();
}

async function openDessertModal(id) {
  try {
    const dessert = await getDessertById(id);

    const instance = basicLightbox.create(`
      <div class="caption-card">
        <button class="modal--close" aria-label="Закрити">✕</button>
        <img src="${dessert.image}" class="caption-img" alt="${dessert.name}" />

        <div class="caption-info">
          <h2 class="name-desert">${dessert.name}</h2>
          <p class="price">${dessert.price} грн</p>
          <div id="dessert-rating"></div>
          <p class="card-description">${dessert.description}</p>
          <p class="desert-composition"><strong class="word">Склад:</strong> ${dessert.composition}</p>
          <button class="button-primery modal--open open-modal-btn" type="button">Перейти до замовлення</button>
        </div>
      </div>
    `);

    instance.show();
    document.body.classList.add('modal-open');
instance.element().addEventListener('click', e => {
  if (e.target === instance.element()) {
    instance.close();
    document.body.classList.remove('modal-open');
  }
});





    

    const closeBtn = document.querySelector('.modal--close');
    const openEnotherModal = document.querySelector('.modal--open');
    const backdrop = document.querySelector(".backdrop");

    
    closeBtn.addEventListener('click', () => {
      instance.close();
      document.body.classList.remove("modal-open");
    });
    document.addEventListener("keydown", (event) =>{
  if(event.key === "Escape"){
    instance.close();
    document.body.classList.remove("modal-open");
  }
})
    openEnotherModal.addEventListener("click", () => {
      instance.close();                
      backdrop.classList.add("is-open"); 
    });

  } catch (error) {
    console.error('Не вдалося відкрити модалку десерту:', error);
  }
}

document.addEventListener('click', e => {
  const link = e.target.closest('.dessert-link');
  if (!link) return;

  e.preventDefault();

  const id = link.dataset.id;
  if (!id) return;

  setCurrentDessertId(id);
  openDessertModal(id);
});



