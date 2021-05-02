import { formSelector, popupSubmitButton } from '../utils/constants.js'
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  /**
   * создание попапа с формой
   * @param {String} popupSelector
   * @param {Function} submitFunction - callback - функция отправки формы
   */
  constructor(popupSelector, submitFunction) {
    super(popupSelector)
    this._form = this._element.querySelector(formSelector)
    this._popupSubmitButton = this._element.querySelector(popupSubmitButton)
    this._inputList = this._form.querySelectorAll('input')
    this._submitFunction = submitFunction
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


  setEventListeners = () => {
    super.setEventListeners()
    this._form.addEventListener('submit', evt => this._handlerSubmit(evt))
  }


  /**
   * обработчик Submita формы
   * @param {*} evt
   */
  _handlerSubmit = evt => {
    evt.preventDefault()

    const action = new Promise((resolve, reject) => {
      this._popupSubmitButton.textContent = "Сохраняется..."
      this._popupSubmitButton.setAttribute('disabled', 'true')
      this._submitFunction(this._getInputValues())
        .then(result => resolve('Форма закрыта'))
    })

    Promise.race([action])
      .then(val => {
        this.close()
        this._form.reset()
        this._popupSubmitButton.textContent = "Сохранить"
      })
  }


}
