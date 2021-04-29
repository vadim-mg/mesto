import './index.css'
import {
  popupViewSelector,
  popupEditSelector,
  popupAddPlaceSelector,
  cardTemplateSelector,
  validationParams,
  cardsContainer,
  userInfoSettings,
  apiSettings
} from '../utils/constants.js'
import Card from '../components/Card.js'
import FormValidator from '../components/FormValidator.js'
import Section from '../components/Section.js'
import PopupWithForm from '../components/PopupWithForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'

const api = new Api(apiSettings)


// Создаем и наполняем список карточками
const cardList = new Section([], cardsContainer)

api.loadCards()
  .then(result => result.forEach(item => addCardToList(item, cardList)))


// попап для просмотра карточек
const popupView = new PopupWithImage(popupViewSelector)

// Форма добаляения карточек
const popupAddPlace = new PopupWithForm(
  popupAddPlaceSelector,
  item => addCardToList({ link: item.url, name: item.place }, cardList, true)
)

// Форма профиля
const popupEditProfile = new PopupWithForm(
  popupEditSelector,
  item => userInfo.setUserInfo(item.name, item.description)
)

// Создаем екземпляр для профиля
const userInfo = new UserInfo(
  userInfoSettings,
  (inputValues) => {
    popupEditProfile.setInputValues(inputValues)
    popupEditProfile.open()
  },
  () => popupAddPlace.open(),
  () => api.loadUserInfo()
)




//рендеринг, влкючение валидации и обработчиков событий
userInfo.show()
enableValidation()
addEventListeners()

//--------

/**
 * Создает экземпляр карточки и добавляет его в список
 * @param {Object} { link, name } - данные для карточки
 * @param {Node} cardList - список карточек
 * @param {String} cardTemplate - шаблон карточки
 * @param {boolean} prepend - if true add to end
 */
function addCardToList({ link, name }, cardList, prepend = false, cardTemplate = cardTemplateSelector) {
  const card = new Card(
    link,
    name,
    cardTemplate,
    (link, name) => popupView.open({ link: link, name: name })
  )
  cardList.addItem(card.getCard(), prepend)
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
  // включаем обработчики на формах
  popupView
    .setEventListeners()
  popupAddPlace
    .setEventListeners()
  popupEditProfile
    .setEventListeners()
  userInfo
    .setEventListeners()
}
