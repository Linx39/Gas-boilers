export const changeItemCurrent = (itemCurrentPrev, itemCurrentNext, itemCurrentClass) => {
  itemCurrentPrev.classList.remove(itemCurrentClass);
  itemCurrentNext.classList.add(itemCurrentClass);
}

export const getSlider = (sliderElement, itemCurrentClassName) => {
  return {
    slider: sliderElement,
    itemCurrentClass: itemCurrentClassName,
  };
}

