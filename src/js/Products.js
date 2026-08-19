import { getItemsByQuery, getSortItemsByQuery } from "./API.js";

const productPlace = document.querySelector(".product-Items");
const loadMoreBtn = document.querySelector(".load-more-btn");
let selectedCategory = "";
let page = 1;
export let CURRENT_DESSERT_ID = null;

export function setCurrentDessertId(id) {
  CURRENT_DESSERT_ID = id;
}

function setLoadMoreState(isVisible) {
  if (!loadMoreBtn) return;

  loadMoreBtn.style.display = isVisible ? "flex" : "none";
  loadMoreBtn.disabled = !isVisible;
  if (isVisible) {
    loadMoreBtn.textContent = "Завантажити ще";
  }
}

function createProducts(items) {
  if (!productPlace || !Array.isArray(items)) return;

  const markup = items
    .map(({ _id, name, description, price, category, image }) => `
      <li class="li-item-product">
        <img class="li-item-img" src="${image}" alt="${name}">
        <p class="li-item-category">${category.name}</p>
        <h3 class="li-item-h">${name}</h3>
        <p class="li-item-p">${description}</p>
        <div class="li-item-by">
          <p class="product-price">${price} грн</p>
          <a class="dessert-link button-secondary" data-id="${_id}">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M11.05 2.90275L1.45425 12.5045C1.28042 12.6743 1.0805 12.7592 0.8545 12.7592C0.628666 12.7592 0.43075 12.6723 0.26075 12.4985C0.0869165 12.3245 0 12.1246 0 11.8988C0 11.6729 0.0869165 11.473 0.26075 11.299L9.8565 1.7035H1.4075C1.16317 1.7035 0.959166 1.62117 0.7955 1.4565C0.631833 1.292 0.55 1.08892 0.55 0.84725C0.55 0.60575 0.631833 0.404167 0.7955 0.2425C0.959166 0.0808336 1.16317 0 1.4075 0H11.9075C12.148 0 12.3501 0.0819171 12.5138 0.24575C12.6774 0.409417 12.7592 0.611417 12.7592 0.85175V11.3518C12.7592 11.5921 12.677 11.7941 12.5125 11.9578C12.348 12.1216 12.1449 12.2035 11.9033 12.2035C11.6576 12.2035 11.4539 12.1216 11.2923 11.9578C11.1308 11.7941 11.05 11.5921 11.05 11.3518V2.90275Z" fill="#080C0C" />
</svg>
          </a>
        </div>
      </li>
    `)
    .join("");

  productPlace.insertAdjacentHTML("beforeend", markup);
}

async function renderProducts(reset = false) {
  if (!productPlace) return;

  if (reset) {
    page = 1;
    productPlace.innerHTML = "";
  }

  if (loadMoreBtn) {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = "Завантаження...";
    loadMoreBtn.style.display = "flex";
  }

  try {
    const products = selectedCategory
      ? await getSortItemsByQuery(page, selectedCategory)
      : await getItemsByQuery(page);

    if (!Array.isArray(products) || products.length === 0) {
      setLoadMoreState(false);
      return;
    }

    createProducts(products);
    page += 1;

    if (products.length < 8 && products.length === 0) {
      setLoadMoreState(false);
      return;
    }

    if (products.length < 8) {
      setLoadMoreState(false);
      return;
    }

    setLoadMoreState(true);
  } catch (error) {
    console.error("Не вдалося завантажити товари:", error);
    if (productPlace) {
      productPlace.innerHTML = '<li>Не вдалося завантажити товари</li>';
    }
    setLoadMoreState(false);
  }
}

export function setSelectedCategory(categoryId) {
  selectedCategory = categoryId || "";
  renderProducts(true);
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => renderProducts(false));
}


function clearProducts() {
  if (productPlace) {
    productPlace.innerHTML = "";
  }
}
document.addEventListener("click", e => {
  const link = e.target.closest(".dessert-link");
  if (!link) return;

  e.preventDefault();
  setCurrentDessertId(link.dataset.id);
});

