export class Card {

  /**
   *  Создание карточки
   * @param {Object} item - объект карточки
   * @param {string} templateSelector - шаблон карточки
   */
  constructor(item, templateSelector) {
    const cardTemplate = document.querySelector(templateSelector).content.querySelector('.element');
    this._card = cardTemplate.cloneNode(true);
    this._image = this._card.querySelector('.element__image');
    this._text = this._card.querySelector('.element__text');

    // заполняем карточку
    this._setParams(item);

    // вешаем обработчики
    this._setEventListeners();
  }

  /**
   * Заполнение полей в карточке
   * @param {Object} item
   */
  _setParams(item) {
    this._image.src = item.link;
    this._image.alt = item.name;
    this._text.textContent = item.name;
  }
  getCard() {
    return this._card;
  }

  /**
   * утановка обработчиков событий для карточек
   */
  _setEventListeners() {
    // клику по иконке сердце
    this._card.querySelector('.element__like')
      .addEventListener('click', this._handleLikeIcon);
    // клик по корзине
    this._card.querySelector('.element__bin')
      .addEventListener('click', this._handleDeleteCard);
    // this._image.addEventListener('click', () => {
    //   showPopupViewPicture(item)
    // });
  }

  /**
  * смена стилей на лайке
  */
  _handleLikeIcon(evt) {
    evt.target.classList.toggle('element__like_active');
  }

  /**
   * удаление карточки
   */
  _handleDeleteCard(evt) {
    evt.target.closest('.element').remove();
  }


}

// export let str = 'test';

