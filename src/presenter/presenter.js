import SortView from '../view/sort-view.js';
import CreationFormView from '../view/creation-form-view.js';
import EventListView from '../view/event-list-view.js';
import FiltersView from '../view/filters-view.js';
import { render } from '../framework/render.js';
import EventPresenter from './eventPresenter.js';

export default class Presenter {
  #eventListComponent = new EventListView();
  #eventsContainer = null;
  #filterContainer = null;
  #eventModel = null;
  #events = [];
  #eventPresenters = new Map();

  constructor({eventModel}) {
    this.#eventsContainer = document.querySelector('.trip-events');
    this.#filterContainer = document.querySelector('.trip-controls__filters');
    this.#eventModel = eventModel;
  }


  init() {
    this.#events = [...this.#eventModel.events];

    render(new FiltersView(), this.#filterContainer);
    render(new SortView(), this.#eventsContainer);
    render(this.#eventListComponent, this.#eventsContainer);

    for (let i = 0; i < this.#events.length; i++) {
      this.#renderEvents(this.#events[i]);
    }

    render(new CreationFormView(), this.#eventListComponent.element);
  }

  #renderEvents(event){
    const eventPresenter = new EventPresenter({eventListComponent: this.#eventListComponent, handleEventChange: this.#handleEventChange, handleModeChange: this.#handleModeChange});
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);

  }

  #handleEventChange = (newEvent) =>{
    this.#events = this.#events.map((item) => item.id === newEvent.id ? newEvent : item);
    this.#eventPresenters.get(newEvent.id).init(newEvent);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };
}
