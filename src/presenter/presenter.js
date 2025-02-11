import NewSortView from '../view/sort-view.js';
import NewCreationFormView from '../view/creation-form-view.js';
import NewEditFormView from '../view/edit-form-view.js';
import NewEventView from '../view/event-view.js';
import EventListView from '../view/event-list-view.js';
import NewFiltersView from '../view/filters-view.js';
import {render} from '../render.js';

export default class Presenter {
  eventListComponent = new EventListView();

  constructor() {
    this.eventsContainer = document.querySelector('.trip-events');
    this.filterContainer = document.querySelector('.trip-controls__filters');
  }


  init() {
    render(new NewFiltersView(), this.filterContainer);
    render(new NewSortView(), this.eventsContainer);
    render(this.eventListComponent, this.eventsContainer);
    render(new NewEditFormView(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new NewEventView(), this.eventListComponent.getElement());
    }

    render(new NewCreationFormView(), this.eventListComponent.getElement());
  }
}
