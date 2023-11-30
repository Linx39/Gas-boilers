export const recizeSliderWidth = (slider) => {
  const sliderWrapperElement = slider.querySelector(`.slider__wrapper`);
  const listElement = slider.querySelector('.slider__list');
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

export const changeSlider = (slider, className) => {
  const listElement = slider.querySelector('.slider__list');
  const listScrollWidth = listElement.scrollWidth;
  const listClientWidth = listElement.clientWidth;

  if (listClientWidth === listScrollWidth) {
    listElement.classList.add(className);
  }

  if (listClientWidth < listScrollWidth) {
    listElement.classList.remove(className);
  }
}

export const controlSlider = (slider, listItemCurrentClass) => {
  const togglesElement = slider.querySelector('.slider__toggles');
  const listElement = slider.querySelector('.slider__list');

  const toggles = togglesElement.querySelectorAll('.slider__toggle');
  const items = listElement.querySelectorAll('.slider__item');

  const toggleCurrentClass = `slider__toggle--current`;
  const itemCurrentClass = `slider__item--current`;

  const listScrollWidth = listElement.scrollWidth;
  const itemWidth = items[0].clientWidth;

  const translateSlider = (evt) => {
    const toggleCurrent = togglesElement.querySelector(`.${toggleCurrentClass}`);
    const itemCurrent = listElement.querySelector(`.${itemCurrentClass}`);

    const indexCurrent = [...toggles].findIndex((item) => item === toggleCurrent);
    const indexSelected = [...toggles].findIndex((item) => item === evt.target);

    if (indexCurrent === indexSelected) {
      return;
    }

    const listClientWidth = listElement.clientWidth;
    const listHiddenWidth = listScrollWidth - listClientWidth;

    const itemGup = (listScrollWidth - items.length * itemWidth) / (items.length - 1);
    const itemWidthFull = itemWidth + itemGup;
    const positionSelected = indexSelected * itemWidthFull;

    const positionTranslate = listHiddenWidth > positionSelected ? -positionSelected : -listHiddenWidth;

    listElement.style.transform = `translateX(${positionTranslate}px)`;

    toggleCurrent.classList.remove(toggleCurrentClass);
    evt.target.classList.add(toggleCurrentClass);

    itemCurrent.classList.remove(listItemCurrentClass);
    itemCurrent.classList.remove(itemCurrentClass);
    items[indexSelected].classList.add(itemCurrentClass);
    items[indexSelected].classList.add(listItemCurrentClass);
  }

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', translateSlider);
  })
}
