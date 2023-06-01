import mock from "../utils/mock"

export default {
  data: {},

  init() {
    this.setData();
  },

  setData() {
    this.data = mock;
  },

  getDataCount(key, filters) {
    return Object.keys(
      this.filterData(this.data[key], filters)
    ).length;
  },

  getData(key, filters, count, lastItem) {
    let filteredData = this.filterData(this.data[key], filters),
      startItem = lastItem - count;

    if (Object.keys(filteredData).length > count) {
      filteredData = Object.fromEntries(Object.entries(filteredData).slice(startItem, lastItem));
    }

    return filteredData;
  },

  filterData(selectedData, filters) {
    let filteredData = {};

    if (!filters) return selectedData;

    for (let hash in selectedData) {
      let passCondition = true;

      for (let filter in filters) {

        if(!selectedData[hash][filter]) break;

        if (!selectedData[hash][filter].toLowerCase().split(' ').join('').includes(filters[filter].toLowerCase())) {
          passCondition = false;

          break;
        }
      }

      if (passCondition) {
        filteredData[hash] = selectedData[hash];
      }
    }

    return filteredData;
  },

  getAllData() {
    return this.data;
  }
}
