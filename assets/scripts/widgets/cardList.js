import Handlebars from 'handlebars';
import Helpers from "../utils/helpers";
import helpers from "../utils/helpers";

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
    paginationSel: '#pagination',
    cardSel: 'article.card',
    likedBtn: '.btn.like-js',
    likedIcoBtn: 'a.like-js'
  },

  cls: {
    activePaginationElCls: 'pagination-el-current',
    paginationElCls: 'pagination-el',
    likeCls: 'like-js',
    textColorRed: 'text-color-red',
  },

  handler: {
    paginationOnClick: null,
    likeOnClick: null,
  },

  TPL: {
    card: null,
    addBtnTpl: 'Add&nbsp;<i class="ico-plus"></i>',
    removeBtnTpl: 'Remove&nbsp;<i class="ico-minus"></i>',
    addIcoTPL: '<i class="ico-heart"></i>',
    removeIcoTPL: '<i class="ico-heart-filled"></i>'
  },

  config: {
    cardsPerPage: 5,
    currentPage: 1,
    pageAmount: 1
  },

  event: {
    pageChange: 'pageChange',
    likeChange: 'likeChange'
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

    this.handler.likeOnClick = this.onLikeClick.bind(this);
    this.$el.$cardListEl.addEventListener('click', this.handler.likeOnClick);
  },

  dispatchPageChange(page) {
    window.dispatchEvent(
      new CustomEvent(this.event.pageChange, {detail: page})
    );
  },

  dispatchLikeCard(data) {
    window.dispatchEvent(
      new CustomEvent(this.event.likeChange, {detail: data})
    );
  },

  onPaginationClick(event) {
    const url = new URL(location),
      $el = event.target,
      urlRegex = /page=[0-9]/i,
      getParamName = 'page';

    if (!$el.classList.contains(this.cls.paginationElCls)) return false;

    event.stopPropagation();

    Helpers.updateGETParam(getParamName, $el.dataset.page, urlRegex);

    this.dispatchPageChange($el.dataset.page);
  },

  onLikeClick(event) {
    const $el = event.target,
          boolStrTrue = 'true',
          boolStrFalse = 'false';
    let $elCurrentCard = null;

    if(!helpers.hasParentClass($el, this.cls.likeCls)) return false;

    event.stopPropagation();
    event.preventDefault();

    $elCurrentCard = $el.closest(this.$selectors.cardSel);

    if($elCurrentCard.dataset.liked === boolStrTrue) {
      $elCurrentCard.querySelector(this.$selectors.likedBtn).innerHTML = this.TPL.addBtnTpl;
      $elCurrentCard.querySelector(this.$selectors.likedIcoBtn).innerHTML = this.TPL.addIcoTPL;
      $elCurrentCard.querySelector(this.$selectors.likedIcoBtn).classList.remove(this.cls.textColorRed);
      $elCurrentCard.dataset.liked = boolStrFalse;
    } else {
      $elCurrentCard.querySelector(this.$selectors.likedBtn).innerHTML = this.TPL.removeBtnTpl;
      $elCurrentCard.querySelector(this.$selectors.likedIcoBtn).innerHTML = this.TPL.removeIcoTPL;
      $elCurrentCard.querySelector(this.$selectors.likedIcoBtn).classList.add(this.cls.textColorRed);
      $elCurrentCard.dataset.liked = boolStrTrue;
    }

    this.dispatchLikeCard({
      id: $elCurrentCard.dataset.id,
      liked: $elCurrentCard.dataset.liked === boolStrTrue
    });
  },

  updateView(data, config) {
    try {
      this.setConfig(config);
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
      this.data[key]['id'] = key;
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
