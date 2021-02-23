import articleTemplate from '../templ/articleTemp.ejs';
import { CREATE_DIV } from '../../../../utils';
// import presenter from '../../presenter';
export default class {
  constructor(article, presenter) {
    this.$articleEle = CREATE_DIV('div', { class: 'article-wrapper' });
    this.$likeBtn = undefined;
    this.$dislikeBtn = undefined;
    this.$shareBtn = undefined;
    this.$saveBtn = undefined;
    this.presenter = presenter;
    this.article = article;
    this.renderArticle(article);
  }
  renderArticle(article) {
    this.$articleEle.innerHTML = articleTemplate(article);
    this.cacheDomElements();
    this.setupListeners();
  }
  cacheDomElements() {
    this.$likeBtn = this.$articleEle.querySelector('#like-btn');
    this.$dislikeBtn = this.$articleEle.querySelector('#dislike-btn');
    this.$shareBtn = this.$articleEle.querySelector('#share-btn');
    this.$saveBtn = this.$articleEle.querySelector('#save-btn');
  }
  setupListeners() {
    this.$likeBtn.addEventListener('click', this.onLikeBtnClicked.bind(this));
    this.$dislikeBtn.addEventListener(
      'click',
      this.onDislikeBtnClicked.bind(this)
    );
    this.$shareBtn.addEventListener('click', this.onShareBtnClicked.bind(this));
    this.$saveBtn.addEventListener('click', this.onSaveBtnClicked.bind(this));
  }
  onLikeBtnClicked(e) {
    this.presenter.onLikeBtnClicked(this);
  }
  onDislikeBtnClicked(e) {
    this.presenter.onDislikeBtnClicked(this);
  }
  onShareBtnClicked(e) {
    this.presenter.onShareBtnClicked(this);
  }
  onSaveBtnClicked(e) {
    this.presenter.onSaveBtnClicked(this);
  }
  getArticleInfo() {
    return this.article;
  }
  activeLikeBtn() {
    this.$likeBtn.classList.add('svg-fill');
  }
  deactivateLikeBtn() {
    this.$likeBtn.classList.remove('svg-fill');
  }
  activeDislikeBtn() {
    this.$dislikeBtn.classList.add('svg-fill');
  }
  deactivateDislikeBtn() {
    this.$dislikeBtn.classList.remove('svg-fill');
  }
  activeSaveBtn() {
    this.$saveBtn.classList.add('svg-fill');
  }
  deactivateSaveBtn() {
    this.$saveBtn.classList.remove('svg-fill');
  }

  checkActiveLikeBtn() {
    return this.$likeBtn.classList.contains('svg-fill');
  }
  checkActiveDislikeBtn() {
    return this.$dislikeBtn.classList.contains('svg-fill');
  }
  checkActiveSaveBtn() {
    return this.$saveBtn.classList.contains('svg-fill');
  }
  getArticleEle() {
    return this.$articleEle;
  }
}
