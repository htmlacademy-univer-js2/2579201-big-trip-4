import { UpdateType, UserAction } from '../const';
import { remove, render, replace } from '../framework/render';
import { isDatesEqual } from '../utils/utils';
import EditFormView from '../view/edit-form-view';
import EventView from '../view/event-view';

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

    this.#eventComponent = new EventView({event: this.#event, onArrowClick: ()=>{
      this.#openEditor();
      document.addEventListener('keydown', this.#escKeyHandler);
    }, onStarClick: ()=>{
      this.#updateEvent();
    }
    });

    this.#eventEditComponent = new EditFormView({event: this.#event, closeForm: ()=>{
      document.addEventListener('keydown', this.#escKeyHandler);
      this.#closeEditor();
    }, handleFormSubmit: this.#handleFormSubmit, handleDeleteClick: this.#handleDeleteClick,});

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventListComponent.element);
      return;
    }

    if (!this.#isEditing) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#isEditing) {
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
    this.#onEventChange(UserAction.UPDATE_EVENT, UpdateType.PATCH, {...this.#event, isFavourite: !this.#event.isFavourite});
  };

  #handleFormSubmit = (event) =>{
    const isDatesChanged = !isDatesEqual(this.#event.startDate, event.startDate) || !isDatesEqual(this.#event.endDate, event.endDate);
    this.#onEventChange(UserAction.UPDATE_EVENT, isDatesChanged ? UpdateType.MINOR : UpdateType.PATCH, event);
  };

  resetView() {
    if (this.#isEditing) {
      this.#closeEditor();
    }
  }

  #handleDeleteClick = (event) =>{
    this.#onEventChange(UserAction.DELETE_EVENT, UpdateType.MINOR, event);
  };

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }
}
