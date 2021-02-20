// Выбираем все нужные элементы из профиля
let profileInfo = document.querySelector('.profile__info');
let editButton = profileInfo.querySelector('.profile__edit-button');
let profileName = profileInfo.querySelector('.profile__name');
let profileDescription = profileInfo.querySelector('.profile__description');

// Выбираем все нужные элементы из POPUP
let popup = document.querySelector('.popup');
let popupContainer = popup.querySelector('.popup__container');
let closePopupButton = popupContainer.querySelector('.popup__close-icon');
let popupName = popupContainer.querySelector('#name');
let popupDescription = popupContainer.querySelector('#description');

// Показыавем POPUP
function showPopup() {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  popup.classList.add('popup_opened');
}

// Закрываем POPUP
function closePopup() {
  popup.classList.remove('popup_opened');
  popupName.value = '';
  popupDescription.value = '';
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
