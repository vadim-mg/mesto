import { formSelector } from '../utils/constants.js'
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction) {
    super(popupSelector)
    this._form = this._element.querySelector(formSelector)
    this._inputList = this._form.querySelectorAll('input')
    this._submitFunction = submitFunction
  }

  _getInputValues() {
    return Array.from(this._inputList).reduce((acc, i) => {
      acc[i.name] = i.value
      return acc
    },{})
  }

  setInputValues(data){
    let event = new Event('input')
    this._inputList.forEach(i =>{
      i.value = data[i.name]
      i.dispatchEvent(event)
    })
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', () => {
      this._submitFunction(this._getInputValues())
      this.close()
    })
  }

  close() {
    super.close()
    this._form.reset()
  }
}
