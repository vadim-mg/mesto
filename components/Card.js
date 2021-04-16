export default class Card {

  /**
   * Создание карточки
   * @param {string} link
   * @param {string} text
   * @param {string} templateSelector
   * @param {function} handleCardClick - обработычик клика по карточке
   */
  constructor(link, text, templateSelector, handleCardClick) {
    this._link = link
    this._text = text
    this._templateSelector = templateSelector
    this._handleCardClick = handleCardClick
    this._init()
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
   * Инициаоизация карточки, клонирование элемента из шаблона, заполнение атрибутов,
   */
  _init() {
    this._card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)
    const image = this._card
      .querySelector('.element__image')
    image.src = this._link
    image.alt = this._text
    this._card
      .querySelector('.element__text')
      .textContent = this._text
  }


  /**
   * утановка обработчиков событий для карточек
   */
  _setEventListeners() {
    this._card
      .querySelector('.element__like')
      .addEventListener('click', this._handleLikeIcon)
    this._card
      .querySelector('.element__bin')
      .addEventListener('click', this._handleDeleteCard)
    this._card
      .addEventListener('click', () => this._handleCardClick(this._link, this._text))
  }


  /**
  * смена стилей на лайке
  */
  _handleLikeIcon(evt) {
    evt.stopPropagation()
    evt.target.classList.toggle('element__like_active')
  }


  /**
   * удаление карточки
   */
  _handleDeleteCard(evt) {
    evt.stopPropagation()
    evt.target.closest('.element').remove()
  }

}

