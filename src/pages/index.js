import './index.css'
import {
  popupViewSelector,
  popupEditSelector,
  popupAddPlaceSelector,
  popupDeletePlaceSelector,
  popupEditAvatarSelector,
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
import PopupSubmitForm from '../components/PopupSubmitForm.js'
import PopupWithImage from '../components/PopupWithImage.js'
import UserInfo from '../components/UserInfo.js'
import Api from '../components/Api.js'

const api = new Api(apiSettings)

// Создаем екземпляр для профиля
const userInfo = new UserInfo(
  userInfoSettings,
  inputValues => {
    popupEditProfile.setInputValues(inputValues)
    popupEditProfile.open()
  },
  () => popupAddPlace.open(),
  inputValues => {
    popupUpdateAvatar.setInputValues(inputValues)
    popupUpdateAvatar.open()
  }
)


// Загружаем инфу о профиле
const userInfoLoad = api.loadUserInfo()
  .then(value => {
    userInfo.setUserInfo(value)
    userInfo.showEditButton()
    userInfo.setAvatar(value.avatar)
  })
  .catch(err => {
    console.error(err)
    userInfo.setUserInfo('Профиль не загружен!', 'Что-то пошло не так...')
  })


// Загружаем карточки
let cardItems = []
const cardsLoad = api.loadCards()
  .then(result => cardItems = result)
  .catch(err => console.error(err))


// Создаем екземпляр для блока с карточками
const cardList = new Section([], cardsContainer)


// Когда все данные получены рендерим карточки
Promise.allSettled([userInfoLoad, cardsLoad])
  .then(result => cardItems.forEach(
    item => addCardToList(item, cardList)))


// попап для просмотра карточек
const popupView = new PopupWithImage(popupViewSelector)


// попап с формой добаления карточек
const popupAddPlace = new PopupWithForm(
  popupAddPlaceSelector,
  item => api.saveCard(item)
    .then(result => addCardToList(result, cardList, true))
    .catch(err => console.error(err))
)


// Попап с формой профиля
const popupEditProfile = new PopupWithForm(
  popupEditSelector,
  item => api.saveUserInfo(item.name, item.description)
    .then(result => userInfo.setUserInfo(result))
    .catch(err => console.error(err))
)


// Попап с формой подтверждения удаления карточки
const popupDeleteCard = new PopupSubmitForm(
  popupDeletePlaceSelector,
  item => api.deleteCard(popupDeleteCard.subject.getId())
    .then(result => popupDeleteCard.submit())
    .catch(err => console.error(err))
)

//попап с редактированием аватара
const popupUpdateAvatar = new PopupWithForm(
  popupEditAvatarSelector,
  item => api.setAvatar(item.link)
    .then(result => userInfo.setAvatar(result.avatar))
    .catch(err => console.error(err))
)



/**
 * Создает экземпляр карточки и добавляет его в список
 * @param {Object} { link, name, likes } - данные для карточки
 * @param {Node} cardList - список карточек
 * @param {boolean} prepend - if true add to end
 * @param {Object} cardSelectors - селекторы для карточек
 */
const addCardToList = (cardValues, cardList, prepend = false, selectors = cardSelectors) => {
  const thisCardLikedMine = thisCard =>
    thisCard.getLikesOwnerIds()
      .some(item => userInfo.itIsMe(item))

  const card = new Card(
    cardValues,
    selectors,
    (link, name) => popupView.open({ link: link, name: name }),
    () => popupDeleteCard.open(card, card.removeCard),
    () => api.like(card.getId(), !thisCardLikedMine(card))
      .then(val => card.setCard(val))
      .catch(err => console.error(err))
  )

  if (!userInfo.itIsMe(cardValues.owner._id))
    card.disableBin()

  if (thisCardLikedMine(card))
    card.setLikeStatus()

  cardList.addItem(card.getCard(), prepend)
}



/**
 * Включаем валидацию для всех форм
 */
const enableValidation = () => {
  [
    popupAddPlace,
    popupEditProfile,
    popupUpdateAvatar
  ]
    .forEach(form =>
      new FormValidator(validationParams, form.get())
        .enableValidation())
}

/**
 * Вешаем обработчики на попапы
 */
const addEventListeners = () => {
  popupView
    .setEventListeners()
  popupAddPlace
    .setEventListeners()
  popupEditProfile
    .setEventListeners()
  popupDeleteCard
    .setEventListeners()
  popupUpdateAvatar
    .setEventListeners()
  userInfo
    .setEventListeners()
}


//влкючение валидации и обработчиков событий
enableValidation()
addEventListeners()
