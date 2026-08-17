import {} from "./API.js"
import { getItemsByQuery, getSortItemsByQuery } from "./API"

const productPlace = document.querySelector(".product-Items");
let page = 0;

function createProducts(i) {
  const markup = i.map(({_id, name, description, price, category, image}) => `
  <li class="li-item-product">
    <img class="li-item-img" src="${image}" alt="">
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
  `).join("");
  productPlace.insertAdjacentHTML("beforeend", markup)
};

function clearProducts(){
  productPlace.innerHTML = '';
}

function pageStatus(){
  let page = 0 + 1;
  return page
}



// console.log(createProducts(1));
// createProducts(getItemsByQuery(page))


// getItemsByQuery()




const test = [{
      _id: "6852a9fcb459460cb6b47720",
      name: "Тірамісу Класик",
      description: "Багатошаровий італійський десерт з кавовим смаком і ніжним сиром маскарпоне.",
      price: 130,
      category: {
        "name": "Італійські десерти"
      },
      image: "https://ftp.goit.study/img/deserts/6852a9fcb459460cb6b47720.png"
    }]
  
createProducts(test)

// test clear
// setTimeout(() => {clearProducts();console.log("ok");}, 2000);