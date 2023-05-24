import API from "../utils/api"
import searchBar from "../widgets/searchBar";

export default {
  searchBarFiltersData: {},

  init() {
    try {
      this.setSearchBarConfig();

      searchBar.init(this.getSearchBarConfig());
    } catch (error) {
      console.error();
    }
  },

  setSearchBarConfig() {
    let data = API.getAllData(),
      searchBarFiltersData = searchBar.filtersData;

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
