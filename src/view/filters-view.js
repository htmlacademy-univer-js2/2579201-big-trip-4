import AbstractView from '../framework/view/abstract-view.js';

function createFilterItemTemplate(filter, currentFilterType){
  const {type} = filter;
  return `<div class="trip-filters__filter">
                <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? 'checked' : ''}>
                <label class="trip-filters__filter-label" for="filter-${type}">${type.toUpperCase()}</label>
              </div>`;
}

function createFiltersTemplate(filters, currentFilterType) {
  const filtersLayout = filters.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join('');
  return `<form class="trip-filters" action="#" method="get">
            ${filtersLayout}
              <button class="visually-hidden" type="submit">Accept filter</button>
            </form>`;
}

export default class FiltersView extends AbstractView{
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };

}
