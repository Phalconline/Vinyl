import helper from "./../utils/helpers";

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

  selectors: {
    searchBarSel: '#searchBar',
    artistSel: '#Artist',
    genreSel: '#Genre',
    decadeSel: '#Decade',
    countrySel: '#Country',
    searchBtnSel: '#SearchBtn'
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
    this.filtersData.DECADES = filtersData.DECADES;
    this.filtersData.GENRES = filtersData.GENRES;
    this.filtersData.COUNTRIES = filtersData.COUNTRIES;
    this.currentFilters = filtersData.selected || {};
  },

  defineEls() {
    this.$el.$searchBarEl = document.querySelector(this.selectors.searchBarSel);
    this.$el.$artistEl = this.$el.$searchBarEl.querySelector(this.selectors.artistSel);
    this.$el.$genreEl = this.$el.$searchBarEl.querySelector(this.selectors.genreSel);
    this.$el.$decadeEl = this.$el.$searchBarEl.querySelector(this.selectors.decadeSel);
    this.$el.$countryEl = this.$el.$searchBarEl.querySelector(this.selectors.countrySel);
    this.$el.$searchBtnEl = this.$el.$searchBarEl.querySelector(this.selectors.searchBtnSel);
  },

  defineHandlers() {
    this.$el.$searchBarEl.addEventListener('submit', this.onFormSubmit.bind(this));
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

      this.$el[`$${filter}El`].querySelector(`option[selected]`).removeAttribute('selected');
      this.$el[`$${filter}El`].querySelector(`option[value="${this.currentFilters[filter]}"]`).setAttribute('selected', 'selected');
    }
  },

  onFormSubmit(event) {
    const formData = new FormData(event.target);
    let searchRequest = [],
      url = [window.location.pathname];

    event.preventDefault();

    for (let [key, value] of formData) {
      if (value) {
        this.currentFilters[key] = value;
        searchRequest.push(`${key}=${value}`);
      }
    }

    url.push(['?', searchRequest.join('&')].join(''));
    url = url.join('');

    window.history.pushState({path: url}, '', url);
    helper.dispatchHistoryStateUpdate(url);
  }
}
