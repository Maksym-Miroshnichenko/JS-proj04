
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
// import Raty from 'raty-js';



document.addEventListener("DOMContentLoaded", () => {
const container = document.querySelector('.products');

});


async function getDessertById(id) {
  const response = await fetch(`https://deserts-store.b.goit.study/api/desserts/${id}`);
  if (!response.ok) throw new Error("Помилка API");
  return await response.json();
}


function renderProductCard(arr) {
  return arr.map(product => `
    <li class="product-card">
      <a href="#" class="dessert-link" data-id="${product._id}">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p><strong>Ціна:</strong> ${product.price} грн</p>
      </a>
    </li>
  `).join('');
}


async function openDessertModal(id) {
  const dessert = await getDessertById(id);

  const instance = basicLightbox.create(`
    <div class="caption-card">
    <button class="modal-close">✕</button>
      <img src="${dessert.image}" class="caption-img" />

      <div class="caption-info">
        <h2 class="name-desert">${dessert.name}</h2>

        <p class="price">${dessert.price} грн</p>

        <div id="dessert-rating"></div>

        <p class="card-description">${dessert.description}</p>

        <p class="desert-composition"><strong class="word">Склад:</strong> ${dessert.composition}</p>

        <button class="button-primery">
          Перейти до замовлення
        </button>
      </div>
    </div>
  `);

  instance.show();
  document.body.classList.add('modal-open');


  setTimeout(() => {
    const ratingContainer = document.querySelector('#dessert-rating');
    const button = document.querySelector('.button-primery');
    const closeBtn = document.querySelector('.modal-close');

// const starContainers = container.querySelectorAll('.js-raty-stars');

// starContainers.forEach(el => {
//   const ratingScore = parseFloat(el.getAttribute('data-rate'));

//   const ratyInstance = new Raty(el, {
//     score: ratingScore,
//     readOnly: true,
//     half: true,
//     starType: 'i',
//   });

//   ratyInstance.init();
// });


//     const ratyInstance = new Raty(ratingContainer, {
//     score: dessert.rate,
//     readOnly: true,
//     half: true,
//     starType: 'i',
//     starOn: 'fa-solid fa-star',
//     starOff: 'fa-regular fa-star',
//     starHalf: 'fa-solid fa-star-half-stroke'
// });

//   ratyInstance.init();
    
    if (button) {
      button.addEventListener('click', () => {
        instance.close();
        instance.element().remove();
        document.body.classList.remove('modal-open');
        setTimeout(() => {
      openOrderFormModal();
    }, 10);
      });
    }
    if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      instance.close();
      document.body.classList.remove('modal-open');

    });
  }
  }, 0);
}

document.addEventListener('click', e => {
  const link = e.target.closest('.dessert-link');
  if (!link) return;

  const id = link.dataset.id;
  openDessertModal(id);
});


