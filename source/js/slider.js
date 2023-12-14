const SLIDER_WRAPPER_CLASS = `slider__wrapper`;
const SLIDER_CENTER_CLASS = `slider--center`;
const SLIDER_TOGGLE_CLASS = `slider__toggle`;
const SLIDER_TOGGLE_CURRENT_CLASS = `slider__toggle--current`;
const SLIDER_LIST_CLASS = `slider__list`;
const SLIDER_ITEM_CLASS = `slider__item`;
const SLIDER_ITEM_CURRENT_CLASS = `slider__item--current`;
const DESKTOP_WIDTH = 1280;

const setSliderWidth = (slider) => {
  const sliderWrapperElement = slider.querySelector(`.${SLIDER_WRAPPER_CLASS}`);
  const mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_WIDTH}px)`)

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

  const sliderPosition = Math.min(index * itemWidthFull, listScrollWidth - listClientWidth);

  listElement.style.transform = `translateX(${-sliderPosition}px)`;
}

const setSliderItemCurrentClass = (listElement, items, indexCurrent, itemCurrentClass) => {
  const itemCurrentElement = items[indexCurrent];

  // if (!itemCurrentElement) {
  //   return;
  // }

  const listScrollWidth = listElement.scrollWidth;
  const listClientWidth = listElement.clientWidth;

  if (listClientWidth < listScrollWidth) {
    itemCurrentElement.classList.add(itemCurrentClass);
  } else {
    itemCurrentElement.classList.remove(itemCurrentClass);
  }
}

const setSliderClass = (slider, itemCurrentClass) => {
  const listElement = slider.querySelector(`.${SLIDER_LIST_CLASS}`);

  const mediaQuery = window.matchMedia(`(min-width: ${DESKTOP_WIDTH}px)`)

  if(mediaQuery.matches) {
    listElement.style.transform = `translateX(0)`;

    if (slider.classList.contains(SLIDER_CENTER_CLASS)) {
      slider.classList.remove(SLIDER_CENTER_CLASS);
    }

    return;
  }

  const listScrollWidth = listElement.scrollWidth;
  const listClientWidth = listElement.clientWidth;

  if (listClientWidth === listScrollWidth) {
    listElement.style.transform = `translateX(0)`;
    slider.classList.add(SLIDER_CENTER_CLASS);
  }


  const items = slider.querySelectorAll(`.${SLIDER_ITEM_CLASS}`);
  const toggles = slider.querySelectorAll(`.${SLIDER_TOGGLE_CLASS}`);
  const toggleCurrent = slider.querySelector(`.${SLIDER_TOGGLE_CURRENT_CLASS}`);
  const indexCurrent = [...toggles].findIndex((item) => item === toggleCurrent);

  if (listClientWidth < listScrollWidth) {
    // const items = slider.querySelectorAll(`.${SLIDER_ITEM_CLASS}`);
    // const toggles = slider.querySelectorAll(`.${SLIDER_TOGGLE_CLASS}`);
    // const toggleCurrent = slider.querySelector(`.${SLIDER_TOGGLE_CURRENT_CLASS}`);
    // const indexCurrent = [...toggles].findIndex((item) => item === toggleCurrent);

    changeSliderPosition(slider, items, indexCurrent);

    if (slider.classList.contains(SLIDER_CENTER_CLASS)) {
      slider.classList.remove(SLIDER_CENTER_CLASS);
    }
  }

  setSliderItemCurrentClass(listElement, items, indexCurrent, itemCurrentClass);
}

const handleSliderTogglesClick = (slider, itemCurrentClass) => {
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
    itemCurrent.classList.remove(SLIDER_ITEM_CURRENT_CLASS);
    items[indexSelected].classList.add(SLIDER_ITEM_CURRENT_CLASS);
    itemCurrent.classList.remove(itemCurrentClass);
    items[indexSelected].classList.add(itemCurrentClass);
  }

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', translateSlider);
  })
}

export const controlSlider = (slider, itemCurrentClass) => {
  setSliderWidth(slider);
  setSliderClass(slider, itemCurrentClass);

  window.addEventListener('resize', () => {
      setSliderWidth(slider);
      setSliderClass(slider, itemCurrentClass);
  });

  handleSliderTogglesClick(slider, itemCurrentClass);
}
