import Handlebars from 'handlebars';

export default {
  $el: {
    $cardTPL: null, $cardListEl: null, $cardListInnerWrapper: null,
  },

  $selectors: {
    cardTPLSel: '#cardViewTPL', cardListSel: '#cardList', cardListInnerWrapperSel: '#cardListInnerWrapper'
  },

  TPL: {
    card: null
  },

  config: {
    cardsPerPage: 5
  },

  data: {},

  init(data) {
    try {
      this.setData(data);
      this.defineEl();
      this.defineTPL();
      this.render();
    } catch (error) {
      console.error(error);
    }
  },

  setData(data) {
    this.data = {};
    Object.assign(this.data, data);
  },

  setPagination(cardsPerPage) {
    this.config.cardsPerPage = cardsPerPage;
  },

  defineEl() {
    this.$el.$cardTPL = document.querySelector(this.$selectors.cardTPLSel);
    this.$el.$cardListEl = document.querySelector(this.$selectors.cardListSel);
    this.$el.$cardListInnerWrapper = this.$el.$cardListEl.querySelector(this.$selectors.cardListInnerWrapperSel);

  },

  defineTPL() {
    this.TPL.card = Handlebars.compile(
      this.$el.$cardTPL.innerHTML.replaceAll('[[', '{{').replaceAll(']]', '}}')
    );
  },

  defineHandlers() {

  },

  updateView(data) {
    try {
      this.setData(data);
      this.render();
    } catch (error) {
      console.error(error);
    }
  },

  render() {
    this.renderCards();
  },

  renderCards() {
    this.$el.$cardListInnerWrapper.innerHTML = '';

    for (let key in this.data) {
      this.$el.$cardListInnerWrapper.insertAdjacentHTML('beforeend', this.TPL.card(this.data[key]));
    }
  },

  renderPagination() {
    let $pagiItemEl = document.createElement('a');
  },

  destroy () {

  }
}
