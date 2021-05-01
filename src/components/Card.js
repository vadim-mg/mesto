export default class Card {

  /**
   * Создание карточки
   * @param {string} link
   * @param {string} text
   * @param {Number} likeCount
   * @param {Object} Selectors
   * @param {function} handleCardClick - обработычик клика по карточке
   * @param {function} handleBinClick - обработычик клика по корзине
   */
  constructor(
    {
      _id,
      link,
      name,
      likes
    },
    {
      cardTemplateSelector,
      elementSelector,
      imageSelector,
      binSelector,
      captionSelector,
      nameSelector,
      likeSelector,
      likeActiveClass,
      likeCountSelector
    },
    handleCardClick,
    handleBinClick
  ) {
    this._templateSelector = cardTemplateSelector
    this._elementSelector = elementSelector
    this._imageSelector = imageSelector
    this._binSelector = binSelector
    this._captionSelector = captionSelector
    this._nameSelector = nameSelector
    this._likeSelector = likeSelector
    this._likeActiveClass = likeActiveClass
    this._likeCountSelector = likeCountSelector

    this._id = _id
    this._link = link
    this._name = name
    this._likeCount = likes && likes.length || 0
    this._handleCardClick = handleCardClick
    this._handleBinClick = handleBinClick

    this._init()
    this._setEventListeners()
  }

  getId = () => this._id

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
    image.alt = this._name
    this._card
      .querySelector(this._nameSelector)
      .textContent = this._name
    this._card
      .querySelector(this._likeCountSelector)
      .textContent = this._likeCount
  }

  disableBin = () =>{
    this._card.querySelector(this._binSelector).remove()
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
      .addEventListener('click', (evt) => {
        evt.stopPropagation()
        this._handleBinClick(evt)
      })
    this._card
      .addEventListener('click', () => this._handleCardClick(this._link, this._name))
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
  deleteCard() {
    this._card.remove()
  }

}

