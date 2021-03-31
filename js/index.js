import { Card } from './Card.js';

// Выбираем все нужные элементы
const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileDescription = profileInfo.querySelector('.profile__description');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const elementsBlock = document.querySelector('.elements');


const popupEditProfile = document.querySelector('.popup_edit');
const profileNameField = popupEditProfile.querySelector('[name="name"]');
const profileDescriptionField = popupEditProfile.querySelector('[name="description"]');

const popupAddNewPlace = document.querySelector('.popup_add');
const popupAddNewPlaceForm = popupAddNewPlace.querySelector('.popup__container');
const popupAddPlace = popupAddNewPlaceForm.querySelector('[name="place"]');
const popupAddUrl = popupAddNewPlaceForm.querySelector('[name="url"]');

const popupViewForm = document.querySelector('.popup_view');
const popupImage = popupViewForm.querySelector('.popup__picture-image');
const popupName = popupViewForm.querySelector('.popup__picture-name');

const popups = document.querySelectorAll('.popup');


/**
 * Выводим все карточки
 */
function renderList() {
  initialCards.forEach(function (item) {
    const card = new Card(item, '#card-template');
    renderCard(card.getCard(), elementsBlock);
  });
}


/**
 * Добавление карточки data в разметку в начало элемента wrap
 * @param {Card} card
 * @param {ParentNode} wrap
 */
function renderCard(card, wrap) {
  wrap.prepend(card);
}


/**
 * Вешаем обработчики
 */
function addEventListeners() {
  profileEditButton.addEventListener('click', showEditProfile);
  profileAddButton.addEventListener('click', () => openPopup(popupAddNewPlace));
  popupEditProfile.addEventListener('submit', saveProfile);
  popupAddNewPlace.addEventListener('submit', saveCard);

  // закрытие попапов по клику на оверлей, крестику
  popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
      if ((evt.target === popup) || evt.target.classList.contains('popup__close-button')) {
        closePopup(popup);
      }
    });
  });

  // Открытие картинки для просмотра
  elementsBlock.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__image')) {
      showPopupViewPicture({ link: evt.target.src, name: evt.target.alt });
    }
  })
}

/**
 * открытие попапа popup
 */
function openPopup(popup) {
  validatePreOpenPopup(popup, validationParams);
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escEventListener);
}

/**
 * закрытие попапа popup
 */
function closePopup(popup) {
  document.removeEventListener('keydown', escEventListener);
  popup.classList.remove('popup_opened');
}

/**
 * закрытие попапов по ESC
 * @param {KeyboardEvent} evt
 */
const escEventListener = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

/**
 * Показ формы редактирования профиля
 */
function showEditProfile() {
  profileNameField.value = profileName.textContent;
  profileDescriptionField.value = profileDescription.textContent;
  openPopup(popupEditProfile);
}

/**
 * Сохранение профиля
 */
function saveProfile() {
  profileName.textContent = profileNameField.value;
  profileDescription.textContent = profileDescriptionField.value;
  closePopup(popupEditProfile);
}

/**
 * Добавление карточки
 */
function saveCard() {
  const card = new Card({ name: popupAddPlace.value, link: popupAddUrl.value }, '#card-template');
  renderCard(card.getCard(), elementsBlock);
  closePopup(popupAddNewPlace);
  popupAddNewPlaceForm.reset();
}

/**
 * Показыаем карточку на весь экран
 */
function showPopupViewPicture(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupName.textContent = item.name;
  openPopup(popupViewForm);
}


enableValidation(validationParams);
renderList();
addEventListeners();
