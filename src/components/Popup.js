export default class Popup {
  constructor(selector) {
    this._element = document.querySelector(selector)
  }

  open() {
    if (!this._element.classList.contains('popup_opened')) {
      this._element.classList.add('popup_opened')
      document.addEventListener('keydown', this._handleEscClose.bind(this))
      return true
    }
    return false
  }

  close() {
    document.removeEventListener('keydown', this._handleEscClose.bind(this))
    this._element.classList.remove('popup_opened')
  }

  /**
   * закрытие попапа по ESC
   * @param {Event} evt
   */
  _handleEscClose(evt) {
    evt.stopPropagation()
    if (evt.key === "Escape") {
      this.close()
    }
  }

  /**
   * Вешаем обработчики событий на клик
   */
  setEventListeners() {
    this._element.addEventListener('click', (evt) => {
      if ((evt.target === this._element) || evt.target.classList.contains('popup__close-button')) {
        this.close()
      }
    })
  }

}
