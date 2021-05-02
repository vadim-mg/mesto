
/**
 * Класс для работы с профилем пользователя
 */
export default class UserInfo {
  constructor({
    profileSelector,
    profileNameSelector,
    profileDescriptionSelector,
    profileAvatarSelector,
    profileAvatarEditSelector,
    profileAvatarInvisibleClass,
    profileEditButtonSelector,
    profileEditButtonHiddenClass,
    profileAddPlaceButtonSelector },
    editProfilFunction,
    addPlaceFunction,
    updateAvatarFunction
  ) {
    const profile =
      document.querySelector(profileSelector)
    this._name =
      profile.querySelector(profileNameSelector)
    this._description =
      profile.querySelector(profileDescriptionSelector)
    this._avatar =
      profile.querySelector(profileAvatarSelector)
    this._avatarEditButton =
      profile.querySelector(profileAvatarEditSelector)
    this._profileEditButton =
      profile.querySelector(profileEditButtonSelector)
    this._placeAddButton =
      profile.querySelector(profileAddPlaceButtonSelector)

    this._buttonHiddenClass = profileEditButtonHiddenClass
    this._avatarInvisibleClass = profileAvatarInvisibleClass

    this._editProfileFunction = editProfilFunction
    this._updateAvatarFunction = updateAvatarFunction
    this._addPlaceFunction = addPlaceFunction
  }

  getUserInfo = () => {
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  }


  setUserInfo = ({ name, about, _id }) => {
    this._name.textContent = name
    this._description.textContent = about
    this._id = _id
  }

  itIsMe = id => id === this._id


  setAvatar = url => {
    this._avatar.src = url
    this._avatar.classList.remove(this._avatarInvisibleClass)
  }


  showEditButton = () =>
    this._profileEditButton
      .classList.remove(this._buttonHiddenClass)


  setEventListeners = () => {
    this._profileEditButton
      .addEventListener('click', () => {
        this._editProfileFunction(this.getUserInfo())
      })
    this._avatarEditButton
      .addEventListener('click', () => {
        this._updateAvatarFunction({ link: this._avatar.src })
      })
    this._placeAddButton
      .addEventListener('click', () => {
        this._addPlaceFunction()
      })
  }
}
