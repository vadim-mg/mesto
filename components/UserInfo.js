
/**
 * Класс для работы с профилем пользователя
 */
export default class UserInfo {
  constructor({nameSelector, descriptionSelector}){
    this._name = document.querySelector(nameSelector)
    this._description = document.querySelector(descriptionSelector)
  }

  getUserInfo(){
    return {
      name: this._name.textContent,
      description: this._description.textContent
    }
  }

  setUserInfo(name, description){
    this._name.textContent = name,
    this._description.textContent = description
  }
}
