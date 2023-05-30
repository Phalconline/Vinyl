import API from "../utils/api"
import searchBar from "../widgets/searchBar";
import cardList from "../widgets/cardList";

export default {
  handler: {
    boundHandleFiltersFormSubmit: null
  },

  searchBarFiltersData: {},

  cardListConfig: {
    cardsPerPage: 5,
    currentPage: 1
  },

  dataKey: 'VINYLS',

  init(match) {

    try {
      this.defineHandlers();
      this.setSearchBarConfig(match);

      searchBar.init(this.getSearchBarConfig());

      cardList.init(this.cardListConfig.currentPage);
      cardList.init(
        API.getData(
          this.dataKey,
          match.params,
          this.cardListConfig.cardsPerPage,
          this.cardListConfig.currentPage * this.cardListConfig.cardsPerPage,
        )
      );
    } catch (error) {
      console.error(error);
    }
  },

  setCurrentPage(pageNumber) {
    this.cardListConfig.currentPage = pageNumber;
  },

  setSearchBarConfig(match) {
    let data = API.getAllData(),
      searchBarFiltersData = {};

    Object.assign(searchBarFiltersData, searchBar.filtersData);
    searchBarFiltersData.selected = match.params || {};

    for (const key of Object.keys(data)) {
      if (key in searchBarFiltersData) {
        searchBarFiltersData[key] = data[key];
      }
    }

    this.searchBarFiltersData = searchBarFiltersData;
  },

  getSearchBarConfig() {
    return this.searchBarFiltersData;
  },

  defineHandlers() {
    this.handler.boundHandleFiltersFormSubmit = this.onFiltersFormSubmit.bind(this);
    window.addEventListener(
      searchBar.event.filtersFormSubmit,
      this.handler.boundHandleFiltersFormSubmit,
      {passive: true}
    );
  },

  onFiltersFormSubmit(event) {
    let filters = event.detail,
        firstPage = 1;

    this.setCurrentPage(firstPage);

    cardList.updateView(
      API.getData(
        this.dataKey,
        filters,
        this.cardListConfig.cardsPerPage,
        this.cardListConfig.currentPage * this.cardListConfig.cardsPerPage,
      )
    );
  },

  removeHandlers() {
    window.removeEventListener(searchBar.event.filtersFormSubmit, this.handler.onFiltersFormSubmit, false);
  },

  destroy() {
    this.removeHandlers();
    searchBar.destroy();
    cardList.destroy();
  }
}
