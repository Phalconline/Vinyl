import mock from "../utils/mock"

export default {
  data: {},

  init() {
    this.setData();
  },

  setData() {
    this.data = mock;
  },

  getData(key, filters, count, lastItem) {
    let filteredData = {},
      selectedData = {},
      startItem = lastItem - count;

    selectedData = this.data[key];

    if (!filters) return selectedData;

    for(let hash in selectedData) {
      let passCondition = true;

      for(let filter in filters) {
        if(!selectedData[hash][filter].toLowerCase().includes(filters[filter].toLowerCase())) {
          passCondition = false;

          break;
        }
      }

      if(passCondition) {
        filteredData[hash] = selectedData[hash];
      }
    }

    if( Object.keys(filteredData).length > count) {
      filteredData = Object.fromEntries(Object.entries(filteredData).slice(startItem,lastItem));
    }

    return filteredData;
  },

  getAllData() {
    return this.data;
  }
}
