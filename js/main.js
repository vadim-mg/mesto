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

// Выбираем все нужные элементы
const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileDescription = profileInfo.querySelector('.profile__description');
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const elements = document.querySelector('.elements');
const cardTemplate = elements.querySelector('#card-template').content.querySelector('.element');

const popupEdit = document.querySelector('.popup_edit');
const popupEditName = popupEdit.querySelector('[name="name"]');
const popupEditDesctiption = popupEdit.querySelector('[name="description"]');

const popupAdd = document.querySelector('.popup_add');


//Выводим все карточки
initialCards.forEach(function (item) {
  addCard(item, true);
});


/**
 *  Вывод карточки в область elements
 *
 * @param {string} name название
 * @param {string} url ссылка
 * @param {boolean} insertToEnd - вставка в конец, по умолчанию втавка в начало
 */
function addCard(item, insertToEnd = true) {
  const card = cardTemplate.cloneNode(true);
  const image = card.querySelector('.element__image');
  const text = card.querySelector('.element__text');
  image.setAttribute('src', item.link);
  image.setAttribute('alt', item.name);
  text.textContent = item.name;
  if (insertToEnd) {
    elements.append(card);
  } else {
    elements.prepend(card);
  }
}


/**
 * Вешаем обработчики
 */
profileEditButton.addEventListener('click', showEditProfile);
profileAddButton.addEventListener('click', () => { togglePopup(popupAdd); });
popupEdit.addEventListener('submit', saveProfile);
popupAdd.addEventListener('submit', saveCard);
document.querySelectorAll('.popup__close-button').forEach(function (closeBtn) {
  closeBtn.addEventListener('click', (evt) => { togglePopup(evt.target.closest('.popup')); });
});

/**
 *  Закрытие/открытие попапа
 * @param {Node} popup - объект попапа
 */
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

/**
 * Показ формы редактирования профиля
 */
function showEditProfile() {
  popupEditName.value = profileName.textContent;
  popupEditDesctiption.value = profileDescription.textContent;
  togglePopup(popupEdit);
}

/**
 * Сохранение профиля
 */
function saveProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditName.value;
  profileDescription.textContent = popupEditDesctiption.value;
  togglePopup(popupEdit);
}

/**
 * Добавление карточки
 */
function saveCard(evt) {
  evt.preventDefault();
  const popupAddPlace = popupAdd.querySelector('[name="place"]');
  const popupAddUrl = popupAdd.querySelector('[name="url"]');
  addCard({ name: popupAddPlace.value, link: popupAddUrl.value }, false);
  togglePopup(popupAdd);
  popupAddPlace.value = '';
  popupAddUrl.value = '';
}





