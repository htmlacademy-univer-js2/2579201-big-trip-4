import EventApiService from './api/event-api-service.js';
import EventModel from './model/event-model.js';
import FilterModel from './model/filter-model.js';
import FilterPresenter from './presenter/filterPresenter.js';
import Presenter from './presenter/presenter.js';
import { generateAuth } from './utils/utils.js';

const END_POINT = 'https://21.objects.htmlacademy.pro/big-trip';
const AUTHORIZATION = generateAuth();

const eventModel = new EventModel({eventApiService: new EventApiService(END_POINT, AUTHORIZATION)});
const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({eventModel: eventModel, filterModel: filterModel});
const presenter = new Presenter({eventModel, filterModel});

presenter.init();
filterPresenter.init();
eventModel.init();
