const MODAL_CLOSED_CLASS = `modal--closed`;
const MODAL_OPENED_CLASS = `modal--opened`;

// const callButtons= document.querySelectorAll(['.app-button--call', '.app-button--staff']);
const modal = document.querySelector('.modal');
const modalButton = document.querySelector('.modal__button');

export const closeModal = (cb) => {
  // callButtons.forEach((button) => {
  //   button.addEventListener('click', () => {
  //     modal.classList.remove(MODAL_CLOSED_CLASS);
  //     modal.classList.add(MODAL_OPENED_CLASS);
  //   });
  // })

  modalButton.addEventListener('click', () => {
    modal.classList.remove(MODAL_OPENED_CLASS);
    modal.classList.add(MODAL_CLOSED_CLASS);
    cb();
  });
}

export const openModal = (button) => {
  button.addEventListener('click', () => {
    modal.classList.remove(MODAL_CLOSED_CLASS);
    modal.classList.add(MODAL_OPENED_CLASS);
  });
}

