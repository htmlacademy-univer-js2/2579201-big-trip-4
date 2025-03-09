import { EVENT_TYPES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getAvailableOffers, getDestinationByName, getOfferById } from '../mock/createEvent.js';
import { mockDestinations, mockOffers } from '../mock/event.js';
import { getDateTime } from '../utils/utils.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function generateEventTypeRadio(eventType){
  return EVENT_TYPES.map((type) => `<div class="event__type-item">
  <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}"  ${eventType === type ? 'checked' : ''}>
  <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${type}</label>
</div>`).join('');
}

function generateDestinations(){
  return mockDestinations.map((dest)=> `<option value=${dest.name}></option>`).join('');
}

function generateDestinationPhoto(photo){
  return `<img class="event__photo" src=${photo.src} alt=${photo.description}>`;
}

function createOffersTemplate(offer, checked){
  const {id, title, price} = offer;
  return `
  <div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="event-offer-${id}" ${checked ? 'checked' : ''}>
    <label class="event__offer-label" for="${id}">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;
}

function createEditFormTemplate(event) {
  const {destination, type, price, startDate, endDate, offers, disabled} = event;

  const isPriceValid = !isNaN(Number(price)) && Number(price) > 0;
  const isDestinationValid = !!destination.name;
  const isDateValid = startDate < endDate;
  const isValid = isDestinationValid && isDateValid && isPriceValid;
  const saveButtonDisabled = !isValid;

  const availableOffers = getAvailableOffers(type, mockOffers);
  const offersLayout = availableOffers.map((offer) =>{
    const isChecked = offers.some((eventOffer) => eventOffer.id === offer.id);
    return createOffersTemplate(offer, isChecked);
  }).join('');
  const destinationPhotos = destination.pictures.map((photo) => generateDestinationPhoto(photo)).join('');
  return `
  <li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        ${generateEventTypeRadio(type)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                     ${generateDestinations()}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateTime(startDate)}">
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateTime(endDate)}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn btn--blue" ${disabled || saveButtonDisabled ? 'disabled' : ''} type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                     ${offersLayout}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.description}</p>
                     <div class="event__photos-container">
                      <div class="event__photos-tape">
                       ${destinationPhotos}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
              </li>`;
}

export default class EditFormView extends AbstractStatefulView{
  #handleCloseForm = null;
  #startDatepicker = null;
  #endDatepicker = null;
  #handleFormSubmit = null;
  #handleDeleteClick = null;

  constructor({event, closeForm, handleFormSubmit, handleDeleteClick}){
    super();
    this._setState({...event, disabled: false});
    this.#handleCloseForm = closeForm;
    this.#handleFormSubmit = handleFormSubmit;
    this.#handleDeleteClick = handleDeleteClick;
    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this.#startDatepicker) {
      this.#startDatepicker.destroy();
      this.#startDatepicker = null;
    }
    if (this.#endDatepicker){
      this.#endDatepicker.destroy();
      this.#endDatepicker = null;
    }
  }

  _restoreHandlers(){
    this.element.querySelector('form').addEventListener('submit', this.#onFormSubmit);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeFormHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeType);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestination);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#changeOffers);
    this.element.querySelector('.event__input--price').addEventListener('input', this.#changePrice);
    this.#setDatepicker();
  }

  get template() {
    return createEditFormTemplate(this._state);
  }

  #closeFormHandler = (e) =>{
    e.preventDefault();
    this.#handleCloseForm();
  };

  #onFormSubmit = (e)=>{
    e.preventDefault();
    this.#handleFormSubmit(this.#fromStateToEvent(this._state));
    this.#handleCloseForm();
  };

  #formDeleteClickHandler = (e) => {
    e.preventDefault();
    this.#handleDeleteClick(this.#fromStateToEvent(this._state));
    this.#handleCloseForm();
  };

  #startDateChangeHandler = ([userDate]) => {
    this.updateElement({
      startDate: userDate,
    });
  };

  #endDateChangeHandler = ([userDate]) => {
    this.updateElement({
      endDate: userDate,
    });
  };

  #setDatepicker() {
    this.#startDatepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.startDate,
        onChange: (selectedDates) => {
          this.#startDateChangeHandler(selectedDates);
          if (this.#endDatepicker) {
            this.#endDatepicker.set('minDate', selectedDates[0]);
          }
        }
      },
    );
    this.#endDatepicker = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        minDate: this._state.startDate,
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.startDate > this._state.endDate ? this._state.startDate : this._state.endDate,
        onChange: this.#endDateChangeHandler,
      });
  }

  #changeType = (event) => {
    event.preventDefault();
    this.updateElement({
      type: event.target.value,
      offers: [],
    });
  };

  #changeOffers = (event) =>{
    event.preventDefault();
    const offer = getOfferById(event.target.id, getAvailableOffers(this._state.type, mockOffers));
    const { offers } = this._state;
    const isOfferSelected = offers.some((selectedOffer) => selectedOffer.id === offer.id);
    const newOffers = isOfferSelected ? offers.filter((selectedOffer) => selectedOffer.id !== offer.id) : [...offers, offer];
    this.updateElement({ offers: newOffers });
  };

  #changeDestination = (event) =>{
    event.preventDefault();
    const newDestinationName = event.target.value;
    const newDestination = getDestinationByName(newDestinationName, mockDestinations);
    this.updateElement({
      destination: newDestination || {...this._state.destination, name:  newDestinationName},
      disabled: !newDestination,
    });
  };


  #changePrice = (event) =>{
    this._setState({
      price: event.target.value,
    });
  };


  #fromStateToEvent(state){
    const event = {...state};
    delete event.disabled;
    return event;
  }
}
