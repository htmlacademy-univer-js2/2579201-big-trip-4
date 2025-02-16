import NewSortView from '../view/sort-view.js';
import NewCreationFormView from '../view/creation-form-view.js';
import NewEditFormView from '../view/edit-form-view.js';
import NewEventView from '../view/event-view.js';
import EventListView from '../view/event-list-view.js';
import NewFiltersView from '../view/filters-view.js';
import { render, replace } from '../framework/render.js';

export default class Presenter {
  #eventListComponent = new EventListView();
  #eventsContainer = null;
  #filterContainer = null;
  #eventModel = null;
  constructor({eventModel}) {
    this.#eventsContainer = document.querySelector('.trip-events');
    this.#filterContainer = document.querySelector('.trip-controls__filters');
    this.#eventModel = eventModel;
  }


  init() {
    this.events = [...this.#eventModel.events];

    render(new NewFiltersView(), this.#filterContainer);
    render(new NewSortView(), this.#eventsContainer);
    render(this.#eventListComponent, this.#eventsContainer);

    for (let i = 0; i < this.events.length; i++) {
      this.#renderEvents(this.events[i]);
    }

    render(new NewCreationFormView(), this.#eventListComponent.element);
  }

  #renderEvents(event){
    const escKeyHandler = (e)=>{
      if(e.key === 'Escape'){
        e.preventDefault();
        closeEditor();
        document.removeEventListener('keydown', escKeyHandler);
      }
    };
    const eventComponent = new NewEventView({event, onArrowClick: ()=>{
      openEditor();
      document.addEventListener('keydown', escKeyHandler);
    }});
    const eventEditComponent = new NewEditFormView({event, closeForm: ()=>{
      document.addEventListener('keydown', escKeyHandler);
      closeEditor();
    }});


    function openEditor(){
      replace(eventEditComponent, eventComponent);
    }

    function closeEditor(){
      document.removeEventListener('keydown', escKeyHandler);
      replace(eventComponent, eventEditComponent);

    }
    render(eventComponent, this.#eventListComponent.element);
  }

}
