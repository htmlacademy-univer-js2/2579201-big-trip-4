import { getDetailedEvents } from '../mock/createEvent';

export default class EventModel{
  events = Array.from(getDetailedEvents());

  getEvents(){
    return this.events;
  }
}
