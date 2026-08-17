import axios from "axios"
const URL_CATEGORIES = 'https://deserts-store.b.goit.study/api/categories'

async function renderCategoryButtons() {
  const container = document.querySelector('.coverOfInputs')
  const select = document.querySelector('#categorySelect');

  let buttonsHTML = `<button class="button-secondary second-btn-class " data-id="">
      Всі десерти
    </button>`;
    let selectHTML = `
    <option value="">Всі десерти</option>
  `;

    try{
      const response = await axios.get(URL_CATEGORIES);
      response.data.forEach(({ _id, name}) => {
      buttonsHTML += `
        <button class="button-secondary second-btn-class" data-id="${_id}">
          ${name}
        </button>
      `;
      selectHTML += `
        <option value="${_id}">${name}</option>
      `;
      })
      container.innerHTML = buttonsHTML;
      select.innerHTML = selectHTML;
      } catch (error) {
    console.error('Помилка завантаження категорій:', error);
  }
    }

    function selectCategory(id) {
  document.querySelectorAll('button[data-id]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.id === id);
  });

  const select = document.querySelector('#categorySelect');
  select.value = id;

  console.log("Обрана категорія:", id);
}

document.addEventListener('click', e => {
  const btn = e.target.closest('button[data-id]');
  if (!btn) return;

 selectCategory(btn.dataset.id);
});

document.querySelector('#categorySelect').addEventListener('change', e => {
  selectCategory(e.target.value);
});



renderCategoryButtons()