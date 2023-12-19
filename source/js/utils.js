export const changeElementCurrent = (itemCurrentPrev, itemCurrentNext, itemCurrentClass) => {
  itemCurrentPrev.classList.remove(itemCurrentClass);
  itemCurrentNext.classList.add(itemCurrentClass);
}

export const getSlider = (sliderElement, itemCurrentClassName) => {
  return {
    slider: sliderElement,
    itemCurrentClass: itemCurrentClassName,
  };
}

export const isEscEvent = (evt) => {
  console.log(evt);
  return evt.key === 'Escape' || evt.key === 'Esc';
};
