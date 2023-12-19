import {isEscEvent} from "./utils.js";

const MODAL_CLOSED_CLASS = `modal--closed`;
const MODAL_NOJS_CLASS = `modal--nojs`;

const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.modal__button');

modal.classList.remove(MODAL_NOJS_CLASS);

export const controlModal = (buttons, cb) => {
  const closeModal = () => {
    modal.classList.add(MODAL_CLOSED_CLASS);
    cb();
    document.removeEventListener('keydown', onEscKeydown);
  }

  const openModal = () => {
    modal.classList.remove(MODAL_CLOSED_CLASS);
    document.addEventListener(`keydown`, onEscKeydown)
  }

  const onEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      closeModal();
    }
  }

  buttons.forEach((button) => button.addEventListener('click', openModal));

  modalButton.addEventListener('click', closeModal);
}
