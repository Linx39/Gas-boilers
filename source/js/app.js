const mainNav = document.querySelector('.main-nav');
const mainNavToggle = document.querySelector('.main-nav__toggle');

mainNav.classList.remove('main-nav--nojs');

mainNavToggle.addEventListener('click', () =>
  {if (mainNav.classList.contains('main-nav--closed')) {
      mainNav.classList.remove('main-nav--closed');
      mainNav.classList.add('main-nav--opened');
    } else {
      mainNav.classList.add('main-nav--closed');
      mainNav.classList.remove('main-nav--opened');
    }
  }
);

const consultation = document.querySelector('.consultation');
const consultationContent = document.querySelector('.consultation__content');
const consultationAnswer = document.querySelector('.consultation__answer');
const consultationButton = document.querySelector('.consultation__button');

consultationButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (consultation.classList.contains('consultation--content-opened')) {
    consultation.classList.remove('consultation--content-opened');
    consultation.classList.add('consultation--answer-opened');
  }
});


const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.modal__button');

modalButton.addEventListener('click', () => {
  if (modal.classList.contains('modal--closed')) {
    modal.classList.remove('modal--closed');
    modal.classList.add('modal--opened');
  } else {
    modal.classList.add('modal--closed');
    modal.classList.remove('modal--opened');
  }

  if (consultation.classList.contains('consultation--answer-opened')) {
    consultation.classList.remove('consultation--answer-opened');
    // consultation.classList.add('consultation--content-opened');
  }
});

const callButtons= document.querySelectorAll(['.app-button--call', '.app-button--staff']);

callButtons.forEach((button) => {
  button.addEventListener('click', () => {
    modal.classList.remove('modal--closed');
    modal.classList.add('modal--opened');
  });
})


//Функция переключателя слайдера

const catalogItem1Element = document.querySelector(`#catalog-item-1`);
const sliderWrapper = catalogItem1Element.querySelector(`.catalog__brend-wrapper`);
const sliderWrapperClass = `catalog__brend-wrapper--transform`;

// const sliderWindow = document.querySelector(`.slider__wrapper`);
const sliderTogglesElement = catalogItem1Element.querySelector('.slider__toggles');
const sliderListElement = catalogItem1Element.querySelector('.slider__list');

const sliderToggleArray = sliderTogglesElement.querySelectorAll('.slider__toggle');
const sliderItemArray = sliderListElement.querySelectorAll('.slider__item');

const sliderToggleCurrentClass = `slider__toggle--current`;
const brendItemCurrentClass = `brend-list__item--current`;
const sliderItemCurrentClass = `slider__item--current`;

const translateSlider = (evt) => {
  const sliderToggleCurrent = sliderTogglesElement.querySelector(`.${sliderToggleCurrentClass}`);
  const sliderItemCurrent = sliderListElement.querySelector(`.${sliderItemCurrentClass}`);

  const indexCurrent = [...sliderToggleArray].findIndex((item) => item === sliderToggleCurrent);
  const indexSelected = [...sliderToggleArray].findIndex((item) => item === evt.target);

  if (indexCurrent === indexSelected) {
    return;
  }

  const listScrollWidth = sliderListElement.scrollWidth;
  const itemWidth = sliderItemArray[0].clientWidth;
  const listClientWidth = sliderListElement.clientWidth;
  const listHiddenWidth = listScrollWidth - listClientWidth;

  const itemGup = (listScrollWidth - sliderItemArray.length * itemWidth) / (sliderItemArray.length - 1);
  const itemWidthFull = itemWidth + itemGup;
  const positionSelected = indexSelected * itemWidthFull;
  let positionTranslate = 0;

  if (positionSelected + itemWidthFull > listClientWidth) {
    if(positionSelected < listHiddenWidth) {
      positionTranslate = -positionSelected;
    } else {
      positionTranslate = -listHiddenWidth - 16;
      sliderWrapper.classList.add(sliderWrapperClass);
    }
  }

  if (positionTranslate !==0) {
    sliderListElement.style.transform = `translateX(${positionTranslate}px)`;
  }

  sliderToggleCurrent.classList.remove(sliderToggleCurrentClass);
  evt.target.classList.add(sliderToggleCurrentClass);

  sliderItemCurrent.classList.remove(brendItemCurrentClass);
  sliderItemCurrent.classList.remove(sliderItemCurrentClass);
  sliderItemArray[indexSelected].classList.add(sliderItemCurrentClass);
  sliderItemArray[indexSelected].classList.add(brendItemCurrentClass);
}

sliderToggleArray.forEach((toggle) => {
  toggle.addEventListener('click', translateSlider);
})
