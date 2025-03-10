import SortView from '../view/sort-view.js';
import CreationFormView from '../view/creation-form-view.js';
import EventListView from '../view/event-list-view.js';
import { remove, render } from '../framework/render.js';
import EventPresenter from './eventPresenter.js';
import { UpdateType, UserAction } from '../const.js';
import { filter } from '../utils/filter.js';
import EmptyListView from '../view/empty-list-view.js';
import LoadingView from '../view/loading-view.js';

export default class Presenter {
  #eventListComponent = new EventListView();
  #eventsContainer = null;
  #eventModel = null;
  #eventPresenters = new Map();
  #filterModel = null;
  #isLoading = true;
  #sortComponent = new SortView();
  #loadingComponent = new LoadingView();


  constructor({eventModel, filterModel}) {
    this.#eventsContainer = document.querySelector('.trip-events');
    this.#eventModel = eventModel;
    this.#filterModel = filterModel;

    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#eventModel.addObserver(this.#handleModelEvent);
  }

  get events(){
    const filterType = this.#filterModel.filter;
    const events = this.#eventModel.events;
    const filteredEvents = filter[filterType](events);
    return filteredEvents;
  }

  init() {
    this.#renderBoard();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderBoard();
        break;
    }
  };

  #renderBoard(){
    render(this.#sortComponent, this.#eventsContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    render(this.#eventListComponent, this.#eventsContainer);
    const events = this.events;
    if (events.length > 0){
      for (let i = 0; i < events.length; i++) {
        this.#renderEvents(events[i]);
      }
    } else{
      render(new EmptyListView({filterType: this.#filterModel.filter}),this.#eventListComponent.element);
    }
    render(new CreationFormView(), this.#eventListComponent.element);
  }

  #clearBoard() {
    remove(this.#eventListComponent);
    remove(this.#sortComponent);
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderEvents(event){
    const eventPresenter = new EventPresenter({eventListComponent: this.#eventListComponent, handleEventChange: this.#handleViewAction, handleModeChange: this.#handleModeChange, destinations: this.#eventModel.destinations, offers: this.#eventModel.offers});
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);

  }

  #renderLoading(){
    render(this.#loadingComponent, this.#eventsContainer);
  }

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };
}
