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
 * @param {node} fieldError
 * @param {string} errorMessage
 */
const setFieldError = (fieldError, errorMessage) => {
  fieldError.textContent = errorMessage;
}


/**
 * Возвращает true если есть хоть один невалидный input
 * @param {node} inputList - список полей
 * @returns bool
 */
const hasErrorField = (inputList) => {
  return Array.from(inputList).some(input => !input.validity.valid);
}


/**
 * Переключает состояние кнопки button в зависимости от наличия ошибок валидации
 * в списке полей inputList
 * @param {node} button
 * @param {string} inactiveSelector - селектор неактивного состояния кнопки
 * @param {node} inputList
 */
const toggleButtonState = (button, inactiveSelector, inputList) => {
  if (hasErrorField(inputList)) {
    button.classList.add(inactiveSelector);
    button.setAttribute('disabled', true);
  } else {
    button.classList.remove(inactiveSelector);
    button.removeAttribute('disabled');
  }
}


/**
 * Приведени вида формы в порядок перед открытием
 * (установка правильных ошибок валидации и состояния кнопки)
 * @param {node} popup - попап содержащий форму
 * @param {object} validationParams
 */
const validatePreOpenPopup = (popup, validationParams) => {
  const form = popup.querySelector(validationParams.formSelector);
  // Если попап содержит форму, то выполняем приведение формы в порядок
  if (form) {
    const inputList = form.querySelectorAll(validationParams.inputSelector);
    const button = form.querySelector(validationParams.submitButtonSelector);
    inputList.forEach(input => checkInputValidity(input, validationParams.errorSelector));
    toggleButtonState(button, validationParams.inactiveButtonClass, inputList);
  }
}


/**
 * Помещает браузурный текст ошибки при валидации поля input
 * в элемент с селектором errorSelector.
 * Скрытие о итображение элемента error реализовано в css псевдоклассом :invalid
 * @param {node} input
 * @param {string} errorSelector
 */
const checkInputValidity = (input, errorSelector) => {
  const error = input.parentElement.querySelector(errorSelector);
  setFieldError(error, (!input.validity.valid ? input.validationMessage : ''));
}


/**
 * Вешаем обработчики на все элементы
 * @param {node} form
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





