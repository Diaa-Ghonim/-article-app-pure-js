const { Url } = require('../../constants');
import userCardTemplate from './templ/user.ejs';
import Page from '../Page';
import articleCardTemplate from './templ/article.ejs';
import searchHolderTemplate from './templ/search.ejs';
import { CREATE_DIV } from '../../utils';

class SearchPage extends Page {
  constructor() {
    super();
    this.$pageContent = CREATE_DIV('div', { class: '' });
    this.$searchHolder = CREATE_DIV('div', { class: 'search-holder' });
    this.$userCard = CREATE_DIV('div', { class: 'user-card' });
    this.$articleCard = CREATE_DIV('div', { class: 'article-card' });
    this.$userCardWrapper = undefined;
    this.$articleCardWrapper = undefined;
    this.renderPage();
  }

  renderPage() {
    this.$pageContent.innerHTML = searchHolderTemplate();
    this.cachDomElements();
    this.renderSearchResult();
  }
  renderUserCard(data) {
    this.$userCard.innerHTML = userCardTemplate();
  }
  renderArticleCard(data) {
    this.$articleCard.innerHTML = articleCardTemplate();
  }
  cachDomElements() {
    this.$articleCardWrapper = this.$pageContent.querySelector(
      '.search-people-wrapper'
    );
    this.$userCardWrapper = this.$pageContent.querySelector(
      '.search-articles-wrapper'
    );
  }

  renderSearchResult() {
    this.$userCardWrapper.appendChild(this.$userCard);
    this.$articleCardWrapper.appendChild(this.$articleCard);
  }
  getData(searchtext) {
    fetch(Url + `/${searchtext}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
}

export const searchPage = new SearchPage();
