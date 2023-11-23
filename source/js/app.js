const mainNav = document.querySelector('.main-nav');
const mainNavToggle = document.querySelector('.main-nav__toggle');

mainNav.classList.remove('main-nav--nojs');

mainNavToggle.addEventListener('click', () =>
  {if (mainNav.classList.contains('main-nav--closed')) {
      mainNav.classList.remove('main-nav--closed');
      mainNav.classList.add('main-nav--opened');
    } else {
      mainNav.classList.add('main-nav--closed');
      mainNav.classList.remove('main-nav--opened');
    }
  }
);

const consultation = document.querySelector('.consultation');
const consultationContent = document.querySelector('.consultation__content');
const consultationAnswer = document.querySelector('.consultation__answer');
const consultationButton = document.querySelector('.consultation__button');

consultationButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (consultation.classList.contains('consultation--content-opened')) {
    consultation.classList.remove('consultation--content-opened');
    consultation.classList.add('consultation--answer-opened');
  }
});


const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.modal__button');

modalButton.addEventListener('click', () => {
  if (modal.classList.contains('modal--closed')) {
    modal.classList.remove('modal--closed');
    modal.classList.add('modal--opened');
  } else {
    modal.classList.add('modal--closed');
    modal.classList.remove('modal--opened');
  }

  if (consultation.classList.contains('consultation--answer-opened')) {
    consultation.classList.remove('consultation--answer-opened');
    // consultation.classList.add('consultation--content-opened');
  }
});

const callButtons= document.querySelectorAll(['.app-button--call', '.app-button--staff']);

callButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modal.classList.remove('modal--closed');
    modal.classList.add('modal--opened');
  });
})

const catalogItem1 = document.querySelector('#catalog-item-1');
const catalogBrendList = catalogItem1.querySelector('.catalog__brend-list');
const sliderToggleArray = catalogItem1.querySelectorAll('.slider__toggle');

const transformSlide = (evt) => {
  const sliderToggleCurrent = catalogItem1.querySelector('.slider__toggle--current');
  const indexCurrent = Array.from(sliderToggleArray).findIndex((item) => item === sliderToggleCurrent);
console.log (indexCurrent);
}

sliderToggleArray.forEach((toggle) => {
  toggle.addEventListener('click', transformSlide);
})
