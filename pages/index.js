import { Card } from '../components/Card.js'
import { FormValidator } from '../components/FormValidator.js'
import { initialCards } from '../utils/initialCards.js'
import { Section } from '../components/Section.js'

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
function renderList() {
  const cardList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem.link, cardItem.name, '#card-template')
      const cardElement = card.getCard()
      cardList.addItem(cardElement)
    }
  },
    '.elements'
  )
  cardList.renderer()
}


/**
 * Добавление карточки data в разметку в начало элемента wrap
 * @param {Card} card
 * @param {ParentNode} wrap
 */
function renderCard(card, wrap) {
  wrap.prepend(card)
}


/**
 * Вешаем обработчики
 */
function addEventListeners() {
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

  // Открытие картинки для просмотра
  elementsBlock.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__image')) {
      showPopupViewPicture({ link: evt.target.src, name: evt.target.alt })
    }
  })
}

/**
 * открытие попапа popup
 */
function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', escEventListener)
}

/**
 * закрытие попапа popup
 */
function closePopup(popup) {
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
function showEditProfile() {
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
function saveProfile() {
  profileName.textContent = profileNameField.value
  profileDescription.textContent = profileDescriptionField.value
  closePopup(popupEditProfile)
}

/**
 * Добавление карточки
 */
function saveCard() {
  const card = new Card(popupAddUrl.value, popupAddPlace.value, '#card-template')
  renderCard(card.getCard(), elementsBlock)
  closePopup(popupAddNewPlace)
  popupAddNewPlaceForm.reset()
}

/**
 * Показыаем карточку {item} на весь экран
 * @param {Object} item { item.link: string, item.name: string }
 */
function showPopupViewPicture(item) {
  popupImage.src = item.link
  popupImage.alt = item.name
  popupName.textContent = item.name
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
