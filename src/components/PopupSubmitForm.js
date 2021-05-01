import PopupWithForm from './PopupWithForm.js'

export default class PopupSubmitForm extends PopupWithForm {

  open(subject, method) {
    if(super.open()){
      this.subject = subject
      this._method = method
      return true
    }
    return false
  }

  submit() {
    this._method.bind(this.subject)()
  }

}
