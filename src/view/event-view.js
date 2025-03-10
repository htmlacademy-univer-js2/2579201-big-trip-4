import AbstractView from '../framework/view/abstract-view.js';
import { getDateTime, getEventDuration } from '../utils/utils.js';

function createOffersTemplate(offer){
  const {title, price} = offer;
  return `
  <li class="event__offer">
    <span class="event__offer-title">${title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${price}</span>
    </li>`;
}

function createEventTemplate(event) {
  const {destination, type, price, startDate, endDate, isFavourite, offers} = event;
  const favoutriteClassName = isFavourite ? 'event__favorite-btn event__favorite-btn--active' : 'event__favorite-btn';
  const offersLayout = offers.map((offer) => createOffersTemplate(offer)).join('');

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">MAR 18</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination.name}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${startDate}">${getDateTime(startDate).split(' ')[1]}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${endDate}">${getDateTime(endDate).split(' ')[1]}</time>
                  </p>
                  <p class="event__duration">${getEventDuration(startDate, endDate)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  ${offersLayout}
                </ul>
                <button class="${favoutriteClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
}

export default class EventView extends AbstractView {
  #event = null;
  #handleArrowClick = null;
  #handleStarClick = null;

  constructor({event, onArrowClick, onStarClick}){
    super();
    this.#event = event;
    this.#handleArrowClick = onArrowClick;
    this.#handleStarClick = onStarClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editEventHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#starClickHandler);
  }

  get template() {
    return createEventTemplate(this.#event);
  }

  #editEventHandler = (e) =>{
    e.preventDefault();
    this.#handleArrowClick();
  };

  #starClickHandler = (e) =>{
    e.preventDefault();
    this.#handleStarClick();
  };
}
