

// Выбираем все нужные элементы
const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileDescription = profileInfo.querySelector('.profile__description');

const elementsBlock = document.querySelector('.elements');
const cardTemplate = elementsBlock.querySelector('#card-template').content.querySelector('.element');

const popupEditProfile = document.querySelector('.popup_edit');
const profileNameField = popupEditProfile.querySelector('[name="name"]');
const profileDescriptionField = popupEditProfile.querySelector('[name="description"]');

const popupAddForm = document.querySelector('.popup_add');
const popupViewForm = document.querySelector('.popup_view');


//Выводим все карточки
function renderList() {
  // Карточки, которые будут загружены на страницу
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  initialCards.forEach(function (item) {
    addCard(item, true);
  });
}

/**
 *  Вывод карточки в область elementsBlock
 *
 * @param {string} name название
 * @param {string} url ссылка
 * @param {boolean} insertToEnd - вставка в конец, по умолчанию втавка в начало
 */
function addCard(item, insertToEnd = true) {
  const card = cardTemplate.cloneNode(true);
  const image = card.querySelector('.element__image');
  const text = card.querySelector('.element__text');
  const LikeBtn = card.querySelector('.element__like');
  const BinBtn = card.querySelector('.element__bin');
  image.setAttribute('src', item.link);
  image.setAttribute('alt', item.name);
  text.textContent = item.name;
  if (insertToEnd) {
    elementsBlock.append(card);
  } else {
    elementsBlock.prepend(card);
  }
  // вешаем смену стилей на лайк
  LikeBtn.addEventListener('click', (evt) => { evt.target.classList.toggle('element__like_active') });
  // вешаем удаление на иконку корзины
  BinBtn.addEventListener('click', (evt) => { evt.target.closest('.element').remove(); });
  // вешаем открытие попапа с изображение по клику
  image.addEventListener('click', showPopupViewPicture);
}

/**
 * Вешаем обработчики
 */
function addEventListeners() {
  const profileEditButton = profileInfo.querySelector('.profile__edit-button');
  const profileAddButton = document.querySelector('.profile__add-button');

  profileEditButton.addEventListener('click', showEditProfile);
  profileAddButton.addEventListener('click', () => { openPopup(popupAddForm); });
  popupEditProfile.addEventListener('submit', saveProfile);
  popupAddForm.addEventListener('submit', saveCard);
  // закрытие попапов по кликам на крестик
  document.querySelectorAll('.popup__close-button').forEach(function (closeBtn) {
    closeBtn.addEventListener('click', (evt) => { closePopup(evt.target.closest('.popup')); });
  });
}

/**
 * открытие попапа popup
 */
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

/**
 * закрытие попапа popup
 */
function closePopup(popup) {
  /* класс popup_hide-animation плавно меняет прозарчность до нуля */
  popup.classList.add('popup_hide-animation');
  popup.classList.remove('popup_opened');
  /* удаляем popup_hide-animation после того как закончится анимация */
  setTimeout(() => popup.classList.remove('popup_hide-animation'), 1000);
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
  evt.preventDefault();
  profileName.textContent = profileNameField.value;
  profileDescription.textContent = profileDescriptionField.value;
  closePopup(popupEditProfile);
}

/**
 * Добавление карточки
 */
function saveCard(evt) {
  evt.preventDefault();
  const popupAddPlace = popupAddForm.querySelector('[name="place"]');
  const popupAddUrl = popupAddForm.querySelector('[name="url"]');
  addCard({ name: popupAddPlace.value, link: popupAddUrl.value }, false);
  closePopup(popupAddForm);
  popupAddPlace.value = '';
  popupAddUrl.value = '';
}

/**
 * Показыаем карточку на весь экран
  */
function showPopupViewPicture(evt) {
  const image = evt.target.getAttribute('src');
  const name = evt.target.getAttribute('alt');
  const popupImage = popupViewForm.querySelector('.popup__picture-image');
  const popupName = popupViewForm.querySelector('.popup__picture-name');
  popupImage.setAttribute('src', image);
  popupImage.setAttribute('alt', name);
  popupName.textContent = name;
  openPopup(popupViewForm);
}


renderList();
addEventListeners();
