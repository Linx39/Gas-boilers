const CONSULTATION_SUCCESS_CLASS = `consultation--success`;
const PHONE_MASK = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
const VALIDITY_MESSAGE_PHONE = `Введите корректный номер телефона.`;

const consultation = document.querySelector(`.consultation`);
const consultationForm = consultation.querySelector(`.consultation__form`);
const consultationFieldPhone = consultation.querySelector(`.consultation__field--phone`);

export const setConsultationDefault = () => {
  consultationForm.reset();

  if (consultation.classList.contains(CONSULTATION_SUCCESS_CLASS)) {
    consultation.classList.remove(CONSULTATION_SUCCESS_CLASS);
  }
}

export const setConsultationFormSubmit = () => {
  consultationForm.addEventListener('submit', (evt) => {

    evt.preventDefault();

    console.log (consultationFieldPhone.value);

    if (!PHONE_MASK.test(consultationFieldPhone.value)) {
      consultationFieldPhone.setCustomValidity(VALIDITY_MESSAGE_PHONE);
      consultationFieldPhone.reportValidity();
      return;
    }

    consultation.classList.add(CONSULTATION_SUCCESS_CLASS);
  });
}

