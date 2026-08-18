const divOfButtons = document.querySelector('coverOfInpits');

divOfButtons.addEventListener('click', event => {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }
  if (!event.target.classList.contains('active')) {
    if (document.querySelector('div.coverOfInputs button.activeBtn')) {
      document
        .querySelector('div.coverOfInputs button.activeBtn')
        .classList.remove('activeBtn');
      event.target.classList.add('activeBtn');
    }
  }
});
