import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { initialCards } from './initialCards.js'

/**
 * Параметры валидации
 */
const validationParams = {
  formSelector: 'form.popup__container',
  inputSelector: '.popup__input',
  errorSelector: '.popup__error',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
}

// Выбираем все нужные элементы
const profileInfo = document.querySelector('.profile__info')
const profileName = profileInfo.querySelector('.profile__name')
const profileDescription = profileInfo.querySelector('.profile__description')
const profileEditButton = profileInfo.querySelector('.profile__edit-button')
const profileAddButton = document.querySelector('.profile__add-button')

const elementsBlock = document.querySelector('.elements')


const popupEditProfile = document.querySelector('.popup_edit')
const profileNameField = popupEditProfile.querySelector('[name="name"]')
const profileDescriptionField = popupEditProfile.querySelector('[name="description"]')

const popupAddNewPlace = document.querySelector('.popup_add')
const popupAddNewPlaceForm = popupAddNewPlace.querySelector('.popup__container')
const popupAddPlace = popupAddNewPlaceForm.querySelector('[name="place"]')
const popupAddUrl = popupAddNewPlaceForm.querySelector('[name="url"]')

const popupViewForm = document.querySelector('.popup_view')
const popupImage = popupViewForm.querySelector('.popup__picture-image')
const popupName = popupViewForm.querySelector('.popup__picture-name')

const popups = document.querySelectorAll('.popup')


/**
 * Выводим все карточки
 */
const renderList = () => {
  initialCards.forEach(item => renderCard(createCard(item.link, item.name), elementsBlock))
}


/**
 * создание карточки
 * @param {string} link
 * @param {string} name
 * @returns Card
 */
const createCard = (link, name) => {
  const card = new Card(link, name, '#card-template', showPopupViewPicture)
  return card.getCard()
}


/**
 * Добавление карточки data в разметку в начало элемента wrap
 * @param {Card} card
 * @param {ParentNode} wrap
 */
const renderCard = (card, wrap) => wrap.prepend(card)


/**
 * Вешаем обработчики
 */
const addEventListeners = () => {
  profileEditButton.addEventListener('click', showEditProfile)
  profileAddButton.addEventListener('click', () => openPopup(popupAddNewPlace))
  popupEditProfile.addEventListener('submit', saveProfile)
  popupAddNewPlace.addEventListener('submit', saveCard)

  // закрытие попапов по клику на оверлей, крестику
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if ((evt.target === popup) || evt.target.classList.contains('popup__close-button')) {
        closePopup(popup)
      }
    })
  })
}


/**
 * открытие попапа popup
 */
const openPopup = (popup) => {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', escEventListener)
}


/**
 * закрытие попапа popup
 */
const closePopup = (popup) => {
  document.removeEventListener('keydown', escEventListener)
  popup.classList.remove('popup_opened')
}


/**
 * закрытие попапов по ESC
 * @param {KeyboardEvent} evt
 */
const escEventListener = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened)
  }
}


/**
 * Показ формы редактирования профиля
 */
const showEditProfile = () => {
  let event = new Event('input')
  profileNameField.value = profileName.textContent
  profileNameField.dispatchEvent(event)
  profileDescriptionField.value = profileDescription.textContent
  profileDescriptionField.dispatchEvent(event)
  openPopup(popupEditProfile)
}


/**
 * Сохранение профиля
 */
const saveProfile = () => {
  profileName.textContent = profileNameField.value
  profileDescription.textContent = profileDescriptionField.value
  closePopup(popupEditProfile)
}


/**
 * Добавление карточки
 */
const saveCard = () => {
  renderCard(
    createCard(popupAddUrl.value, popupAddPlace.value),
    elementsBlock
  )
  closePopup(popupAddNewPlace)
  popupAddNewPlaceForm.reset()
}


/**
 * Показыаем карточку на весь экран
 * @param {string} link
 * @param {string} name
 */
const showPopupViewPicture = (link, name) => {
  popupImage.src = link
  popupImage.alt = name
  popupName.textContent = name
  openPopup(popupViewForm)
}


renderList()
addEventListeners()

//Включаем валидацию для всех форм
const formList = document.querySelectorAll(validationParams.formSelector)
formList.forEach(form => {
  const formValidator = new FormValidator(validationParams, form)
  formValidator.enableValidation()
})

