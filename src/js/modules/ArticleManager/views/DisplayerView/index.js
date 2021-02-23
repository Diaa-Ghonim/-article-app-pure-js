import ArticleView from '../ArticleView';
import { CREATE_DIV } from '../../../../utils';

export default class {
  constructor(presenter) {
    this.$articleContainer = undefined;
    this.presenter = presenter;
    this.$loadMoreBtn = undefined;
    this.renderDisplayerElement();
  }

  renderDisplayerElement() {
    this.$articleContainer = CREATE_DIV('div');
  }

  renderArticles(articles) {
    this.clearTheContainer();
    articles.forEach((article) => {
      const articleView = new ArticleView(article, this.presenter);
      this.appendContentToContainer(articleView.getArticleEle());
    });
  }
  appendContentToContainer($content) {
    this.$articleContainer.appendChild($content);
  }
  clearTheContainer() {
    this.$articleContainer.innerHTML = '';
  }
  renderArticle(post) {
    // const artivelView = new ArtivelView(post, presenter);
    // this.$articleContainer.prepend(artivelView);
  }

  renderErrorMsg(msg) {
    this.$articleContainer.innerHTML = '<h1>' + msg + '</h1>';
  }

  getArticleContainerEle() {
    return this.$articleContainer;
  }
}
