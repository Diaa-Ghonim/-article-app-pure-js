import { Url } from '../../../constants';
import Article from '../classes/Article/index.js';
import { PARSE_OBJECT_IN_CLASS } from '../../../utils';
import HttpClient from '../../../lib/HttpClient';
export default new (class {
  constructor() {
    this.articles = [];
    this.userArticles = [];
    this.likedArticles = [];
    this.dislikedArticles = [];
    this.savedArticles = [];
    this.sharedArticles = [];
    this.topReadingArticles = [];
  }

  getArticlesForUser(onSuccess, onFailure) {
    HttpClient.get(
      Url + 'articles',
      {},
      (result) => {
        result.forEach((article) => {
          this.articles.push(PARSE_OBJECT_IN_CLASS(article, Article));
        });
        onSuccess(this.articles);
      },
      (err) => {
        onFailure(err);
      }
    );
  }
  getUserArticles(username, onSuccess, onFailure) {
    HttpClient.get(
      Url + 'articles/' + username,
      {},
      (result) => {
        let userArticles = [];
        result.forEach((article) => {
          userArticles.push(PARSE_OBJECT_IN_CLASS(article, Article));
        });
        onSuccess(userArticles);
      },
      (err) => {
        onFailure(err);
      }
    );
  }
  getLikedArticles(username, onSuccess, onFailure) {
    HttpClient.get(
      Url + 'articles/likes/' + username,
      {},
      (result) => {
        let likedArticles = [];
        result.forEach((article) => {
          likedArticles.push(PARSE_OBJECT_IN_CLASS(article, Article));
        });
        onSuccess(likedArticles);
      },
      (err) => {
        onFailure(err);
      }
    );
  }
  getDislikedArticles(username, onSuccess, onFailure) {
    HttpClient.get(
      Url + 'articles/dislikes/' + username,
      {},
      (result) => {
        let dislikedArticles = [];
        result.forEach((article) => {
          dislikedArticles.push(PARSE_OBJECT_IN_CLASS(article, Article));
        });
        onSuccess(dislikedArticles);
      },
      (err) => {
        onFailure(err);
      }
    );
  }
  getSavedArticles(username, onSuccess, onFailure) {
    HttpClient.get(
      Url + 'articles/save/' + username,
      {},
      (result) => {
        result.forEach((article) => {
          this.savedArticles.push(PARSE_OBJECT_IN_CLASS(article, Article));
        });
        onSuccess(this.savedArticles);
      },
      (err) => {
        onFailure(err);
      }
    );
  }
  getSharedArticles(username, onSuccess, onFailure) {
    HttpClient.get(
      Url + 'articles/share/' + username,
      {},
      (result) => {
        result.forEach((article) => {
          this.sharedArticles.push(PARSE_OBJECT_IN_CLASS(article, Article));
        });
        onSuccess(this.sharedArticles);
      },
      (err) => {
        onFailure(err);
      }
    );
  }
  getTopReadingArticles(username, onSuccess, onFailure) {
    HttpClient.get(
      Url + 'articles/topReading/' + username,
      {},
      (result) => {
        result.forEach((article) => {
          this.topReadingArticles.push(PARSE_OBJECT_IN_CLASS(article, Article));
        });
        onSuccess(this.topReadingArticles);
      },
      (err) => {
        onFailure(err);
      }
    );
  }
  likeArticle(articleInfo, onSuccess, onFailure) {
    HttpClient.post(
      Url + 'articles/like/',
      { body: JSON.stringify(articleInfo) },
      (result) => {
        onSuccess(result);
      },
      (err) => {
        onFailure(err);
      }
    );
  }
  removeLikeArticle(articleInfo, onSuccess, onFailure) {
    HttpClient.post(
      Url + 'articles/removeLike/',
      { body: JSON.stringify(articleInfo) },
      (result) => {
        onSuccess(result);
      },
      (err) => {
        onFailure(err);
      }
    );
  }
  dislikeArticle(articleInfo, onSuccess, onFailure) {
    HttpClient.post(
      Url + 'articles/dislike/',
      { body: JSON.stringify(articleInfo) },
      (result) => {
        onSuccess(result);
      },
      (err) => {
        onFailure(err);
      }
    );
  }
  removeDislikeArticle(articleInfo, onSuccess, onFailure) {
    HttpClient.post(
      Url + 'articles/removeDislike',
      { body: JSON.stringify(articleInfo) },
      (result) => {
        onSuccess(result);
      },
      (err) => {
        onFailure(err);
      }
    );
  }
  shareArticle(articleInfo, onSuccess, onFailure) {
    HttpClient.post(
      Url + 'articles/share/',
      { body: JSON.stringify(articleInfo) },
      (result) => {
        onSuccess(result);
      },
      (err) => {
        onFailure(err);
      }
    );
  }
  saveArticle(articleInfo, onSuccess, onFailure) {
    HttpClient.post(
      Url + 'articles/save/',
      { body: JSON.stringify(articleInfo) },
      (result) => {
        onSuccess(result);
      },
      (err) => {
        onFailure(err);
      }
    );
  }
})();
