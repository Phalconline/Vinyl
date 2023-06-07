import mock from "../utils/mock"

export default {

  data: {},

  dataStorageName: 'DB',

  init() {
    this.setData();
  },

  setData() {
    let data = localStorage.getItem(this.dataStorageName);

    if(data) {
      this.data = JSON.parse(data);
    } else {
      localStorage.setItem(this.dataStorageName, JSON.stringify(mock));
      this.data = mock;
    }
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

        if(typeof selectedData[hash][filter] === 'undefined') break;

        if (!selectedData[hash][filter].toString().toLowerCase().split(' ').join('').includes(filters[filter].toLowerCase())) {
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
  },

  updateRecord(key, id, record) {
    let data = this.getAllData();

    data[key][id] = Object.assign(data[key][id], record);

    localStorage.setItem(this.dataStorageName, JSON.stringify(data));
    this.setData();
  }
}
