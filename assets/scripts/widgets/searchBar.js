export default {
  filtersData: {
    DECADES: {},
    GENRES: {},
    COUNTRIES: {},
  },

  currentFilters: {},

  $el: {
    $searchBarEl: null,
    $artistEl: null,
    $genreEl: null,
    $decadeEl: null,
    $countryEl: null,
    $searchBtnEl: null
  },

  selector: {
    searchBarSel: '#searchBar',
    artistSel: '#Artist',
    genreSel: '#Genre',
    decadeSel: '#Decade',
    countrySel: '#Country',
    searchBtnSel: '#SearchBtn'
  },

  event: {
    filtersFormSubmit: 'filtersFormSubmit'
  },

  handler: {
    boundHandleFormSubmit: null
  },

  init(filtersData) {
    try {
      this.setFiltersData(filtersData);
      this.defineEls();
      this.render();
      this.defineHandlers();
    } catch (error) {
      console.error(error);
    }
  },

  setFiltersData(filtersData) {
    Object.assign(this.filtersData.DECADES, filtersData.DECADES);
    Object.assign(this.filtersData.GENRES, filtersData.GENRES);
    Object.assign(this.filtersData.COUNTRIES, filtersData.COUNTRIES);

    this.setCurrentFilters(filtersData.selected);
  },

  setCurrentFilters(selected) {
    this.currentFilters = {};
    Object.assign(this.currentFilters, selected);
  },

  defineEls() {
    this.$el.$searchBarEl = document.querySelector(this.selector.searchBarSel);
    this.$el.$artistEl = this.$el.$searchBarEl.querySelector(this.selector.artistSel);
    this.$el.$genreEl = this.$el.$searchBarEl.querySelector(this.selector.genreSel);
    this.$el.$decadeEl = this.$el.$searchBarEl.querySelector(this.selector.decadeSel);
    this.$el.$countryEl = this.$el.$searchBarEl.querySelector(this.selector.countrySel);
    this.$el.$searchBtnEl = this.$el.$searchBarEl.querySelector(this.selector.searchBtnSel);
  },

  defineHandlers() {
    this.handler.boundHandleFormSubmit = this.onFormSubmit.bind(this);
    this.$el.$searchBarEl.addEventListener('submit', this.handler.boundHandleFormSubmit);
  },

  // @todo optimize this logic
  getFilterElByFilterName(filter) {
    switch (filter) {
      case 'DECADES':
        return this.$el.$decadeEl
      case'GENRES':
        return this.$el.$genreEl
      case 'COUNTRIES':
        return this.$el.$countryEl
    }
  },

  render() {
    this.renderFilters();
    this.defineEls();
    this.renderFiltersState();
  },

  renderFilters() {
    let $optionEl, $filterEl, optionContent;

    for (let filter in this.filtersData) {
      $filterEl = this.getFilterElByFilterName(filter);
      for (let key in this.filtersData[filter]) {
        $optionEl = document.createElement('option');
        $optionEl.setAttribute('value', this.filtersData[filter][key]['value']);
        optionContent = document.createTextNode(this.filtersData[filter][key]['label'])
        $optionEl.appendChild(optionContent);
        $filterEl.appendChild($optionEl);
      }
    }
  },

  renderFiltersState() {
    for (let filter in this.currentFilters) {

      if (this.$el[`$${filter}El`] === this.$el.$artistEl) {
        this.$el.$artistEl.setAttribute('value', this.currentFilters[filter]);

        break;
      }

      if (this.$el[`$${filter}El`]) {
        this.$el[`$${filter}El`].querySelector(`option[value="${this.currentFilters[filter]}"]`).setAttribute('selected', 'selected');
      }
    }
  },

  onFormSubmit(event) {
    const formData = new FormData(event.target);
    let searchRequest = [],
      filtersData = {},
      url = [window.location.pathname];

    event.preventDefault();

    for (let [key, value] of formData) {
      if (value) {
        this.currentFilters[key] = value;
        searchRequest.push(`${key}=${value}`);
        filtersData[key] = value;
      }
    }

    url.push(['?', searchRequest.join('&')].join(''));
    url = url.join('');
    this.setCurrentFilters(filtersData);

    window.history.pushState({path: url}, '', url);
    this.dispatchFormSubmit(this.currentFilters);
  },

  dispatchFormSubmit(filters) {
    window.dispatchEvent(
      new CustomEvent(this.event.filtersFormSubmit, {detail: filters})
    );
  },

  destroy() {
    this.resetHandlers();
    this.removeHTML();
    this.resetData();
    this.resetEls();
  },

  resetData() {
    this.filtersData.DECADES = {};
    this.filtersData.GENRES = {};
    this.filtersData.COUNTRIES = {};
    this.currentFilters = {};
  },

  resetEls() {
    for (let key in this.$el) {
      this.$el[key] = null;
    }
  },

  resetHandlers() {
    this.$el.$searchBarEl.removeEventListener('submit', this.handler.boundHandleFormSubmit, false);
  },

  removeHTML() {
    let $filterEl, $firstOption;

    for (let filter in this.filtersData) {
      $filterEl = this.getFilterElByFilterName(filter);
      $firstOption = $filterEl.firstElementChild;
      $filterEl.innerHTML = '';
      $filterEl.append($firstOption);
      this.$el.$artistEl.value = '';
    }
  }
}
