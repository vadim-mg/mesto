/**
 * Параметры валидации
 */
const validationParams = {
  formSelector: 'form.popup__container',
  fieldSelector: '.popup__field',
  inputSelector: '.popup__input',
  fieldErrorSelector: '.popup__field-error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
};

/**
 * Вставляет текст ошибки {string} в элемент для вывода ошибок {fieldError}
 * @param {node} fieldError
 * @param {string} errorMessage
 */
const setFieldError = (fieldError, errorMessage) => {
  fieldError.textContent = errorMessage;
}

const hasErrorField = (inputList) => {
  console.log(inputList);
  return Array.from(inputList).some((input) => {
    console.log('^^^:' + input.validity.valid)
    return !input.validity.valid;
  });
}

const toggleButtonState = (button, inactiveSelector, inputList) => {
  if (hasErrorField(inputList)) {
    button.classList.add(inactiveSelector);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(inactiveSelector);
    button.removeAttribute('disabled');
  }
}

const validatePopup = (popup, validationParams) => {
  const form = popup.querySelector(validationParams.formSelector);
  const inputList = form.querySelectorAll(validationParams.inputSelector);
  const button = form.querySelector(validationParams.submitButtonSelector);
  toggleButtonState(button, validationParams.inactiveButtonClass, inputList);
}

/**
 * Выводит текст ошибки error из input
 * @param {node} input
 * @param {node} error
 */
const checkInputValidity = (input, error) => {
  // Скрытие о итображение реалезовал стилями .popup__input:invalid+.popup__field-error
  // потому тут только передача сообщения
  if (!input.validity.valid) {
    setFieldError(error, input.validationMessage);
  } else {
    setFieldError(error, '');
  }
}




const setFormEventListeners = (form, elementsForValidation) => {
  const fieldList = form.querySelectorAll(elementsForValidation.fieldSelector);
  const inputList = form.querySelectorAll(elementsForValidation.inputSelector);
  const button = form.querySelector(elementsForValidation.submitButtonSelector);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  })
  form.addEventListener('input', () => {
    toggleButtonState(button, elementsForValidation.inactiveButtonClass, inputList);
  })
  fieldList.forEach((field) => {
    const fieldInput = field.querySelector(elementsForValidation.inputSelector);
    const fieldError = field.querySelector(elementsForValidation.fieldErrorSelector);
    checkInputValidity(fieldInput, fieldError);
    field.addEventListener('input', () => {
      checkInputValidity(fieldInput, fieldError);
    })
  })
}



const enableValidation = (elementsForValidation) => {
  const formList = document.querySelectorAll(elementsForValidation.formSelector);
  formList.forEach(form => setFormEventListeners(form, elementsForValidation));
}


enableValidation(validationParams);


