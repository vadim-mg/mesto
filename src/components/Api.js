// import { get } from "core-js/core/dict"

export default class Api {
  constructor({ token, baseUrl }) {
    this.token = token
    this.baseUrl = baseUrl
  }

  _fetch = (adress, error = 'какая-то ошибка', method1 = 'GET', rest) => fetch(
    this.baseUrl + adress,
    {
      method: method1,
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rest)
    })
    .then(res => res.ok
      ? res.json()
      : Promise.reject(`[${error}] Ошибка запроса: ${res.url} ${res.status}`)
    )


  loadUserInfo = () => this._fetch(
    'users/me',
    'Ошибка загрузки профиля'
  )

  saveUserInfo = (name, about) => this._fetch(
    'users/me',
    'Профиль не сохранился',
    'PATCH',
    { name: name, about: about }
  )

  loadCards = () => this._fetch(
    'cards',
    'Ошибка загрузки карточек'
  )

  saveCard = ({link, name}) => this._fetch(
    'cards',
    'Ошибка сохранения карточки',
    'POST',
    {name: name, link: link}
  )

  deleteCard = (id) => this._fetch(
    'cards/'+id,
    'Ошибка удаления карточки',
    'DELETE'
  )

  like = (id, set = true) => this._fetch(
    'cards/likes/' + id,
    `Ошибка ${set ? 'установки' : 'снятия'} лайка`,
    set ? 'PUT' :'DELETE'
  )
}







