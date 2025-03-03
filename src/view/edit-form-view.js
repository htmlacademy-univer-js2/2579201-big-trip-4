import { EVENT_TYPES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getAvailableOffers, getDestinationByName } from '../mock/createEvent.js';
import { mockDestinations, mockOffers } from '../mock/event.js';
import { getDateTime } from '../utils.js';
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
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}-1" type="checkbox" name="event-offer-${id}" ${checked ? 'checked' : ''}>
    <label class="event__offer-label" for="event-offer-${id}-1">
      <span class="event__offer-title">${title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    </label>
  </div>`;
}

function createEditFormTemplate(event) {
  const {destination, type, price, startDate, endDate, offers} = event;
  const availableOffers = getAvailableOffers(event, mockOffers);
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
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
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
  #datepicker = null;
  constructor({event, closeForm}){
    super();
    this._setState({...event});
    this.#handleCloseForm = closeForm;

    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  _restoreHandlers(){
    this.element.querySelector('form').addEventListener('submit', this.#closeFormHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#closeFormHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#changeType);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#changeDestination);
    this.#setDatepicker();
  }

  get template() {
    return createEditFormTemplate(this._state);
  }

  #closeFormHandler = (e) =>{
    e.preventDefault();
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
    this.#datepicker = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.startDate,
        onChange: this.#startDateChangeHandler,
      },
      this.#datepicker = flatpickr(
        this.element.querySelector('#event-end-time-1'),
        {
          minDate: this._state.startDate,
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.startDate,
          onChange: this.#endDateChangeHandler,
        }
      )
    );
  }


  #changeType = (event) => {
    event.preventDefault();
    this.updateElement({
      type: event.target.value
    });
  };

  #changeDestination = (event) =>{
    event.preventDefault();

    this.updateElement({
      destination: getDestinationByName(event.target.value, mockDestinations),
    });
  };

}
