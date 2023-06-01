import Handlebars from 'handlebars';
import Helpers from "../utils/helpers";

export default {
  $el: {
    $cardTPL: null,
    $cardListEl: null,
    $cardListInnerWrapper: null,
    $paginationEl: null
  },

  $selectors: {
    cardTPLSel: '#cardViewTPL',
    cardListSel: '#cardList',
    cardListInnerWrapperSel: '#cardListInnerWrapper',
    paginationSel: '#pagination'
  },

  cls: {
    activePaginationElCls: 'pagination-el-current',
    paginationElCls: 'pagination-el'
  },

  handler: {
    paginationOnClick: null
  },

  TPL: {
    card: null
  },

  config: {
    cardsPerPage: 5,
    currentPage: 1,
    pageAmount: 1
  },

  event: {
    pageChange: 'pageChange'
  },

  data: {},

  init(data, config) {
    try {
      this.setConfig(config);
      this.setData(data);
      this.defineEl();
      this.defineTPL();
      this.render();
      this.defineHandlers();
    } catch (error) {
      console.error(error);
    }
  },

  setConfig(config) {
    Object.assign(this.config, config);
  },

  setData(data) {
    this.data = {};
    Object.assign(this.data, data);
  },

  defineEl() {
    this.$el.$cardTPL = document.querySelector(this.$selectors.cardTPLSel);
    this.$el.$cardListEl = document.querySelector(this.$selectors.cardListSel);
    this.$el.$cardListInnerWrapper = this.$el.$cardListEl.querySelector(this.$selectors.cardListInnerWrapperSel);
    this.$el.$paginationEl = this.$el.$cardListEl.querySelector(this.$selectors.paginationSel);
  },

  defineTPL() {
    this.TPL.card = Handlebars.compile(
      this.$el.$cardTPL.innerHTML.replaceAll('[[', '{{').replaceAll(']]', '}}')
    );
  },

  defineHandlers() {
    this.handler.paginationOnClick = this.onPaginationClick.bind(this);
    this.$el.$paginationEl.addEventListener('click', this.handler.paginationOnClick);
  },

  dispatchPageChange(page) {
    window.dispatchEvent(
      new CustomEvent(this.event.pageChange, {detail: page})
    );
  },

  onPaginationClick(event) {
    const url = new URL(location),
      $el = event.target,
      urlRegex = /page=[0-9]/i,
      getParamName = 'page';

    if (!$el.classList.contains(this.cls.paginationElCls)) return false;

    Helpers.updateGETParam(getParamName, $el.dataset.page, urlRegex);

    this.dispatchPageChange($el.dataset.page);
  },

  updateView(data, page) {
    try {
      this.setData(data);
      this.render();
    } catch (error) {
      console.error(error);
    }
  },

  render() {
    this.renderCards();
    this.renderPagination(this.config.pageAmount, this.config.currentPage);
  },

  renderCards() {
    this.$el.$cardListInnerWrapper.innerHTML = '';

    for (let key in this.data) {
      this.$el.$cardListInnerWrapper.insertAdjacentHTML('beforeend', this.TPL.card(this.data[key]));
    }
  },

  renderPagination(pagesAmount, activePageNumber) {
    let $paginationItemEl, paginationContent;

    this.clearPagination();

    for (let pageIndex = 1; pageIndex <= pagesAmount; pageIndex++) {
      $paginationItemEl = document.createElement('a');
      $paginationItemEl.classList.add(this.cls.paginationElCls);
      $paginationItemEl.setAttribute('href', 'javascript:void(0)');
      $paginationItemEl.setAttribute('data-page', pageIndex);
      paginationContent = document.createTextNode([pageIndex].join(''));
      $paginationItemEl.appendChild(paginationContent);

      if (pageIndex.toString() === activePageNumber.toString()) $paginationItemEl.classList.add(this.cls.activePaginationElCls);

      this.$el.$paginationEl.appendChild($paginationItemEl);
    }
  },

  destroy() {
    this.clearPagination();
  },

  clearPagination() {
    this.$el.$paginationEl.innerHTML = '';
  }
}
