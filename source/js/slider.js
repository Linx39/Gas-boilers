const SLIDER_WRAPPER_CLASS = `slider__wrapper`;
const SLIDER_LIST_CENTER_CLASS = `slider__list--center`;
const SLIDER_TOGGLE_CLASS = `slider__toggle`;
const SLIDER_TOGGLE_CURRENT_CLASS = `slider__toggle--current`;
const SLIDER_LIST_CLASS = `slider__list`;
const SLIDER_ITEM_CLASS = `slider__item`;
const SLIDER_ITEM_CURRENT_CLASS = `slider__item--current`;


export const recizeSliderWidth = (slider) => {
  const sliderWrapperElement = slider.querySelector(`.${SLIDER_WRAPPER_CLASS}`);
  const listElement = slider.querySelector(`.${SLIDER_LIST_CLASS}`);
  const listScrollWidth = listElement.scrollWidth;

  // const windowsWidth = window.innerWidth;
  const documentWidth = document.documentElement.clientWidth;
  // const scrollbarWidth = windowsWidth - documentWidth;

  if (listScrollWidth > documentWidth) {
    sliderWrapperElement.style.width = documentWidth + `px`;
  }

  // window.addEventListener('resize', () => {
  //   if (listScrollWidth > documentWidth) {
  //     sliderWrapperElement.style.width = documentWidth + `px`;
  //   }
  // })
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

export const changeSliderStyle = (slider) => {
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

    listElement.classList.remove(SLIDER_LIST_CENTER_CLASS);
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
