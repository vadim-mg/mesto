import * as consts from '../utils/constants.js'
import { initialCards } from '../utils/initialCards.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'


const cardList = new Section({
  items: initialCards,
  renderer: (cardItem) => {
    const card = new Card(cardItem.link, cardItem.name, consts.cardTemplateSelector)
    const cardElement = card.getCard()
    cardList.addItem(cardElement)
  }
}, consts.cardsContainer)

const userInfo = new UserInfo(consts.profileNameSelector, consts.profileDescriptionSelector)

const popupView = new PopupWithImage(consts.popupViewSelector)

const popupAddPlace = new PopupWithForm(consts.popupAddPlaceSelector, item => {
  const card = new Card(item.url, item.place, '#card-template')
  cardList.addItem(card.getCard())
})

const popupEditProfile = new PopupWithForm(consts.popupEditSelector, item => {
  userInfo.setUserInfo(item.name, item.description)
})


cardList.renderer()
addEventListeners()

//Включаем валидацию для всех форм
document.querySelectorAll(consts.validationParams.formSelector)
  .forEach(form => {
    const formValidator = new FormValidator(consts.validationParams, form)
    formValidator.enableValidation()
  })


/**
 * Вешаем обработчики
 */
function addEventListeners() {
  popupView.setEventListeners()
  popupAddPlace.setEventListeners()
  popupEditProfile.setEventListeners()

  consts.profileAddButton.addEventListener('click', () => popupAddPlace.open())

  consts.profileEditButton.addEventListener('click', () => {
    popupEditProfile.setInputValues(userInfo.getUserInfo())
    popupEditProfile.open()
  })

  // Открытие картинки при клике для просмотра
  document.querySelector(consts.cardsContainer)
    .addEventListener('click', (evt) => {
      if (evt.target.classList.contains('element__image')) {
        popupView.open({ link: evt.target.src, name: evt.target.alt })
      }
    })
}


