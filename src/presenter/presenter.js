import NewSortView from '../view/sort-view.js';
import NewCreationFormView from '../view/creation-form-view.js';
import NewEditFormView from '../view/edit-form-view.js';
import NewEventView from '../view/event-view.js';
import EventListView from '../view/event-list-view.js';
import NewFiltersView from '../view/filters-view.js';
import {render} from '../render.js';

export default class Presenter {
  eventListComponent = new EventListView();
  constructor({eventModel}) {
    this.eventsContainer = document.querySelector('.trip-events');
    this.filterContainer = document.querySelector('.trip-controls__filters');
    this.eventModel = eventModel;
  }


  init() {
    this.events = [...this.eventModel.getEvents()];

    render(new NewFiltersView(), this.filterContainer);
    render(new NewSortView(), this.eventsContainer);
    render(this.eventListComponent, this.eventsContainer);
    render(new NewEditFormView({event: this.events[0]}), this.eventListComponent.getElement());

    for (let i = 1; i < this.events.length; i++) {
      render(new NewEventView({event: this.events[i]}), this.eventListComponent.getElement());
    }

    render(new NewCreationFormView(), this.eventListComponent.getElement());
  }
}
