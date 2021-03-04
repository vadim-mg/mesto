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
const editButton = profileInfo.querySelector('.profile__edit-button');
const profileName = profileInfo.querySelector('.profile__name');
const profileDescription = profileInfo.querySelector('.profile__description');

const popup = document.querySelector('.popup');
const popupContainer = popup.querySelector('.popup__container');
const closePopupButton = popupContainer.querySelector('.popup__close-button');
const popupName = popupContainer.querySelector('#name');
const popupDescription = popupContainer.querySelector('#description');


const elements = document.querySelector('.elements');
const cardTemplate = elements.querySelector('#card-template').content.querySelector('.element');

initialCards.forEach(function (item) {
  const card = cardTemplate.cloneNode(true);
  console.log(card);
  const image = card.querySelector('.element__image');
  const text = card.querySelector('.element__text');
  image.setAttribute('src', item.link);
  image.setAttribute('alt', item.name);
  text.insertAdjacentText('afterbegin', item.name);
  elements.insertAdjacentElement('beforeend', card);
});


// Показыавем POPUP
function showPopup() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}

// Закрываем POPUP
function closePopup() {
  popup.classList.remove('popup_opened');
}

// Передаем данные из POPUP на страницу
function savePopup(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup();
}

// Вешаем обработчики событий на кнопки
editButton.addEventListener('click', showPopup);
closePopupButton.addEventListener('click', closePopup);
popupContainer.addEventListener('submit', savePopup);


