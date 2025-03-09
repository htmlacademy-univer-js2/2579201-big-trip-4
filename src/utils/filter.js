import dayjs from 'dayjs';
import {FilterType} from '../const';

function isFutureEvent (event) {
  return event.dueDate && dayjs(event.dueDate).isAfter();
}

function isPastEvent(event){
  return event.endDate && dayjs(event.endDate).isBefore();
}

function isPresentEvent(event) {
  if (!event.dueDate || !event.endDate) {
    return false;
  }
  const now = dayjs();
  return dayjs(event.dueDate).isSameOrBefore(now) && dayjs(event.endDate).isSameOrAfter(now);
}

const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter(isFutureEvent),
  [FilterType.PAST]: (events) => events.filter(isPastEvent),
  [FilterType.PRESENT]: (events) => events.filter(isPresentEvent),
};

export {filter};
