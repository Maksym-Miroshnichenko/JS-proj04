import {
  addListenersToButton,
  createGallery,
  doListenersForStart,
  showLoadMoreButton,
} from './js/Products.js';
import {} from './js/Product-Modal.js';
import {} from './js/Contact-Modal.js';
import {} from './js/About-Us.js';
import {} from './js/Customer-Reviews.js';
import './js/FAQ.js';
import {} from './js/Navbar.js';
import { initContactForm } from './js/Contact-Modal.js';
import { getAndRenderButtons } from './js/Products.js';
import {
  addListenerToLoadMore,
  api,
  changePageQuantityNumber,
  pageQuantity,
} from './js/API.js';
initContactForm();

async function startElements() {
  getAndRenderButtons();
  doListenersForStart;
  addListenerToLoadMore();
  changePageQuantityNumber(1);
  //   addListenersToButton();
  api(pageQuantity).then(data => {
    createGallery(data);
    showLoadMoreButton();
  });
}

startElements();
//loader
