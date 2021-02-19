// Выбираем все нужные элементы из профиля
let profileInfo = document.querySelector('.profile__info');
let editButton = profileInfo.querySelector('.profile__edit-button');
let profileName = profileInfo.querySelector('.profile__name');
let profileDescription = profileInfo.querySelector('.profile__description');

// Выбираем все нужные элементы из POPUP
let popup = document.querySelector('.popup');
let closePopupButton = popup.querySelector('.popup__close-icon');
let popupName = popup.querySelector('#name');
let popupDescription = popup.querySelector('#description');

// Показыавем POPUP
function showPopup() {
  // console.log(popupName);
  // console.log(popupDescription);
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
function savePopup(evt){
  // debugger;
  evt.preventDefault();
  profileName.innerText = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup();
}


// Вешаем обработчики событий на кнопки
editButton.addEventListener('click', showPopup);
closePopupButton.addEventListener('click', closePopup);
popup.addEventListener('submit', savePopup);
