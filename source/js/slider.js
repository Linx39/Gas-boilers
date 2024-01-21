import {changeElementCurrent} from "./utils.js";

const SLIDER_NOJS_CLASS = `slider--nojs`;
const SLIDER_WRAPPER_CLASS = `slider__wrapper`;
const SLIDER_CENTER_CLASS = `slider--center`;
const SLIDER_TOGGLE_CLASS = `slider__toggle`;
const SLIDER_TOGGLE_CURRENT_CLASS = `slider__toggle--current`;
const SLIDER_LIST_CLASS = `slider__list`;
const SLIDER_ITEM_CLASS = `slider__item`;
const SLIDER_ITEM_CURRENT_CLASS = `slider__item--current`;
const DESKTOP_WIDTH = 1320;
const DESKTOP_CONTENT = 1280;

const changeSliderPosition = (listElement, items, index) => {
  const itemWidth = items[0].clientWidth;
  const itemGup = (listElement.scrollWidth - items.length * itemWidth) / (items.length - 1);
  const itemWidthFull = itemWidth + itemGup;

  const sliderPosition = Math.min(index * itemWidthFull, listElement.scrollWidth - listElement.clientWidth);

  listElement.style.transform = `translateX(${-sliderPosition}px)`;
}

const setSliderProperties = ({slider, sliderWrapperElement, listElement, items, toggles, itemCurrentClass}) => {
  const mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_WIDTH}px)`)

  if(mediaQuery.matches) {
    sliderWrapperElement.style.width = `${DESKTOP_CONTENT}px`;
    listElement.style.transform = `translateX(0)`;

    if (slider.classList.contains(SLIDER_CENTER_CLASS)) {
      slider.classList.remove(SLIDER_CENTER_CLASS);
    }

    return;
  }

  sliderWrapperElement.style.width = document.documentElement.clientWidth + `px`;

  const toggleCurrent = slider.querySelector(`.${SLIDER_TOGGLE_CURRENT_CLASS}`);
  const indexCurrent = [...toggles].findIndex((item) => item === toggleCurrent);

  if (listElement.clientWidth === listElement.scrollWidth) {
    listElement.style.transform = `translateX(0)`;
    slider.classList.add(SLIDER_CENTER_CLASS);
    items[indexCurrent].classList.remove(itemCurrentClass);

    return;
  }

  changeSliderPosition(listElement, items, indexCurrent);

  if (slider.classList.contains(SLIDER_CENTER_CLASS)) {
    slider.classList.remove(SLIDER_CENTER_CLASS);
  }

  items[indexCurrent].classList.add(itemCurrentClass);
}


const handleSliderElementsClick = ({slider, listElement, items, toggles, itemCurrentClass}) => {
  const translateSlider = (evt) => {
    const toggleCurrent = slider.querySelector(`.${SLIDER_TOGGLE_CURRENT_CLASS}`);
    const itemCurrent = slider.querySelector(`.${SLIDER_ITEM_CURRENT_CLASS}`);
    const indexCurrent = [...toggles].findIndex((item) => item === toggleCurrent);
    const indexSelected = [...toggles].findIndex((item) => item === evt.target);

    if (indexCurrent === indexSelected) {
      return;
    }

    changeSliderPosition(listElement, items, indexSelected);

    changeElementCurrent(toggleCurrent, toggles[indexSelected], SLIDER_TOGGLE_CURRENT_CLASS);
    changeElementCurrent(itemCurrent, items[indexSelected], SLIDER_ITEM_CURRENT_CLASS);
    changeElementCurrent(itemCurrent, items[indexSelected], itemCurrentClass);
  }

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', translateSlider);
  })
}

export const controlSlider = (slider, itemCurrentClass) => {
  const sliderWrapperElement = slider.querySelector(`.${SLIDER_WRAPPER_CLASS}`);
  const listElement = slider.querySelector(`.${SLIDER_LIST_CLASS}`);
  const items = slider.querySelectorAll(`.${SLIDER_ITEM_CLASS}`);
  const toggles = slider.querySelectorAll(`.${SLIDER_TOGGLE_CLASS}`);

  slider.classList.remove(SLIDER_NOJS_CLASS);
  listElement.style.width = `auto`;

  const sliderObject = {slider, sliderWrapperElement, listElement, items, toggles, itemCurrentClass};

  setSliderProperties(sliderObject);

  window.addEventListener('resize', () => {
      setSliderProperties(sliderObject);
  });

  handleSliderElementsClick(sliderObject);
}
