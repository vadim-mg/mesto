import { popupViewImageSelector, popupViewNameSelector } from '../utils/constants.js'

import Popup from './Popup.js'


export default class PopupWithImage extends Popup {

  /**
   * Создание Попапа
   * @param {string} popupSelector
   */
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._element.querySelector(popupViewImageSelector)
    this._popupName = this._element.querySelector(popupViewNameSelector)
  }

  /**
   * Открываем попап с карточкой {item}
   * @param {Object} item { item.link: string, item.name: string }
   */
  open(item) {
    this._popupImage.src = item.link
    this._popupImage.alt = item.name
    this._popupName.textContent = item.name
    super.open()
  }
}
