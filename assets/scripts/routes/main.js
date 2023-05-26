import API from "../utils/api"
import searchBar from "../widgets/searchBar";

export default {
  searchBarFiltersData: {},

  init(match) {
    try {
      console.log(match);
      this.setSearchBarConfig(match);

      searchBar.init(this.getSearchBarConfig());
    } catch (error) {
      console.error();
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
