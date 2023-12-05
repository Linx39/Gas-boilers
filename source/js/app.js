import {controlMainNavToogleClick} from './main-nav-toggle.js';
import {setConsultationFormSubmit, setConsultationDefault} from './consultation.js';
import {openModal, closeModal} from './modal.js';
import {setSliderWidth, setSliderStyle, controlSlider} from './slider.js';
import {loadMap, setMapViewCenter} from './map.js';

controlMainNavToogleClick();
setConsultationFormSubmit();

// Управление открытием/закрытием модального окна
const callButtons= document.querySelectorAll(['.app-button--call', '.app-button--staff']);
callButtons.forEach((button) =>  openModal(button));

closeModal(setConsultationDefault);

// Управление слайдером
const ITEM_BREND_CURRENT_CLASS = `brend-list__item--current`;
const ITEM_ACCESSORY_CURRENT_CLASS = `accessory-list__item--current`;

const brendSlider = document.querySelectorAll(`.catalog__brend`);
const accessorySlider = document.querySelector(`.sub-catalog`);

const sliders = [...brendSlider, accessorySlider];

sliders.forEach((slider) => {
  setSliderWidth(slider);
  setSliderStyle(slider);

  window.addEventListener('resize', () => {
      setSliderWidth(slider);
      setSliderStyle(slider);
  });
});

brendSlider.forEach((slider) => controlSlider(slider, ITEM_BREND_CURRENT_CLASS));
controlSlider(accessorySlider, ITEM_ACCESSORY_CURRENT_CLASS);


// Загрузка карты
const contactsAdressElements = document.querySelectorAll(`.contacts__item--adress`);

loadMap();

contactsAdressElements.forEach((adress) => {
  adress.addEventListener('click', setMapViewCenter);
})
