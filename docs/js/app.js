import {handleMainNavToogleClick} from './main-nav-toggle.js';
import {controlSlider} from './slider.js';
import {loadMap, setMapViewCenter} from './map.js';
import {controlModal} from './modal.js';
import {setConsultationFormSubmit, checkConsultationField, setConsultationFormDefault} from './consultation.js';
import {getSlider } from './utils.js';

// Управление кнопкой меню
handleMainNavToogleClick();


// Управление слайдером
const ITEM_BREND_CURRENT_CLASS = `brend-list__item--current`;
const ITEM_ACCESSORY_CURRENT_CLASS = `accessory-list__item--current`;

const brendSliderElements = document.querySelectorAll(`.catalog__brend`);
const accessorySliderElement = document.querySelector(`.sub-catalog__accessory`);

const brendSliders = [...brendSliderElements].map((element) => getSlider(element, ITEM_BREND_CURRENT_CLASS));
const accessorySlider = getSlider(accessorySliderElement, ITEM_ACCESSORY_CURRENT_CLASS);
const sliders = [...brendSliders, accessorySlider];

sliders.forEach(({slider, itemCurrentClass}) => controlSlider(slider, itemCurrentClass));


// Загрузка карты
const pageFooterMap = document.querySelector(`.page-footer__map`);
const contactsAdressElements = document.querySelectorAll(`.contacts__item--adress`);

pageFooterMap.classList.remove(`page-footer__map--nojs`);
loadMap();

contactsAdressElements.forEach((adress) => {
  adress.addEventListener('click', setMapViewCenter);
})


// Управление открытием/закрытием модального окна
const callButtons= document.querySelectorAll(['.app-button--call', '.app-button--staff']);

controlModal(callButtons, setConsultationFormDefault);


// Управление формой
checkConsultationField();
setConsultationFormSubmit();
