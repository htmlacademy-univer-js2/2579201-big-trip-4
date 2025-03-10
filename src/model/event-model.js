import { UpdateType } from '../const';
import Observable from '../framework/observable';
import { getDetailedEvent } from '../utils/events';

export default class EventModel extends Observable{
  #events = null;
  #destinations = null;
  #offers = null;
  #eventApiService = null;
  constructor({eventApiService}){
    super();
    this.#eventApiService = eventApiService;
    this.#events = [];
  }

  get events(){
    return this.#events;
  }

  get destinations(){
    return this.#destinations;
  }

  get offers(){
    return this.#offers;
  }

  async init() {
    try {
      const events = await this.#eventApiService.events;
      const offers = await this.#eventApiService.offers;
      const destinations = await this.#eventApiService.destinations;
      this.#offers = offers;
      this.#destinations = destinations;

      const adaptedEvents = events.map(this.#adaptToClient).map((event)=> getDetailedEvent(event, destinations, offers));
      this.#events = adaptedEvents;
    } catch(err) {
      this.#events = [];
    }
    this._notify(UpdateType.INIT);
  }

  async updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }
    try {
      const response = await this.#eventApiService.updatePoint(update);
      const updatedEvent = getDetailedEvent(this.#adaptToClient(response), this.#destinations, this.#offers);
      this.#events = [
        ...this.#events.slice(0, index),
        updatedEvent,
        ...this.#events.slice(index + 1),
      ];
      this._notify(updateType, updatedEvent);
    } catch(err){
      throw new Error('Can\'t update event');
    }


    this._notify(updateType, update);
  }

  async addEvent(updateType, update) {
    try {
      const response = await this.#eventApiService.addEvent(update);
      const newEvent = getDetailedEvent(this.#adaptToClient(response), this.#destinations, this.#offers);
      this.events = [newEvent, ...this.#events];
      this._notify(updateType, newEvent);

    } catch(err) {
      throw new Error('Can\'t add event');
    }
  }

  async deleteEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    try {
      await this.#eventApiService.deleteEvent(update);
      this.#events = [
        ...this.#events.slice(0, index),
        ...this.#events.slice(index + 1),
      ];
      this._notify(updateType);
    } catch(err) {
      throw new Error('Can\'t delete event');
    }
  }


  #adaptToClient(event) {
    const adaptedEvent = {...event,
      startDate: event['date_from'] !== null ? new Date(event['date_from']) : event['date_from'],
      endDate: event['date_to'] !== null ? new Date(event['date_to']) : event['date_to'],
      price: event['base_price'],
      isFavourite: event['is_favorite'],
    };

    delete adaptedEvent['date_from'];
    delete adaptedEvent['date_to'];
    delete adaptedEvent['base_price'];
    delete adaptedEvent['is_favorite'];

    return adaptedEvent;
  }
}

