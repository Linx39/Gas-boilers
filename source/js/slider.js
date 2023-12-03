const SLIDER_WRAPPER_CLASS = `slider__wrapper`;
const SLIDER_LIST_CENTER_CLASS = `slider__list--center`;
const SLIDER_TOGGLE_CLASS = `slider__toggle`;
const SLIDER_TOGGLE_CURRENT_CLASS = `slider__toggle--current`;
const SLIDER_LIST_CLASS = `slider__list`;
const SLIDER_ITEM_CLASS = `slider__item`;
const SLIDER_ITEM_CURRENT_CLASS = `slider__item--current`;
const DESKTOP_WIDTH = 1300;

export const setSliderWidth = (slider) => {
  const mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_WIDTH}px)`)
  const sliderWrapperElement = slider.querySelector(`.${SLIDER_WRAPPER_CLASS}`);

  if(mediaQuery.matches) {
    sliderWrapperElement.style.width = `auto`;
  } else {
    sliderWrapperElement.style.width = document.documentElement.clientWidth + `px`;
  }
}

const changeSliderPosition = (slider, items, index) => {
  const listElement = slider.querySelector(`.${SLIDER_LIST_CLASS}`);
  const listScrollWidth = listElement.scrollWidth;
  const listClientWidth = listElement.clientWidth;
  const itemWidth = items[0].clientWidth;
  const itemGup = (listScrollWidth - items.length * itemWidth) / (items.length - 1);
  const itemWidthFull = itemWidth + itemGup;

  const sliderPosition = Math.max(-index * itemWidthFull, listClientWidth - listScrollWidth);

  listElement.style.transform = `translateX(${sliderPosition}px)`;
}

export const setSliderStyle = (slider) => {
  const mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_WIDTH}px)`)
  if(mediaQuery.matches) {
    if (listElement.classList.contains(SLIDER_LIST_CENTER_CLASS)) {
      listElement.classList.remove(SLIDER_LIST_CENTER_CLASS);
    }

    return;
  }

  const listElement = slider.querySelector(`.${SLIDER_LIST_CLASS}`);
  const listScrollWidth = listElement.scrollWidth;
  const listClientWidth = listElement.clientWidth;

  if (listClientWidth === listScrollWidth) {
    listElement.style.transform = `translateX(0)`;

    listElement.classList.add(SLIDER_LIST_CENTER_CLASS);
  }

  if (listClientWidth < listScrollWidth) {
    const items = slider.querySelectorAll(`.${SLIDER_ITEM_CLASS}`);
    const toggles = slider.querySelectorAll(`.${SLIDER_TOGGLE_CLASS}`);
    const toggleCurrent = slider.querySelector(`.${SLIDER_TOGGLE_CURRENT_CLASS}`);
    const indexCurrent = [...toggles].findIndex((item) => item === toggleCurrent);

    changeSliderPosition(slider, items, indexCurrent);

    if (listElement.classList.contains(SLIDER_LIST_CENTER_CLASS)) {
      listElement.classList.remove(SLIDER_LIST_CENTER_CLASS);
    }
  }
}

export const controlSlider = (slider, itemCurrentClass) => {
  const items = slider.querySelectorAll(`.${SLIDER_ITEM_CLASS}`);
  const toggles = slider.querySelectorAll(`.${SLIDER_TOGGLE_CLASS}`);

  const translateSlider = (evt) => {
    const toggleCurrent = slider.querySelector(`.${SLIDER_TOGGLE_CURRENT_CLASS}`);
    const itemCurrent = slider.querySelector(`.${SLIDER_ITEM_CURRENT_CLASS}`);

    const indexCurrent = [...toggles].findIndex((item) => item === toggleCurrent);
    const indexSelected = [...toggles].findIndex((item) => item === evt.target);

    if (indexCurrent === indexSelected) {
      return;
    }

    changeSliderPosition(slider, items, indexSelected);

    toggleCurrent.classList.remove(SLIDER_TOGGLE_CURRENT_CLASS);
    evt.target.classList.add(SLIDER_TOGGLE_CURRENT_CLASS);
    itemCurrent.classList.remove(itemCurrentClass);
    items[indexSelected].classList.add(itemCurrentClass);
    itemCurrent.classList.remove(SLIDER_ITEM_CURRENT_CLASS);
    items[indexSelected].classList.add(SLIDER_ITEM_CURRENT_CLASS);
  }

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', translateSlider);
  })
}
