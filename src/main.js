import FilterView from './view/filters-view.js';
import {render} from './render.js';
import Presenter from './presenter/presenter.js';

const siteMainElement = document.querySelector('.trip-events');
const siteFilterElement = document.querySelector('.trip-controls__filters');
const presenter = new Presenter({container: siteMainElement});

render(new FilterView(), siteFilterElement);
presenter.init();
