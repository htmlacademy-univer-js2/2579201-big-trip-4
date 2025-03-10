import { EmptyMessages } from '../const';
import AbstractView from '../framework/view/abstract-view';

function createEmptyListTemplate(filterType) {
  return `<p class="trip-events__msg">${EmptyMessages[filterType]}</p>`;
}

export default class EmptyListView extends AbstractView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
