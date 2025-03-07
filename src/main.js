import { mockDestinations, mockEvents, mockOffers } from './mock/event.js';
import EventModel from './model/event-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filterPresenter.js';
import Presenter from './presenter/presenter.js';
const eventModel = new EventModel({events: mockEvents, destinations: mockDestinations, offers: mockOffers});
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({eventModel: eventModel, filterModel: filterModel});
const presenter = new Presenter({eventModel, filterModel});

presenter.init();
filterPresenter.init();
