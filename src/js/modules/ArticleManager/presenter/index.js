// import ArticleView from '../views/ArticleView';
import editArticleView from '../views/editArticleView';
import articleModel from '../model';

// import articlesHolder from '../views/articlesHolder';
import DisplayerView from '../views/DisplayerView';

export default new (class {
  constructor() {
    /**
     * i commentted this.displayerView on instance cause to cache in home page
     * so i used instance to every get function
     */
    // this.displayerView = new DisplayerView(this);
  }
  getEditArticleEle() {
    return editArticleView.getEditArticle();
  }
  getArticlesElementForUser(onSuccess, onFailure) {
    let displayerView = new DisplayerView(this);
    articleModel.getArticlesForUser(
      (articles) => {
        displayerView.renderArticles(articles);
        onSuccess(displayerView.getArticleContainerEle());
      },
      (err) => {
        displayerView.renderErrorMsg('something went wrong !!!');
        onFailure(displayerView.getArticleContainerEle());
      }
    );
  }
  getUserArticles(username, onSuccess, onFailure) {
    let displayerView = new DisplayerView(this);
    articleModel.getUserArticles(
      username,
      (articles) => {
        displayerView.renderArticles(articles);
        onSuccess(displayerView.getArticleContainerEle());
      },
      (err) => {
        displayerView.renderErrorMsg('something went wrong !!!');
        onFailure(displayerView.getArticleContainerEle());
      }
    );
  }
  getLikedArticles(username, onSuccess, onFailure) {
    let displayerView = new DisplayerView(this);
    articleModel.getLikedArticles(
      username,
      (articles) => {
        displayerView.renderArticles(articles);
        onSuccess(displayerView.getArticleContainerEle());
      },
      (err) => {
        displayerView.renderErrorMsg('something went wrong !!!');
        onFailure(displayerView.getArticleContainerEle());
      }
    );
  }
  getDislikedArticles(username, onSuccess, onFailure) {
    let displayerView = new DisplayerView(this);
    articleModel.getDislikedArticles(
      username,
      (articles) => {
        displayerView.renderArticles(articles);
        onSuccess(displayerView.getArticleContainerEle());
      },
      (err) => {
        displayerView.renderErrorMsg('something went wrong !!!');
        onFailure(displayerView.getArticleContainerEle());
      }
    );
  }
  getSavedArticles(username) {
    let displayerView = new DisplayerView(this);
    articleModel.getSavedArticles(
      username,
      (articles) => {
        displayerView.renderArticles(articles);
        onSuccess(displayerView.getArticleContainerEle());
      },
      (err) => {
        displayerView.renderErrorMsg('something went wrong !!!');
        onFailure(displayerView.getArticleContainerEle());
      }
    );
  }
  getSharedArticles(username) {
    let displayerView = new DisplayerView(this);
    articleModel.getSharedArticles(
      username,
      (articles) => {
        displayerView.renderArticles(articles);
        onSuccess(displayerView.getArticleContainerEle());
      },
      (err) => {
        displayerView.renderErrorMsg('something went wrong !!!');
        onFailure(displayerView.getArticleContainerEle());
      }
    );
  }
  getTopReadingArticles() {
    let displayerView = new DisplayerView(this);
    articleModel.getTopReadingArticles(
      username,
      (articles) => {
        displayerView.renderArticles(articles);
        onSuccess(displayerView.getArticleContainerEle());
      },
      (err) => {
        displayerView.renderErrorMsg('something went wrong !!!');
        onFailure(displayerView.getArticleContainerEle());
      }
    );
  }

  onLikeBtnClicked(articleView) {
    if (articleView.checkActiveLikeBtn()) {
      articleModel.removeLikeArticle(
        articleView.getArticleInfo(),
        (info) => {
          console.log(info);
          articleView.deactivateLikeBtn();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      articleModel.likeArticle(
        articleView.getArticleInfo(),
        (info) => {
          console.log(info);
          if (articleView.checkActiveDislikeBtn()) {
            articleModel.removeDislikeArticle(
              articleView.getArticleInfo(),
              (info) => {
                articleView.deactivateDislikeBtn();
              },
              (err) => {
                console.log(err);
              }
            );
          }
          articleView.activeLikeBtn();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  onDislikeBtnClicked(articleView) {
    if (articleView.checkActiveDislikeBtn()) {
      articleModel.removeDislikeArticle(
        articleView.getArticleInfo(),
        (info) => {
          console.log(info);
          articleView.deactivateDislikeBtn();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      articleModel.dislikeArticle(
        articleView.getArticleInfo(),
        (info) => {
          console.log(info);
          if (articleView.checkActiveLikeBtn()) {
            articleModel.removeLikeArticle(
              articleView.getArticleInfo(),
              (info) => {
                articleView.deactivateLikeBtn();
              },
              (err) => {
                console.log(err);
              }
            );
          }
          articleView.activeDislikeBtn();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  onShareBtnClicked(articleView) {
    articleModel.shareArticle(
      articleView.getArticleInfo(),
      (info) => {
        console.log(info);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  onSaveBtnClicked(articleView) {
    if (articleView.checkActiveSaveBtn()) {
      articleModel.saveArticle(
        articleView.getArticleInfo(),
        (info) => {
          console.log(info);
          articleView.deactivateSaveBtn();
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      articleModel.likeArticle(
        articleView.getArticleInfo(),
        (info) => {
          console.log(info);
          articleView.activeSaveBtn();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
})();
