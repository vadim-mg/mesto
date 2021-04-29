
/**
 * Класс для работы с профилем пользователя
 */
export default class UserInfo {
  constructor({
    profileSelector,
    profileNameSelector,
    profileDescriptionSelector,
    profileAvatarSelector,
    profileEditButtonSelector,
    profileEditButtonHiddenClass,
    profileAddButtonSelector },
    editProfilFunction,
    addPlaceFunction,
    loaderAPIFunction
  ) {
    const profile = document.querySelector(profileSelector)

    this._name = profile.querySelector(profileNameSelector)
    this._description = profile.querySelector(profileDescriptionSelector)
    this._avatar = profile.querySelector(profileAvatarSelector)
    this._profileEditButton = profile.querySelector(profileEditButtonSelector)
    this._profileAddButton = profile.querySelector(profileAddButtonSelector)

    this._buttonHiddenClass = profileEditButtonHiddenClass

    this._editProfileFunction = editProfilFunction
    this._addPlaceFunction = addPlaceFunction
    this._loaderFuncion = loaderAPIFunction
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  }

  setUserInfo(name, description) {
    this._name.textContent = name
    this._description.textContent = description
  }

  setAvatar(url) {
    this._avatar.src = url
  }

  _showEditButton() {
    this._profileEditButton.classList.remove(this._buttonHiddenClass)
  }

  setEventListeners() {
    this._profileEditButton
      .addEventListener('click', () => {
        this._editProfileFunction(this.getUserInfo())
      })
    this._profileAddButton
      .addEventListener('click', () => {
        this._addPlaceFunction()
      })
  }

  show() {
    this._loaderFuncion()
      .then((value) => {
        this.setUserInfo(value.name, value.about)
        this._showEditButton()
        this.setAvatar(value.avatar)
      })
      .catch(() => {
        console.error('Получить данные профиля не удалось')
        this.setUserInfo('Профиль не загружен!', 'Что-то пошло не так...')
      })
  }
}
