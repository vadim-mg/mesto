import './index.css'
import {
  popupViewSelector,
  popupEditSelector,
  popupAddPlaceSelector,
  cardTemplateSelector,
  validationParams,
  cardsContainer,
  userInfoSettings,
  apiSettings,
  cardSelectors
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
  .catch(err => console.error(err))

// попап для просмотра карточек
const popupView = new PopupWithImage(popupViewSelector)

// Форма добаляения карточек
const popupAddPlace = new PopupWithForm(
  popupAddPlaceSelector,
  item => {
    api.saveCard(item)
      .then(() => addCardToList(item, cardList, true))
      .catch(err => console.error(err))
  }
)

// Форма профиля
const popupEditProfile = new PopupWithForm(
  popupEditSelector,
  item => {
    api.saveUserInfo(item.name, item.description)
      .then(() => userInfo.setUserInfo(item.name, item.description))
      .catch(err => console.error(err))
  }
)

// Открытие формы редактированя профиля
const popupEditProfileOpen = inputValues => {
  popupEditProfile.setInputValues(inputValues)
  popupEditProfile.open()
}


// Создаем екземпляр для профиля
const userInfo = new UserInfo(
  userInfoSettings,
  inputValues => popupEditProfileOpen(inputValues),
  () => popupAddPlace.open()
)
api.loadUserInfo()
  .then(value => {
    userInfo.setUserInfo(value.name, value.about)
    userInfo.showEditButton()
    userInfo.setAvatar(value.avatar)
  })
  .catch(err => {
    console.error(err)
    userInfo.setUserInfo('Профиль не загружен!', 'Что-то пошло не так...')
  })



//рендеринг, влкючение валидации и обработчиков событий
enableValidation()
addEventListeners()

//--------

/**
 * Создает экземпляр карточки и добавляет его в список
 * @param {Object} { link, name, likes } - данные для карточки
 * @param {Node} cardList - список карточек
 * @param {String} cardTemplate - шаблон карточки
 * @param {boolean} prepend - if true add to end
 */
function addCardToList({ link, name, likes }, cardList, prepend = false, selectors = cardSelectors) {
  const card = new Card(
    link,
    name,
    likes && likes.length || 0,
    selectors,
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
