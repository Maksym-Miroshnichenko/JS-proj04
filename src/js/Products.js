import { getItemsByQuery, getSortItemsByQuery } from "./API.js";

const productPlace = document.querySelector(".product-Items");
const loadMoreBtn = document.querySelector(".load-more-btn");
let selectedCategory = "";
let page = 1;

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
        <h4 class="li-item-h">${name}</h4>
        <p class="li-item-p">${description}</p>
        <div class="li-item-by">
          <p class="product-price">${price} грн</p>
          <a class="dessert-link" data-id="${_id}">
            <svg width="24" height="24">
              <use href="/img/symbol-defs.svg#icon-arrow_outward" width="24" height="24"></use>
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

renderProducts(true);

function clearProducts() {
  if (productPlace) {
    productPlace.innerHTML = "";
  }
}
