const EVENT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
};


const EmptyMessages = {
  everything: 'Click New Event to create your first point',
  past: 'There are no past events now',
  present: 'There are no present events now',
  future: 'There are no future events now'
};


export {EVENT_TYPES, UserAction, FilterType, UpdateType, EmptyMessages};
