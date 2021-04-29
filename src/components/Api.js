export default class Api {
  constructor({ token, baseUrl }) {
    this.token = token
    this.baseUrl = baseUrl
  }

  loadUserInfo() {
    return fetch(this.baseUrl + 'users/me',
      {
        headers: { authorization: this.token }
      })
      .then(res => res.ok
        ? res.json()
        : Promise.reject(` Status Code: ${res.status}`)
      )
      .catch(err => console.error(`Ошибка: ${err}`))
  }

  loadCards() {
    return fetch(this.baseUrl + 'cards',
      {
        headers: { authorization: this.token }
      })
      .then(res => res.ok
        ? res.json()
        : Promise.reject(` Status Code: ${res.status}`)
      )
      .catch(err => console.error(`Ошибка: ${err}`))
  }
}
