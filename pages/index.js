import {
  popupViewSelector,
  popupEditSelector,
  popupAddPlaceSelector,
  cardTemplateSelector,
  validationParams,
  cardsContainer,
  profileNameSelector,
  profileDescriptionSelector,
  profileAddButtonSelector,
  profileEditButtonSelector
} from '../utils/constants.js'
import { initialCards } from '../utils/initialCards.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'

// Создаем попап для просмотра карточек
const popupView = new PopupWithImage(popupViewSelector)

// Создаем и наполняем список карточками
const cardList = new Section({
  items: initialCards,
  renderer: item => addCardToList(item, cardList)
}, cardsContainer)

// Создаем екзкмпляр для профиля
const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  descriptionSelector: profileDescriptionSelector
})

// Форма добаляения карточек
const popupAddPlace = new PopupWithForm(
  popupAddPlaceSelector,
  item => addCardToList({ link: item.url, name: item.place }, cardList)
)

// Форма профиля
const popupEditProfile = new PopupWithForm(
  popupEditSelector,
  item => userInfo.setUserInfo(item.name, item.description)
  )

//рендеринг, влкючение валидации и обработчиков событий

  cardList.renderer()
  enableValidation()
  addEventListeners()

//--------

/**
 * Создает экземпляр карточки и добавляет его в список
 * @param {Object} { link, name } - данные для карточки
 * @param {Node} cardList - список карточек
 * @param {String} cardTemplate - шаблон карточки
 */
function addCardToList({ link, name }, cardList, cardTemplate = cardTemplateSelector){
  const card = new Card(
    link,
    name,
    cardTemplate,
    (link, name) => popupView.open({ link: link, name: name })
  )
  cardList.addItem(card.getCard())
}


/**
 * Включаем валидацию для всех форм
 */
function enableValidation() {
  document.
    querySelectorAll(validationParams.formSelector)
    .forEach(form => {
      const formValidator = new FormValidator(validationParams, form)
      formValidator.enableValidation()
    })
}

/**
 * Вешаем обработчики
 */
function addEventListeners() {
  popupView
    .setEventListeners()
  popupAddPlace
    .setEventListeners()
  popupEditProfile
    .setEventListeners()

  document
    .querySelector(profileAddButtonSelector)
    .addEventListener('click', () => popupAddPlace.open())

  document
    .querySelector(profileEditButtonSelector)
    .addEventListener('click', () => {
      popupEditProfile.setInputValues(userInfo.getUserInfo())
      popupEditProfile.open()
    })
}


