export default class Section {

  /**
   * Создание экземляра отрисовщика
   * @param {Array } items - массив элементов
   * @param {String} containerSelector - селектор контейнера куда будут добавляться элементы
   */
  constructor(items, containerSelector) {
    this._renderdItems = items
    this._container = document.querySelector(containerSelector)
  }


  /**
   * Добавление
   * @param {Node} element
   * @param {boolean} if prepend than will use prepend
   */
  addItem(element, prepend) {
    if (prepend)
      this._container.prepend(element)
    else
      this._container.append(element)
  }
}
