export default class Api {
  constructor({ token, baseUrl }) {
    this.token = token
    this.baseUrl = baseUrl
  }

  loadUserInfo() {
    return fetch(this.baseUrl + 'users/me', {
      headers: {
        authorization: this.token
      }
    })
      .then(res => {
        if (res.ok) {
          return Promise.resolve(res.json())
        }
        return Promise.reject(` Status Code: ${res.status}`)
      })
      .catch(err => console.error(`Ошибка: ${err}`))
  }
}
