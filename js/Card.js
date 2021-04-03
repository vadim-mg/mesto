export class Card {

  /**
   * Создание карточки
   * @param {string} link
   * @param {string} text
   * @param {string} templateSelector
   * @param {Function} showCardFunction - ф-я которая будет открывать POPUP c карточкой
   */
  constructor(link, text, templateSelector, showCardFunction) {
    this._card = document
      .querySelector(templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true)

    // заполняем карточку
    this._init(link, text)

    //функция для показа карточки
    this._showCardFunction = showCardFunction

    // вешаем обработчики
    this._setEventListeners()
  }


  /**
   * Возвращает блок с карточкой
   * @returns Node
   */
  getCard = () => this._card


  /**
   * Заполнение полей в карточке
   * @param {string} link
   * @param {string} text
   */
  _init = (link, text) => {
    this._link = link;
    this._text = text;
    const image = this._card
      .querySelector('.element__image')
    const name = this._card
      .querySelector('.element__text')
    image.src = this._link
    image.alt = this._text
    name.textContent = this._text
  }


  /**
   * утановка обработчиков событий для карточек
   */
  _setEventListeners = () => {
    // клику по иконке сердце
    this._card
      .querySelector('.element__like')
      .addEventListener('click', this._handleLikeIcon)
    // клик по корзине
    this._card
      .querySelector('.element__bin')
      .addEventListener('click', this._handleDeleteCard)
    // клик по картинке
    this._card
      .querySelector('.element__image')
      .addEventListener('click', () => this._showCardFunction(this._link, this._text))
  }


  /**
  * смена стилей на лайке
  */
  _handleLikeIcon = (evt) => evt.target
    .classList.toggle('element__like_active')


  /**
   * удаление карточки
   */
  _handleDeleteCard = (evt) => evt.target
    .closest('.element').remove()


}

