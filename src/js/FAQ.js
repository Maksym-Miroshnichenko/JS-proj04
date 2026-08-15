import Accordion from 'accordion-js';

const faqAccordion = document.querySelector('.js-faq-accordion');

if (faqAccordion) {
  new Accordion(faqAccordion, {
    duration: 300,
    collapse: true,
    showMultiple: false,
  });
}
