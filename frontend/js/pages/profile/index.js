import Page from '../Page.js';
import pageTemplate from './templ/pageTempl.ejs';
import userManager from '../../modules/UserManger';
import MiddleNav from './middleNav';
import Router from '../../router';
import pubsub from '../../pubsub/index.js';
import { articelManager } from '../../modules/ArticleManager/index.js';
// import MiddleNav from './page-components';
// import {  } from "../../modules/article/";

class ProfilePage extends Page {
  constructor() {
    super();
    this.$pageContent.innerHTML = pageTemplate();
    this.$userCardInfoHolder = this.$pageContent.querySelector(
      '#user-card-holder'
    );
    this.$middleNav = this.$pageContent.querySelector('#middle-nav');
    this.$articlesHolder = this.$pageContent.querySelector('#articles-holder');
    this.setupListeners();
  }

  onAfterPageRendered(route) {
    this.updatePage(route);
  }

  updatePage(route, onSuccess) {
    userManager.getUserCardInfo(
      Router.getUsername(),
      (userCardInfoEle, userInfo) => {
        try {
          this.clearUserCardInfoHolder();
          this.clearMiddleNavHolder();
          this.renderUserCardInfoHolder(userCardInfoEle);
          let middleNav = new MiddleNav(userInfo);
          this.renderMiddleNavHolder(middleNav.getMiddleNav());
          this.renderArticlesBasedOnRoute(route);
        } catch (error) {
          this.$userCardInfoHolder.innerHTML = '<h1> this user not found </h1>';
        }
      },
      (err) => {
        this.$userCardInfoHolder.innerHTML = '<h1> this user not found </h1>'; //
      }
    );
    // const u = router.getUsername();
    // set loading ... + clear
    // UserManger.getUser(u, onSuccess, onError);
    // PostManager.renderUserPosts($elem, u) |
    // StoryManager.getUiElement();
    // MiddleNav.updateUser(u).getElemet()
  }
  setupListeners() {
    pubsub.subscribe('MiddleNav/articlesStateChanged', (route) => {
      console.log(route);
      this.renderArticlesBasedOnRoute(route);
    });
  }
  renderArticlesBasedOnRoute(route) {
    this.clearArticlesHolder();
    if (/^\/[A-Za-z0-9\_\.]+$/gi.test(route)) {
      articelManager.getUserArticles(
        Router.getUsername(),
        (holderEleWithData) => {
          this.renderArticlesHolder(holderEleWithData);
        },
        (holderEleWithError) => {
          console.log(144111111);
          this.renderArticlesHolder(holderEleWithError);
        }
      );
      // this.renderArticlesHolder();
    } else if (/^\/[A-Za-z0-9\_\.]+\/likes$/gi.test(route)) {
      articelManager.getLikedArticles(
        Router.getUsername(),
        (holderEleWithData) => {
          this.renderArticlesHolder(holderEleWithData);
        },
        (holderEleWithError) => {
          this.renderArticlesHolder(holderEleWithError);
        }
      );
    } else if (/^\/[A-Za-z0-9\_\.]+\/dislikes$/gi.test(route)) {
      articelManager.getDislikedArticles(
        Router.getUsername(),
        (holderEleWithData) => {
          this.renderArticlesHolder(holderEleWithData);
        },
        (holderEleWithError) => {
          this.renderArticlesHolder(holderEleWithError);
        }
      );
    } else {
    }
  }
  renderUserCardInfoHolder($content) {
    this.$userCardInfoHolder.appendChild($content);
  }
  clearUserCardInfoHolder() {
    this.$userCardInfoHolder.innerHTML = ' ';
  }
  renderMiddleNavHolder($content) {
    this.$middleNav.appendChild($content);
  }
  clearMiddleNavHolder() {
    this.$middleNav.innerHTML = ' ';
  }
  renderArticlesHolder($content) {
    console.log(this.$articlesHolder);
    this.$articlesHolder.appendChild($content);
  }
  clearArticlesHolder() {
    this.$articlesHolder.innerHTML = ' ';
  }
}

export const profilePage = new ProfilePage();
