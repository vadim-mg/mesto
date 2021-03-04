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
profileEditButton.addEventListener('click', showEditProfile);
const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', showAddPlace);
const elements = document.querySelector('.elements');
const cardTemplate = elements.querySelector('#card-template').content.querySelector('.element');

//Выводим все карточки
initialCards.forEach(function (item) {
  const card = cardTemplate.cloneNode(true);
  const image = card.querySelector('.element__image');
  const text = card.querySelector('.element__text');
  image.setAttribute('src', item.link);
  image.setAttribute('alt', item.name);
  text.insertAdjacentText('afterbegin', item.name);
  elements.insertAdjacentElement('beforeend', card);
});

//Вешаем обработчики
const popups = document.querySelectorAll('.popup');
popups.forEach(function (popup) {
  popup.querySelector('.popup__close-button').addEventListener(
    'click',
    (evt) => { togglePopup(evt.target.closest('.popup')); }
  );

  if (popup.classList.contains('popup_edit')) {
    popup.querySelector('.popup__button').addEventListener('click', saveProfile);
  } else if (popup.classList.contains('popup_add')) {
    popup.querySelector('.popup__button').addEventListener('click', addPlace);
  }

});


// Показ - скрытие модального окна
function togglePopup(popup) {
  popup.classList.toggle('popup_opened');
}

// Редактирование профиля
function showEditProfile() {
  const popup = document.querySelector('.popup_edit');
  popup.querySelector('[name="name"]').value = profileName.textContent;
  popup.querySelector('[name="description"]').value = profileDescription.textContent;
  togglePopup(popup);
}

// Сохранение профиля
function saveProfile(evt) {
  evt.preventDefault();
  const formFields = evt.target.closest('.popup__fields');
  profileName.textContent = formFields.querySelector('[name="name"]').value;
  profileDescription.textContent = formFields.querySelector('[name="description"]').value;
  togglePopup(formFields.closest('.popup'));
}

// Форма добавления нового места
function showAddPlace() {
  const popup = document.querySelector('.popup_add');
  popup.querySelector('[name="place"]').value = '';
  popup.querySelector('[name="url"]').value = '';
  togglePopup(popup);
}

// Добавление новогоо места
function addPlace(evt) {
  evt.preventDefault();
  console.log('addPlaace');
}

// Вешаем обработчики событий на кнопки


