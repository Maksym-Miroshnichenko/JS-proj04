import axios from 'axios';
import Swal from 'sweetalert2';
import {
  api,
  changePageQuantityNumber,
  pageQuantity,
  perPageVariable,
} from './API';
export function createGalleryWithClear(data) {
  const elementsOfGalleryArray = data.desserts.map(element => {
    return `<li class="spl-deserts-list-element">
      <div class="spl-deserts-list-element-imgDiv">
        <img class="img-element" src="${element.image}" alt="${element.name}">
      </div>
      <div class="spl-deserts-list-element-content">
        <p class="spl-deserts-list-element-categoryP">${element.category.name}</p>
        <h3 class="spl-deserts-list-elementH">${element.name}</h3>
        <p class="spl-deserts-list-elementDescriptions">${element.description}</p>
        
        <!-- Новий блок для ціни та кнопки, щоб вони були в один ряд -->
        <div class="spl-deserts-list-element-bottom">
          <span class="spl-deserts-price">${element.price} грн</span>
          <button class="spl-desertItem-modalButton">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <use href="../img/section deserts-list/svg/arrow-outward.svg"></use>
            </svg>
          </button>
        </div>
      </div>
    </li>`;
  });
  document.querySelector('.spl-deserts-list').innerHTML =
    elementsOfGalleryArray.join(' ');
}
export function createGallery(data) {
  const elementsOfGalleryArray = data.desserts.map(element => {
    return `<li class="spl-deserts-list-element">
      <div class="spl-deserts-list-element-imgDiv">
        <img class="img-element" src="${element.image}" alt="${element.name}">
      </div>
      <div class="spl-deserts-list-element-content">
        <p class="spl-deserts-list-element-categoryP">${element.category.name}</p>
        <h3 class="spl-deserts-list-elementH">${element.name}</h3>
        <p class="spl-deserts-list-elementDescriptions">${element.description}</p>
        
        <!-- Новий блок для ціни та кнопки, щоб вони були в один ряд -->
        <div class="spl-deserts-list-element-bottom">
          <span class="spl-deserts-price">${element.price} грн</span>
          <button class="spl-desertItem-modalButton">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <use href="../img/section deserts-list/svg/arrow-outward.svg"></use>
            </svg>
          </button>
        </div>
      </div>
    </li>`;
  });
  document
    .querySelector('.spl-deserts-list')
    .insertAdjacentHTML('beforeend', elementsOfGalleryArray.join(' '));
}

//
const dropdown = document.querySelector('.dropdown');
const toggle = dropdown.querySelector('.dropdown__toggle');
const label = dropdown.querySelector('.dropdown__label');
const items = dropdown.querySelectorAll('.dropdown__item'); // открыть/закрыть по клику на кнопку

toggle.addEventListener('click', () => {
  dropdown.classList.toggle('open');
});

items.forEach(item => {
  item.addEventListener('click', () => {
    label.textContent = item.textContent;
    dropdown.classList.remove('open');
  });
});

document.addEventListener('click', e => {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove('open');
  }
});
//

// sensivity with click on button to send api filtered deserts
// unfocus - close

//write main my code for main.js

const coverOfSelect = document.querySelector('div.coverOfSelect');
const buttonsDiv = document.querySelector('.coverOfInputs');
const select = document.querySelector('.dropdown__list');
export async function getAndRenderButtons() {
  let selectLi = [`<li class="dropdown__item">Усі десерти</li>`];
  let buttonsArr = [
    `<button class="button-secondary spl-list-button">Усі десерти</button>`,
  ];
  const infoCategories = await axios({
    method: 'GET',
    url: 'https://deserts-store.b.goit.study/api/categories',
  });
  infoCategories.data.map(({ _id, name }) => {
    selectLi.push(`<li data-id='${_id}' class="dropdown__item">${name}</li>`);
    buttonsArr.push(
      `<button data-id='${_id}' class="button-secondary spl-list-button" name="${name}">${name}</button>`
    );
  }); // array -> elem-> obj li/obj button
  buttonsDiv.insertAdjacentHTML('beforeend', buttonsArr.join(''));
  select.insertAdjacentHTML('beforeend', selectLi.join(''));

  //addEvListener
}

export function showLoader() {
  // document
  //   .querySelector('form')
  //   .insertAdjacentHTML('afterend', '<span class="loader"></span>');
  const span = document.querySelector('span.loader');
  if (!span) {
    let spanCrEl = "<span class='loader showLoader'></span>";
    document
      .querySelector('ul.spl-deserts-list')
      .insertAdjacentHTML('beforebegin', spanCrEl);
  } else if (span) {
    span.classList.add('showLoader');
  }
}
export function hideLoader() {
  // document.querySelector('form').insertAdjacentHTML('afterend', '');
  const span = document.querySelector('span.loader');
  if (span && span.classList.contains('showLoader')) {
    span.classList.remove('showLoader');
  }
}

export let currentCategory = null;
export let previousCategory = null;
export async function addListenersToButton(event) {
  event.preventDefault();
  if (
    currentCategory === !previousCategory ||
    (currentCategory === null && previousCategory === null)
  ) {
    currentCategory = event.target.dataset.id;
    previousCategory = currentCategory;
    changePageQuantityNumber(1);
  } else if (
    currentCategory === previousCategory ||
    (currentCategory && pageQuantity === 1)
  ) {
    try {
      if (
        event.target.classList.contains('dropdown__item') ||
        event.target.classList.contains('spl-list-button')
      ) {
        showLoader();
        hideLoadMoreButton();
        const data = await api(pageQuantity, event.target.dataset.id);
        if (pageQuantity === Math.ceil(data.totalItems / perPageVariable)) {
          Swal.fire('That was last page of these desserts');
        } else {
          createGalleryWithClear(data);
          hideLoader();
          showLoadMoreButton();
        }
      }
    } catch (error) {
      alert(error);
    } finally {
      hideLoader();
    }
  }
}

export function showLoadMoreButton() {
  const buttonLoadMore = document.querySelector('.spl-button-load-more');
  if (
    buttonLoadMore &&
    !buttonLoadMore.classList.contains('showLoadMoreButton')
  ) {
    buttonLoadMore.classList.add('showLoadMoreButton');
    //додати клас на лоадмор
  }
}

export function hideLoadMoreButton() {
  const buttonLoadMore = document.querySelector('.spl-button-load-more');
  if (
    buttonLoadMore &&
    buttonLoadMore.classList.contains('showLoadMoreButton')
  ) {
    buttonLoadMore.classList.remove('showLoadMoreButton');
  }
}

const loadMore = document.querySelector('.spl-button-load-more');
loadMore.addEventListener('click', event => {
  async function getMoreImgByButton() {
    // hideLoadMoreButton();
    //перевірка за останніми результатами попереднього запиту.
    // changePerPageQuantity(pageQuantity + 1);
    try {
      showLoader();
      hideLoadMoreButton();
      changePageQuantityNumber(pageQuantity + 1);
      const info = await api(pageQuantity, event.target.dataset.id || false);
      if (pageQuantity > Math.ceil(info.totalHits / perPageVariable)) {
        alert('It is last page');
      } else {
        createGallery(info);
        if (pageQuantity > 1) {
          showLoadMoreButton();
        }
        hideLoader();
      }
    } catch (error) {
      alert(error);
    } finally {
      hideLoader();
    }
  }
  getMoreImgByButton();
});
