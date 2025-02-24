import { remove, render, replace } from '../framework/render';
import NewEditFormView from '../view/edit-form-view';
import NewEventView from '../view/event-view';

export default class EventPresenter {
  #eventComponent = null;
  #eventEditComponent = null;
  #eventListComponent = null;

  #onEventChange = null;
  #handleModeChange = null;
  #event = null;

  #isEditing = false;


  constructor({eventListComponent, handleEventChange, handleModeChange}){
    this.#eventListComponent = eventListComponent;
    this.#onEventChange = handleEventChange;
    this.#handleModeChange = handleModeChange;
  }

  init(event){
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new NewEventView({event: this.#event, onArrowClick: ()=>{
      this.#openEditor();
      document.addEventListener('keydown', this.#escKeyHandler);
    }, onStarClick: ()=>{
      this.#updateEvent();
    }});

    this.#eventEditComponent = new NewEditFormView({event: this.#event, closeForm: ()=>{
      document.addEventListener('keydown', this.#escKeyHandler);
      this.#closeEditor();
    }});

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventListComponent.element);
      return;
    }

    if (this.#eventListComponent.element.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#eventListComponent.element.contains(prevEventEditComponent.element)) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }
    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  #escKeyHandler = (e)=> {
    if(e.key === 'Escape'){
      e.preventDefault();
      this.#closeEditor();
      document.removeEventListener('keydown', this.#escKeyHandler);
    }
  };

  #openEditor = () => {
    replace(this.#eventEditComponent, this.#eventComponent);
    this.#handleModeChange();
    this.#isEditing = true;
  };

  #closeEditor = () => {
    document.removeEventListener('keydown', this.#escKeyHandler);
    replace(this.#eventComponent, this.#eventEditComponent);
    this.#isEditing = false;
  };

  #updateEvent = () => {
    this.#onEventChange({...this.#event, isFavourite: !this.#event.isFavourite});
  };

  resetView() {
    if (this.#isEditing) {
      this.#closeEditor();
    }
  }
}
