export default class Card {


  /**
   * Создание карточки
   * @param {string} link
   * @param {string} text
   * @param {string} templateSelector
   */
  constructor(link, text, templateSelector) {
    this._card = document
      .querySelector(templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)

    // заполняем карточку
    this._init(link, text)

    // вешаем обработчики
    this._setEventListeners()
  }


  /**
   * Возвращает блок с карточкой
   * @returns Node
   */
  getCard() {
    return this._card
  }


  /**
   * Заполнение полей в карточке
   * @param {string} link
   * @param {string} text
   */
  _init(link, text) {
    const image = this._card
      .querySelector('.element__image')
    const name = this._card
      .querySelector('.element__text')
    image.src = link
    image.alt = text
    name.textContent = text
  }


  /**
   * утановка обработчиков событий для карточек
   */
  _setEventListeners() {
    // клику по иконке сердце
    this._card.querySelector('.element__like')
      .addEventListener('click', this._handleLikeIcon)
    // клик по корзине
    this._card.querySelector('.element__bin')
      .addEventListener('click', this._handleDeleteCard)
  }


  /**
  * смена стилей на лайке
  */
  _handleLikeIcon(evt) {
    evt.target.classList.toggle('element__like_active')
  }


  /**
   * удаление карточки
   */
  _handleDeleteCard(evt) {
    evt.target.closest('.element').remove()
  }

}

