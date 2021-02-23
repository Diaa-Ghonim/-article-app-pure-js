import URL, { Url } from '../../../../constants';

export default class {
  constructor() {
    this.articleId = undefined;
    this.articleOwner = undefined;
    this.articleAddress = undefined;
    this.articleContent = undefined;
    this.articleImage = undefined;
    this.articleDate = undefined;
    this.liked = undefined;
    this.disliked = undefined;
    this.saved = undefined;
  }

  parseData(article) {
    this.articleId = article.id;
    this.articleOwner = article.owner;
    this.articleAddress = article.address;
    this.articleContent = article.content;
    this.articleImage = article.image;
    this.articleDate = article.date;
    this.liked = article.liked;
    this.disliked = article.disliked;
    this.saved = article.saved;
  }
  getArticleId() {
    return this.articleId;
  }
  getArticleOwner() {
    return this.articleOwner;
  }
  getArticleAddress() {
    return this.articleAddress;
  }
  getArticleContent() {
    return this.articleContent;
  }
  getArticleImage() {
    return `${Url}images/${this.articleImage}`;
  }
  getArticleDate() {
    return this.articleDate;
  }
  isLiked() {
    return this.liked;
  }
  isDisliked() {
    return this.disliked;
  }
  isSaved() {
    return this.saved;
  }
}
