
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
    profileAddPlaceButtonSelector },
    editProfilFunction,
    addPlaceFunction
  ) {
    const profile =
      document.querySelector(profileSelector)
    this._name =
      profile.querySelector(profileNameSelector)
    this._description =
      profile.querySelector(profileDescriptionSelector)
    this._avatar =
      profile.querySelector(profileAvatarSelector)
    this._profileEditButton =
      profile.querySelector(profileEditButtonSelector)
    this._placeAddButton =
      profile.querySelector(profileAddPlaceButtonSelector)

    this._buttonHiddenClass = profileEditButtonHiddenClass

    this._editProfileFunction = editProfilFunction
    this._addPlaceFunction = addPlaceFunction
  }

  getUserInfo = () => {
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  }


  setUserInfo = (name, description) => {
    this._name.textContent = name
    this._description.textContent = description
  }


  setAvatar = url =>
    this._avatar.src = url


  showEditButton = () =>
    this._profileEditButton
      .classList.remove(this._buttonHiddenClass)


  setEventListeners = () => {
    this._profileEditButton
      .addEventListener('click', () => {
        this._editProfileFunction(this.getUserInfo())
      })
    this._placeAddButton
      .addEventListener('click', () => {
        this._addPlaceFunction()
      })
  }
}
