export default class Section {

  /**
   * Создание экземляра отрисовщика
   * @param {Array } items - массив элементов
   * @param {function } renderer - фукция рендеринга
   * @param {String} containerSelector - селектор контейнера куда будут добавляться элементы
   */
  constructor({ items, renderer }, containerSelector) {
    this._renderdItems = items
    this._renderer = renderer
    this._container = document.querySelector(containerSelector)
  }

  /**
   * Отрисовка всех элементов this._renderdItems
   */
  renderer() {
    this._renderdItems.forEach((item) => {
      this._renderer(item)
    })
  }

  /**
   * Добавление
   * @param {Node} element
   */
  addItem(element) {
    this._container.prepend(element)
  }
}
