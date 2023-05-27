import mock from "../utils/mock"

export default {
  data: {},

  init() {
    this.setData();
  },

  setData() {
    this.data = mock;
  },

  getData(key, filters) {
    let filteredData = {};

    if (!filters) return this.data[key];

    for(let hash in this.data[key]) {
      let passCondition = true;

      for(let filter in filters) {
        if(!this.data[key][hash][filter].toLowerCase().includes(filters[filter].toLowerCase())) {
          passCondition = false;

          break;
        }
      }

      if(passCondition) {
        filteredData[hash] = this.data[key][hash];
      }
    }

    return filteredData;
  },

  getAllData() {
    return this.data;
  }
}
