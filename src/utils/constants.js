
// Селекторы для карточек
export const cardsContainer = '.elements'
export const cardSelectors = {
  'cardTemplateSelector': '#card-template',
  'elementSelector': '.element',
  'imageSelector': '.element__image',
  'binSelector': '.element__bin',
  'captionSelector': '.element__caption',
  'nameSelector': '.element__text',
  'likeSelector': '.element__like',
  'likeActiveClass': 'element__like_active',
  'likeCountSelector': '.element__like-count'
}

// Селекторы для попапов
export const popupViewSelector = '.popup_view'
export const popupViewImageSelector = '.popup__picture-image'
export const popupViewNameSelector = '.popup__picture-name'

export const popupAddPlaceSelector = '.popup_add'
export const popupDeletePlaceSelector = '.popup_delete'
export const popupEditSelector = '.popup_edit'

export const formSelector = 'form.popup__container'

// Селекторы для профиля
export const userInfoSettings = {
  'profileSelector': '.profile',
  'profileNameSelector': '.profile__name',
  'profileDescriptionSelector': '.profile__description',
  'profileAvatarSelector': '.profile__avatar',
  'profileEditButtonSelector': '.profile__edit-button',
  'profileEditButtonHiddenClass': 'profile__edit-button_hidden',
  'profileAddPlaceButtonSelector': '.profile__add-place-button'
}


/**
 * Параметры валидации
 */
export const validationParams = {
  formSelector: formSelector,
  inputSelector: '.popup__input',
  errorSelector: '.popup__error',
  errorActiveSelector: '.popup__error_active',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
}


/*
* Подключение к API
*/

export const apiSettings = {
  token: 'd119b3a4-6901-4a18-8871-5024c655ab94',
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23/'
}
