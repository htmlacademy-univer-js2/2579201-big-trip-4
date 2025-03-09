import { EmptyMessages } from '../const';
import AbstractStatefulView from '../framework/view/abstract-stateful-view';

function createEmptyListTemplate(filterType) {
  return `<p class="trip-events__msg">${EmptyMessages[filterType]}</p>`;
}

export default class EmptyListView extends AbstractStatefulView {
  #filterType = null;

  constructor({filterType}) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEmptyListTemplate(this.#filterType);
  }
}
