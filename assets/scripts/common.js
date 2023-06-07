export default {

  ROUTER: null,

  $el: {
    $navBarEl: null,
    $backBtnEl: null,
    $likedPageBtnEl: null,
    $mainBtnEl: null
  },

  selector: {
    navBarSel: '#navBar',
    backBtnSel: '#historyBackBtn',
    likedPageBtnSel: '#likedPageBtn',
    mainBtnSel: '#mainPageBtn'
  },

  handler: {
    boundHandleBackClick: null,
    boundHandleLikedPageClick: null,
    boundHandleMainPageClick: null,
  },

  init (ROUTER) {
    this.ROUTER = ROUTER;
    this.defineEl()
    this.defineHandlers()
  },

  defineEl () {
    this.$el.$navBarEl = document.querySelector(this.selector.navBarSel);
    this.$el.$backBtnEl = this.$el.$navBarEl.querySelector(this.selector.backBtnSel);
    this.$el.$likedPageBtnEl = this.$el.$navBarEl.querySelector(this.selector.likedPageBtnSel);
    this.$el.$mainBtnEl = this.$el.$navBarEl.querySelector(this.selector.mainBtnSel);
  },

  defineHandlers() {
    this.handler.boundHandleBackClick = this.onBackBtnClick.bind(this);
    this.$el.$backBtnEl.addEventListener('click', this.handler.boundHandleBackClick);

    this.handler.boundHandleLikedPageClick = this.onLikedPageBtnClick.bind(this);
    this.$el.$likedPageBtnEl.addEventListener('click', this.handler.boundHandleLikedPageClick);

    this.handler.boundHandleMainPageClick = this.onMainBtnPageClick.bind(this);
    this.$el.$mainBtnEl.addEventListener('click', this.handler.boundHandleMainPageClick);
  },

  onBackBtnClick() {
    history.back();
    this.ROUTER.lastResolved();
  },

  onLikedPageBtnClick() {
    window.history.pushState({path: '/favourites'}, '', '/favourites');
    this.ROUTER.navigateByName('favourites');
  },

  onMainBtnPageClick() {
    window.history.pushState({path: '/'}, '', '/');
    this.ROUTER.navigateByName('main');
  }
}
