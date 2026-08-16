import axios from "axios";


export let pageQuantity = 0;
export let perPageVariable = 8;
export async function api(endpointValue, categoryId, pageGiven) {
  switch (`${info.endpoint}_${info.category}`) {
    case `deserts_undefined`:
      const infoDeserts = await axios({
        method: 'GET',
        url: 'https://deserts-store.b.goit.study/api/desserts',
        params: {
          page: pageGiven,
          limit: perPageVariable,
        },
      });
      return infoDeserts.data;
    default:
      const infoDesertsFiltered = await axios({
        method: 'GET',
        url: 'https://deserts-store.b.goit.study/api/desserts',
        params: {
          page: pageGiven,
          limit: perPageVariable,
          category:
        },
      });
      return infoDesertsFiltered.data;
      break;
  }
}
//loader function (with css)
//2 api +1: api categories list, api deserts 8 elements, api  filtered deserts
//pagination load more












const coverOfSelect = document.querySelector('div.coverOfSelect');
const buttonsDiv = document.querySelector('.coverOfInputs');
const select = document.querySelector('.dropdown_list');
export async function getAndRenderButtons() {
  let selectLi = [];
  let buttonsArr = [];
  const infoCategories = await axios({
        method: 'GET',
        url: 'https://deserts-store.b.goit.study/api/categories',
      });
  infoCategories.data.map(({ _id, name }) => {
    selectLi.push(`<li data-id='${_id}' class="dropdown__item">${name}</li>`);
    buttonsArr.push(`<button data-id='${_id}' class="button-secondary spl-list-button" name="${name}">${name}</button>`);
  }); // array -> elem-> obj li/obj button
  buttonsDiv.insertAdjacentHTML("beforeend", buttonsArr.join(""));
    select.insertAdjacentHTML("beforeend", selectLi.join(''));
    
    //addEvListener
   
    
}

export function addListenersToButton() {
     coverOfSelect.addEventListener("click", (e) => {
        const 
        if (!e.target.classList.contains("dropdown__item") || !e.target.classList.contains("button-secondary spl-list-button")) {
            
            api('deserts', e.target,  ...)
        }
    }
}