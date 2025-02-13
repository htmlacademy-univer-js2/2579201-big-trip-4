import { getDetailedEvents } from '../mock/createEvent';

export default class EventModel{
  #events = null;
  constructor({events, destinations, offers}){
    this.#events = Array.from(getDetailedEvents(events, destinations, offers));
  }

  get events(){
    return this.#events;
  }
}
