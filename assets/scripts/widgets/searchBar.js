import Handlebars from 'handlebars';

export default {
  // '2020-30 рр.'

  _optionTPL: ["{{#each myArray}}",
                  "<p>{{this}} is a guest!</p>",
              "{{/each}}"].join(''),

  filtersData: {
    DECADES: {},
    GENRES: {},
    COUNTRIES: {}
  },

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
      // this.compileViews();
      // this.applyDataToSearchBarView();
      this.defineHandlers();
    } catch (error) {
      console.error(error);
    }
  },

  setFiltersData(filtersData) {
    this.filtersData.DECADES = filtersData.DECADES;
    this.filtersData.GENRES = filtersData.GENRES;
    this.filtersData.COUNTRIES = filtersData.COUNTRIES;
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

  },

  getDecadeLabel() {

  },

  compileViews() {
    let template = "Handlebars <b>{{doesWhat}}</b> precompiled!";
    let compiled = Handlebars.precompile(template);
    Handlebars.partials["test1"] = Handlebars.template({
      /** insert compiled output here **/
    });
  },

  applyDataToSearchBarView() {
    console.log(this.filtersData);
    console.log(this._optionTPL);
    // Handlebars.precompile(this._optionTPL);

    let template = "Handlebars <b>{{doesWhat}}</b> precompiled!";
    let compiled = Handlebars.precompile(template);
    console.log(compiled);

  },

  render() {
    this.renderFilters();
    this.renderCards();
  },

  renderFilters() {

  },

  renderCards() {

  }
}
