import API from "../utils/api"
import searchBar from "../widgets/searchBar";
import cardList from "../widgets/cardList";

export default {
  searchBarFiltersData: {},

  dataKey: 'VINYLS',

  init(match) {
    try {
      this.setSearchBarConfig(match);

      searchBar.init(this.getSearchBarConfig());
      cardList.init(API.getData(this.dataKey, match.params));
    } catch (error) {
      console.error(error);
    }
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
  }
}
