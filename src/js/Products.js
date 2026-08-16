import axios from 'axios';

export function createGallery(data) {
  const elementsOfGalleryArray = data.deserts.map(({ image }) => {
    return `<li class="spl-deserts-list-element">
      <div class="spl-deserts-list-element-imgDiv">
        <img href='${image}'>
      </div>
      <div class="spl-deserts-list-element-imgDiv">
        <p class="spl-deserts-list-element-categoryP"></p>
        <h3 class="spl-deserts-list-elementH"></h3>
        <p class="spl-deserts-list-elementDescriptions"></p>
        <button class="spl-desertItem-modalButton">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <use href="../img/section deserts-list/svg/arrow-outward.svg"></use>
          </svg>
        </button>
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
