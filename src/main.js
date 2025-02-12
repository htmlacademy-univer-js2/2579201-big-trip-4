import { mockDestinations, mockEvents, mockOffers } from './mock/event.js';
import EventModel from './model/event-model.js';
import Presenter from './presenter/presenter.js';
const eventModel = new EventModel({events: mockEvents, destinations: mockDestinations, offers: mockOffers});

const presenter = new Presenter({eventModel});

presenter.init();
