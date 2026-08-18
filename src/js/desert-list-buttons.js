import axios from "axios";
import { setSelectedCategory } from "./Products.js";

const URL_CATEGORIES = 'https://deserts-store.b.goit.study/api/categories';

async function renderCategoryButtons() {
  const container = document.querySelector('.coverOfInputs');
  const select = document.querySelector('#categorySelect');

  if (!container || !select) return;

  let buttonsHTML = `
  <button class="button-secondary second-btn-class active activeBtn" data-id="">
      Всі десерти
  </button>`;
  let selectHTML = `
    <option value="">Всі десерти</option>
  `;

  try {
    const response = await axios.get(URL_CATEGORIES);
    response.data.forEach(({ _id, name }) => {
      buttonsHTML += `
        <button class="button-secondary second-btn-class" data-id="${_id}">
          ${name}
        </button>
      `;
      selectHTML += `
        <option value="${_id}">${name}</option>
      `;
    });

    container.innerHTML = buttonsHTML;
    select.innerHTML = selectHTML;
    selectCategory('');
  } catch (error) {
    console.error('Помилка завантаження категорій:', error);
  }
}

function selectCategory(id) {
  document.querySelectorAll('.second-btn-class').forEach(btn => {
    const isActive = btn.dataset.id === id;
    btn.classList.toggle('active', isActive);
    btn.classList.toggle('activeBtn', isActive);
  });

  const select = document.querySelector('#categorySelect');
  if (select) {
    select.value = id;
  }

  setSelectedCategory(id);
}

document.addEventListener('click', e => {
  const btn = e.target.closest('button[data-id]');
  if (!btn) return;

  selectCategory(btn.dataset.id);
});

const categorySelect = document.querySelector('#categorySelect');
if (categorySelect) {
  categorySelect.addEventListener('change', e => {
    selectCategory(e.target.value);
  });
}

const productActiveBtn = document.querySelector('.product-btn.active');



renderCategoryButtons();