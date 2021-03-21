// Выбираем все нужные элементы
const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileDescription = profileInfo.querySelector('.profile__description');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const elementsBlock = document.querySelector('.elements');
const cardTemplate = elementsBlock.querySelector('#card-template').content.querySelector('.element');

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

const closeButtons = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll('.popup');



/**
 * Выводим все карточки
 */
function renderList() {
  initialCards.forEach(function (item) {
    renderCard(item, elementsBlock);
  });
}

/**
 *  Возвращает DOM элемент вновь созданной карточки
 * @param {string:name,string:link} item - объект карточки
 */
function createCard(item) {
  const card = cardTemplate.cloneNode(true);
  const image = card.querySelector('.element__image');
  const text = card.querySelector('.element__text');
  const likeButton = card.querySelector('.element__like');
  const binButton = card.querySelector('.element__bin');

  // заполняем карточку
  image.src = item.link;
  image.alt = item.name;
  text.textContent = item.name;

  // вешаем обработчики
  likeButton.addEventListener('click', handleLikeIcon);
  binButton.addEventListener('click', handleDeleteCard);
  image.addEventListener('click', () => showPopupViewPicture(item));

  return card;
}

/**
 * Добавление карточки data в разметку в начало элемента wrap
 * @param {node} data
 * @param {node} wrap
 */
function renderCard(data, wrap) {
  wrap.prepend(createCard(data));
}

/**
 * смена стилей на лайке
 */
function handleLikeIcon(evt) {
  evt.target.classList.toggle('element__like_active');
}

/**
 * удаление карточки
 */
function handleDeleteCard(evt) {
  evt.target.closest('.element').remove();
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
}

/**
 * открытие попапа popup
 */
function openPopup(popup) {
  validatePreOpenPopup(popup, validationParams);
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', escEventLestener);
}

/**
 * закрытие попапа popup
 */
function closePopup(popup) {
  document.removeEventListener('keydown', escEventLestener);
  popup.classList.remove('popup_opened');
}

/**
 * закрытие попапов по ESC
 * @param {event} evt
 */
const escEventLestener = (evt) => {
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
function saveProfile(evt) {
  profileName.textContent = profileNameField.value;
  profileDescription.textContent = profileDescriptionField.value;
  closePopup(popupEditProfile);
}

/**
 * Добавление карточки
 */
function saveCard(evt) {
  renderCard({ name: popupAddPlace.value, link: popupAddUrl.value }, elementsBlock);
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
