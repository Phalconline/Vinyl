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
    postsPerPage: 5
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

  render() {
    this.$el.$cardListInnerWrapper.innerHTML = '';

    for (let key in this.data) {
      this.$el.$cardListInnerWrapper.insertAdjacentHTML('beforeend', this.TPL.card(this.data[key]));
    }
  }
}
