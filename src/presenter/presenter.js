import ContainerView from '../view/container-view.js';
import NewSortView from '../view/sort-view.js';
import NewCreationFormView from '../view/creation-form-view.js';
import NewEditFormView from '../view/edit-form-view.js';
import NewEventView from '../view/event-view.js';
import EventListView from '../view/event-list-view.js';
import {render} from '../render.js';

export default class Presenter {
  containerComponent = new ContainerView();
  eventListComponent = new EventListView();

  constructor({container}) {
    this.container = container;
  }


  init() {
    render(this.containerComponent, this.container);
    render(new NewSortView(), this.containerComponent.getElement());
    render(this.eventListComponent, this.containerComponent.getElement());
    render(new NewEditFormView(), this.containerComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new NewEventView(), this.eventListComponent.getElement());
    }

    render(new NewCreationFormView(), this.eventListComponent.getElement());
  }
}
