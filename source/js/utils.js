export const changeItemCurrent = (itemCurrentPrev, itemCurrentNext, itemCurrentClass) => {
  itemCurrentPrev.classList.remove(itemCurrentClass);
  itemCurrentNext.classList.add(itemCurrentClass);
}

export const getSlider = (element, itemCurrentClassName) => {
  return {
    sliderElement: element,
    itemCurrentClass: itemCurrentClassName,
  };
}

