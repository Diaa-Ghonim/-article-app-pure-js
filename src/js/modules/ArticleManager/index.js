import presenter from './presenter';
// tha Article Manager class is abstract class for this mvp module
class ArticleManager {
  constructor() {}

  getEditArticleEle() {
    return presenter.getEditArticleEle();
  }

  getArticlesElementForUser(onSuccess, onFailure) {
    presenter.getArticlesElementForUser(onSuccess, onFailure);
  }
  getUserArticles(username, onSuccess, onFailure) {
    presenter.getUserArticles(username, onSuccess, onFailure);
  }
  getLikedArticles(username, onSuccess, onFailure) {
    presenter.getLikedArticles(username, onSuccess, onFailure);
  }
  getDislikedArticles(username, onSuccess, onFailure) {
    presenter.getDislikedArticles(username, onSuccess, onFailure);
  }
  getSavedArticles(username) {
    presenter.getSavedArticles(username);
  }
  getSharedArticles(username) {
    presenter.getSharedArticles(username);
  }
  getTopReadingArticles() {
    presenter.getTopReadingArticles();
  }
}

export const articelManager = new ArticleManager();
