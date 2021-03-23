/**
 * Параметры валидации
 */
const validationParams = {
  formSelector: 'form.popup__container',
  inputSelector: '.popup__input',
  errorSelector: '.popup__error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
};


/**
 * Вставляет текст ошибки {string} в элемент для вывода ошибок {fieldError}
 * @param {Node} fieldError
 * @param {string} errorMessage
 */
const setFieldError = (fieldError, errorMessage) => {
  fieldError.textContent = errorMessage;
}


/**
 * Возвращает true если есть хоть один невалидный input
 * @param {NodeList} inputList - список полей
 * @returns boolean
 */
const hasErrorField = (inputList) => {
  const inputListArray = Array.from(inputList);
  return inputListArray.some(input => !input.validity.valid);
}


/**
 * Переключает состояние кнопки button в зависимости от наличия ошибок валидации
 * в списке полей inputList
 * @param {Element} button
 * @param {String} inactiveSelector - селектор неактивного состояния кнопки
 * @param {NodeList} inputList
 */
const toggleButtonState = (button, inactiveSelector, inputList) => {
  if (hasErrorField(inputList)) {
    button.classList.add(inactiveSelector);
    button.setAttribute('disabled', 'true');
  } else {
    button.classList.remove(inactiveSelector);
    button.removeAttribute('disabled');
  }
}


/**
 * Приведени вида формы в порядок перед открытием
 * (установка правильных ошибок валидации и состояния кнопки)
 * @param {Element} popup - попап содержащий форму
 * @param {object} validationParams
 */
const validatePreOpenPopup = (popup, validationParams) => {
  const form = popup.querySelector(validationParams.formSelector);
  // Если попап содержит форму, то выполняем приведение формы в порядок
  if (form) {
    const inputList = form.querySelectorAll(validationParams.inputSelector);
    const button = form.querySelector(validationParams.submitButtonSelector);
    toggleButtonState(button, validationParams.inactiveButtonClass, inputList);
  }
}


/**
 * Помещает браузурный текст ошибки при валидации поля input
 * в элемент с селектором errorSelector.
 * Скрытие о итображение элемента error реализовано в css псевдоклассом :invalid
 * @param {HTMLObjectElement} input
 * @param {string} errorSelector
 */
const checkInputValidity = (input, errorSelector) => {
  const error = input.parentElement.querySelector(errorSelector);
  setFieldError(error, (!input.validity.valid ? input.validationMessage : ''));
}


/**B
 * Вешаем обработчики на все элементы
 * @param {Element} form
 * @param {object} validationParams
 */
const setFormEventListeners = (form, validationParams) => {
  const inputList = form.querySelectorAll(validationParams.inputSelector);
  const button = form.querySelector(validationParams.submitButtonSelector);
  form.addEventListener('submit', evt => evt.preventDefault());
  form.addEventListener('input', () => toggleButtonState(button, validationParams.inactiveButtonClass, inputList));
  inputList.forEach(input =>
    input.addEventListener('input', () => checkInputValidity(input, validationParams.errorSelector)));
}

/**
 * включение валидации в форме
 * @param {object} validationParams
 */
const enableValidation = (validationParams) => {
  const formList = document.querySelectorAll(validationParams.formSelector);
  formList.forEach(form =>
    setFormEventListeners(form, validationParams));
}






