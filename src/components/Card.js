export default class Card {

  /**
   * Создание карточки
   * @param {string} link
   * @param {string} text
   * @param {Number} likeCount
   * @param {Object} Selectors
   * @param {function} handleCardClick - обработычик клика по карточке
   */
  constructor(link,
    text,
    likeCount,
    { cardTemplateSelector,
      elementSelector,
      imageSelector,
      binSelector,
      captionSelector,
      textSelector,
      likeSelector,
      likeActiveClass,
      likeCountSelector
    },
    handleCardClick
  ) {
    this._templateSelector = cardTemplateSelector
    this._elementSelector = elementSelector
    this._imageSelector = imageSelector
    this._binSelector = binSelector
    this._captionSelector = captionSelector
    this._textSelector = textSelector
    this._likeSelector = likeSelector
    this._likeActiveClass = likeActiveClass
    this._likeCountSelector = likeCountSelector

    this._link = link
    this._text = text
    this._likeCount = likeCount
    this._handleCardClick = handleCardClick

    this._init()
    this._setEventListeners()
  }


  /**
   * Возвращает блок с карточкой
   * @returns Node
   */
  getCard = () => this._card


  /**
   * Инициаоизация карточки, клонирование элемента из шаблона, заполнение атрибутов,
   */
  _init() {
    this._card = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(this._elementSelector)
      .cloneNode(true)
    const image = this._card
      .querySelector(this._imageSelector)
    image.src = this._link
    image.alt = this._text
    this._card
      .querySelector(this._textSelector)
      .textContent = this._text
    this._card
      .querySelector(this._likeCountSelector)
      .textContent = this._likeCount
  }


  /**
   * утановка обработчиков событий для карточек
   */
  _setEventListeners() {
    this._card
      .querySelector(this._likeSelector)
      .addEventListener('click', this._handleLikeIcon.bind(this))
    this._card
      .querySelector(this._binSelector)
      .addEventListener('click', this._handleDeleteCard.bind(this))
    this._card
      .addEventListener('click', () => this._handleCardClick(this._link, this._text))
  }


  /**
  * смена стилей на лайке
  */
  _handleLikeIcon(evt) {
    evt.stopPropagation()
    evt.target.classList.toggle(this._likeActiveClass)
  }


  /**
   * удаление карточки
   */
  _handleDeleteCard(evt) {
    evt.stopPropagation()
    evt.target.closest(this._elementSelector).remove()
  }

}

