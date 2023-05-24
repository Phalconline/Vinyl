import mock from "../utils/mock"

export default {
  data: {},

  init() {
    this.setData();
  },

  setData() {
    this.data = mock;
  },

  getData(key) {
    return this.data[key];
  },

  getAllData() {
    return this.data;
  }
}
