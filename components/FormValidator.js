export default class FormValidator {


  /**
   * @param {Object} validationParams - объект с селекторами формы
   * @param {Node} form
   */
  constructor(validationParams, form) {
    this._form = form
    this._inputList = this._form
      .querySelectorAll(validationParams.inputSelector)
    this._buttonSubmit = this._form
      .querySelector(validationParams.submitButtonSelector)

    this._errorSelector = validationParams.errorSelector
    this._inactiveButtonClass = validationParams.inactiveButtonClass
  }


  /**
   * Включаем валидацию
   */
  enableValidation() {
    this._setFormEventListeners()
    this._toggleButtonState()
  }


  /**
   * Вешаем обработчики
   */
  _setFormEventListeners() {
    this._form
      .addEventListener('submit', evt => evt.preventDefault())

    //При сбросе полей делаем кнопку неактивной
    this._form
      .addEventListener('reset', () => this._toggleButtonState(true))

    this._inputList
      .forEach(input => input
        .addEventListener('input', () => this._checkInputValidity(input)))
  }


  /**
   * Переключает состояние кнопки button в зависимости от наличия ошибок валидации
   * @param {boolean} off - если true - то выключить кнопку принудительно
   */
  _toggleButtonState(off = false) {
    if (this._hasErrorField() || off) {
      this._buttonSubmit.classList.add(this._inactiveButtonClass)
      this._buttonSubmit.setAttribute('disabled', 'true')
    } else {
      this._buttonSubmit.classList.remove(this._inactiveButtonClass)
      this._buttonSubmit.removeAttribute('disabled')
    }
  }


  /**
   * Устаговка ошибки с текстом {errorMessage} в элемент для вывода ошибок {fieldError}
   * @param {Node} fieldError
   * @param {string} errorMessage
   */
  _setFieldError(fieldError, errorMessage) {
    if (errorMessage.length > 0) {
      fieldError.classList.add('popup__error_active')
    } else {
      fieldError.classList.remove('popup__error_active')
    }
    fieldError.textContent = errorMessage
  }


  /**
   * Возвращает true если есть хоть один невалидный input в this._inputList
   * @returns boolean
   */
  _hasErrorField() {
    return Array.from(this._inputList).some(input => !input.validity.valid)
  }


  /**
   * Помещает браузурный текст ошибки при валидации поля input
   * в ближайший элемент с селектором this._errorSelector.
   * Скрытие о итображение элемента error реализовано в css псевдоклассом :invalid
   * @param {HTMLObjectElement} input
   */
  _checkInputValidity(input) {
    const error = input.parentElement
      .querySelector(this._errorSelector)
    this._setFieldError(error, !input.validity.valid ? input.validationMessage : '')
    this._toggleButtonState()
  }
}
