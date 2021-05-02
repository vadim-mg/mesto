export default class Card {

  /**
   * Создание карточки
   * @param {Object} cardData
   * @param {Object} selectors {cardTemplateSelector, elementSelector, imageSelector,
   *  binSelector, nameSelector,likeSelector, likeActiveClass, likeCountSelector }
   * @param {function} showCardMethod - обработчик открытия карточки
   * @param {function} deleteCardMethod - обработчик удаления карточки
   * @param {function} likeSetMethod - обработчик клика по лайку
   */
  constructor(
    cardData,
    selectors,
    showCardMethod,
    deleteCardMethod,
    likeSetMethod
  ) {

    this._showCardMethod = showCardMethod
    this._deleteCardMethod = deleteCardMethod
    this._likeSetMethod = likeSetMethod

    this._init(selectors)
    this.setCard(cardData)
    this._setEventListeners()
  }


  /**
   * Инициаоизация карточки, клонирование элемента из шаблона
   */
  _init = ({
    cardTemplateSelector,
    elementSelector,
    imageSelector,
    binSelector,
    nameSelector,
    likeSelector,
    likeActiveClass,
    likeCountSelector
  }) => {
    this._likeActiveClass = likeActiveClass

    this._card = document.querySelector(cardTemplateSelector)
      .content.querySelector(elementSelector).cloneNode(true)
    this._image = this._card.querySelector(imageSelector)
    this._binButton = this._card.querySelector(binSelector)
    this._nameElement = this._card.querySelector(nameSelector)
    this._likeElement = this._card.querySelector(likeSelector)
    this._likeCountElement = this._card.querySelector(likeCountSelector)
  }

  /**
   * Установка значений елементов карточки
   * @param {Object} данные карточки { _id, link, name, likes }
   */
  setCard = ({ _id, link, name, likes }) => {
    this._id = _id
    this._link = link
    this._name = name
    this._likes = likes
    this._likeCount = likes && likes.length || 0

    this._image.src = this._link
    this._image.alt = this._name
    this._nameElement.textContent = this._name
    this._likeCountElement.textContent = this._likeCount
  }


  /**
   * Возращает блок с карточкой
   * @returns Node
   */
  getCard = () => this._card


  /**
   * Возращает id карточки
   * @returns string
   */
  getId = () => this._id


  /**
   * Возращает массив Id пользователей, кликнувших карточку
   * @returns Array
   */
  getLikesOwnerIds = () => this._likes.map(item => item._id)


  /**
   * Удаляет кнопку с корзиной с карточки
   */
  disableBin = () => this._binButton.remove()


  /**
   * удаление карточки
   */
  removeCard = () => this._card.remove()


  /**
   * Установка какточке статуса лайка, текущим пользьвателем
   */
  setLikeStatus = () => this._likeElement.classList.add(this._likeActiveClass)


  /**
   * утановка обработчиков событий для карточек
   */
  _setEventListeners = () => {
    this._likeElement.addEventListener('click',
      this._handleLikeIconClick.bind(this))
    this._binButton.addEventListener('click',
      this._handleBinButtonClick.bind(this))
    this._card.addEventListener('click',
      this._showCardMethod.bind(this, this._link, this._name))
  }


  /**
  * обработчик клика по лайку
  */
  _handleLikeIconClick = evt => {
    evt.stopPropagation()
    evt.target.classList.toggle(this._likeActiveClass)
    this._likeSetMethod()
  }


  /**
   * обработчик клика по корзине
   */
  _handleBinButtonClick = evt => {
    evt.stopPropagation()
    this._deleteCardMethod(evt)
  }

}

