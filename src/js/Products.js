function createGallery(arrayOfElementsObjects) {
  let resultOfFiltering = null;
  const elementsOfGalleryArray = resultOfFiltering.map(element => {
    return `<li class="spl-deserts-list-element">
      <div class="spl-deserts-list-element-imgDiv">
        <picture></picture>
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
}
