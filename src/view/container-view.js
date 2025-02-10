import {createElement} from '../render.js';
function createContainerTemplate() {
  return '<section class="page-body__container"></section>';
}

export default class ContainerView {
  getTemplate() {
    return createContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
