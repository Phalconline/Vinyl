import API from "../utils/api"
import searchBar from "../widgets/searchBar";
import cardList from "../widgets/cardList";

export default {
  handler: {
    boundHandleFiltersFormSubmit: null,
    boundHandlerPageChange: null,
    boundHandlerLikeChange: null
  },

  searchBarFiltersData: {
    selected: {}
  },

  defaultFilter: {
    liked: 'true'
  },

  cardListConfig: {
    cardsPerPage: 10,
    currentPage: 1,
    pageAmount: 1
  },

  dataKey: 'VINYLS',

  init(match) {
    try {
      this.defineHandlers();

      if(!match.params) match.params = {};

      match.params = Object.assign(match.params, this.defaultFilter);

      if (match.params.hasOwnProperty('page')) this.setCurrentPage(match.params.page);

      this.setSearchBarConfig(match);
      this.setCardListConfig(this.cardListConfig.currentPage, API.getDataCount(this.dataKey, this.getFilters()));

      searchBar.init(this.getSearchBarConfig());

      cardList.init(
        API.getData(
          this.dataKey,
          match.params,
          this.cardListConfig.cardsPerPage,
          this.cardListConfig.currentPage * this.cardListConfig.cardsPerPage,
        ), this.getCardListConfig()
      );
    } catch (error) {
      console.error(error);
    }
  },

  setCurrentPage(pageNumber) {
    this.cardListConfig.currentPage = pageNumber;
  },

  setCardListConfig(currentPage, cardsAmount) {
    this.cardListConfig.pageAmount = Math.ceil(cardsAmount / this.cardListConfig.cardsPerPage);
    this.cardListConfig.currentPage = currentPage;
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

  getFilters() {
    return this.searchBarFiltersData.selected;
  },

  getSearchBarConfig() {
    return this.searchBarFiltersData;
  },

  getCardListConfig() {
    return this.cardListConfig;
  },

  defineHandlers() {
    this.handler.boundHandleFiltersFormSubmit = this.onFiltersFormSubmit.bind(this);
    window.addEventListener(
      searchBar.event.filtersFormSubmit,
      this.handler.boundHandleFiltersFormSubmit,
      {passive: true}
    );

    this.handler.boundHandlerPageChange = this.onPageChange.bind(this);
    window.addEventListener(
      cardList.event.pageChange,
      this.handler.boundHandlerPageChange,
      {passive: true}
    );

    this.handler.boundHandlerLikeChange = this.onLikeChange.bind(this);
    window.addEventListener(
      cardList.event.likeChange,
      this.handler.boundHandlerLikeChange,
      {passive: true}
    );
  },

  onLikeChange(event) {
    API.updateRecord(
      this.dataKey,
      event.detail.id,
      {liked: event.detail.liked})
  },

  onFiltersFormSubmit(event) {
    let filters = Object.assign(event.detail, this.defaultFilter),
      firstPage = 1;

    this.setCurrentPage(firstPage);
    this.setCardListConfig(this.cardListConfig.currentPage, API.getDataCount(this.dataKey, filters));

    cardList.updateView(
      API.getData(
        this.dataKey,
        filters,
        this.cardListConfig.cardsPerPage,
        this.cardListConfig.currentPage * this.cardListConfig.cardsPerPage,
      ), this.getCardListConfig()
    );
  },

  onPageChange(event) {
    let page = event.detail;

    this.setCurrentPage(page);
    this.setCardListConfig(this.cardListConfig.currentPage, API.getDataCount(this.dataKey, this.getFilters()));

    cardList.updateView(
      API.getData(
        this.dataKey,
        this.getFilters(),
        this.cardListConfig.cardsPerPage,
        this.cardListConfig.currentPage * this.cardListConfig.cardsPerPage,
      ), this.getCardListConfig()
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
