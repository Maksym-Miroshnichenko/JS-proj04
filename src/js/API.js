import axios from 'axios';
import { addListenersToButton } from './Products';

export let pageQuantity = 1;
export function changePageQuantityNumber(Number) {
  pageQuantity = Number;
}
export let perPageVariable = 8;
export async function api(pageGiven, categoryId) {
  if (!categoryId) {
    const infoDeserts = await axios({
      method: 'GET',
      url: 'https://deserts-store.b.goit.study/api/desserts',
      params: {
        page: pageGiven,
        limit: perPageVariable,
        type: 'popular',
      },
    });
    return infoDeserts.data;
  } else if (categoryId) {
    // return infoDeserts.data;

    const infoDesertsFiltered = await axios({
      method: 'GET',
      url: 'https://deserts-store.b.goit.study/api/desserts',
      params: {
        page: pageGiven,
        limit: perPageVariable,
        category: categoryId,
      },
    });
    return infoDesertsFiltered.data;
  }
  //   return infoDesertsFiltered.data;
}
//loader function (with css)
//2 api +1: api categories list, api deserts 8 elements, api  filtered deserts
//pagination load more

export async function addListenerToLoadMore() {
  const coverOfSelect = document.querySelector('div.coverOfSelect');
  coverOfSelect.addEventListener('click', async e => {
    if (
      e.target.classList.contains('dropdown__item') ||
      e.target.classList.contains('button-secondary spl-list-button')
    ) {
      try {
        showLoader();
        hideLoadMoreButton();

        const categoryId = e.target.dataset.id;
        if (!categoryId) {
          console.error('No category ID found on target element:', e.target);
          return;
        }

        const data = await api(pageQuantity, categoryId);
        if (pageQuantity > Math.ceil(data.totalItems / perPageVariable)) {
          alert('It is last page');
        } else {
          createGallery(data.deserts);
          changePageQuantityNumber(pageQuantity + 1);
        }
      } catch (error) {
        alert(error);
      } finally {
        hideLoader();
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const coverOfSelect = document.querySelector('div.coverOfSelect');
  coverOfSelect.addEventListener('click', event => {
    addListenersToButton(event);
  });
});
