import {recizeSliderWidth, changeSliderStyle, controlSlider} from './slider.js';

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


// Управление слайдером
const brendSlider = document.querySelectorAll(`.catalog__brend`);
const itemBrendCurrentClass = `brend-list__item--current`;

const accessorySlider = document.querySelector(`.sub-catalog`);
const itemAccessoryCurrentClass = `accessory-list__item--current`;

const sliders = [...brendSlider, accessorySlider];

brendSlider.forEach((slider) => controlSlider(slider, itemBrendCurrentClass));
controlSlider(accessorySlider, itemAccessoryCurrentClass);

sliders.forEach((slider) => {
  changeSliderStyle(slider);

  window.addEventListener('resize', () => changeSliderStyle(slider));
})

// recizeSliderWidth(accessorySlider);
// window.addEventListener('resize', () => {
//     recizeSliderWidth(accessorySlider);
// })
