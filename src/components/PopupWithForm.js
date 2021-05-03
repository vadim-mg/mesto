import { formSelector, popupSubmitButton } from '../utils/constants.js'
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  /**
   * создание попапа с формой
   * @param {String} popupSelector
   * @param {Function} submitFunction - callback - функция отправки формы
   */
  constructor(popupSelector, submitFunction, processName = "Сохранение...") {
    super(popupSelector)
    this._form = this._element.querySelector(formSelector)
    this._popupSubmitButton = this._element.querySelector(popupSubmitButton)
    this._inputList = this._form.querySelectorAll('input')
    this._submitFunction = submitFunction
    this._processName = processName
  }

  open = () => {
    super.open()
    this._addSubmitListener()
  }

  get = () => this._form

  /**
   * Возвращает все поля формы
   * @returns Array - с индексами равными аттрибут name у поля и значением value
   */
  _getInputValues = () => Array.from(this._inputList).reduce((acc, i) => {
    acc[i.name] = i.value
    return acc
  }, {})


  /**
   * Заполнение полей значениями из объекта data
   * @param {Object} data
   */
  setInputValues = (data) => {
    let event = new Event('input')
    this._inputList.forEach(i => {
      i.value = data[i.name] || ''
      i.dispatchEvent(event)
    })
  }


  _addSubmitListener = () =>
    this._form.addEventListener('submit', this._handlerSubmit)
  _removeSubmitListener = () =>
    this._form.removeEventListener('submit', this._handlerSubmit)


  /**
   * обработчик Submita формы
   * @param {*} evt
   */
  _handlerSubmit = evt => {
    evt.preventDefault()
    this._removeSubmitListener()
    this._popupSubmitButton.setAttribute('disabled', 'true')

    const buttonText = this._popupSubmitButton.textContent
    this._popupSubmitButton.textContent = this._processName

    this._submitFunction(this._getInputValues())
      .then(val => {
        this.close()
        setTimeout(() => {
          this._form.reset()
          this._popupSubmitButton.textContent = buttonText
        }, 500)
      })
      .catch(err => {
        console.error(err)
        this._addSubmitListener()
        this._popupSubmitButton.textContent = buttonText
      })
      .then(val => this._popupSubmitButton.removeAttribute('disabled'))
  }


}
