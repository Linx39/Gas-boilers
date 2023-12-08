import {handleMainNavToogleClick} from './main-nav-toggle.js';
import {controlSlider} from './slider.js';
import {loadMap, setMapViewCenter} from './map.js';
import {openModal, closeModal} from './modal.js';
import {setConsultationFormSubmit, checkConsultationField, setConsultationFormDefault} from './consultation.js';
import {getSlider } from './utils.js';

// Управление кнопкой меню
handleMainNavToogleClick();


// Управление слайдером
const ITEM_BREND_CURRENT_CLASS = `brend-list__item--current`;
const ITEM_ACCESSORY_CURRENT_CLASS = `accessory-list__item--current`;

const brendSliderElements = document.querySelectorAll(`.catalog__brend`);
const accessorySliderElement = document.querySelector(`.sub-catalog`);

const brendSliders = [...brendSliderElements].map((element) => getSlider(element, ITEM_BREND_CURRENT_CLASS));
const accessorySlider = getSlider(accessorySliderElement, ITEM_ACCESSORY_CURRENT_CLASS);
const sliders = [...brendSliders, accessorySlider];

sliders.forEach((slider) => {
  const {sliderElement, itemCurrentClass} = slider;

  controlSlider(sliderElement, itemCurrentClass);
});


// Загрузка карты
const contactsAdressElements = document.querySelectorAll(`.contacts__item--adress`);

loadMap();

contactsAdressElements.forEach((adress) => {
  adress.addEventListener('click', setMapViewCenter);
})


// Управление открытием/закрытием модального окна
const callButtons= document.querySelectorAll(['.app-button--call', '.app-button--staff']);
callButtons.forEach((button) =>  openModal(button));

closeModal(setConsultationFormDefault);


// Управление формой
checkConsultationField();
setConsultationFormSubmit();
