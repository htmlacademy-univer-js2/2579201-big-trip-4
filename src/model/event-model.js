import { getDetailedEvents } from '../mock/createEvent';

export default class EventModel{
  constructor({events, destinations, offers}){
    this.events = Array.from(getDetailedEvents(events, destinations, offers));
  }

  getEvents(){
    return this.events;
  }
}
