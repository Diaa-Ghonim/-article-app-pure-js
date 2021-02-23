import Router from '../router/index.js';
import { CREATE_DIV } from '../utils';
import AppTemplateTmpl from './appTemplate.tmpl.ejs';
import { homePage } from '../pages/home';
import { profilePage } from '../pages/profile';
import { editArticlePage } from '../pages/editArticle';
import { registrationPage } from '../pages/registration';
import { navbar } from './navbar';
import { sidebar } from './sidebar';
import MainUser from '../Classes/MainUser.js';
import { searchPage } from '../pages/search/';
import { userSettingPage } from '../pages/userSetting';

export default new (class AppTemplate {
  constructor() {
    this.$appTemplate = CREATE_DIV('div', { class: 'app', id: 'app' });
    this.$navHolder = undefined;
    this.$sidebarHolder = undefined;
    this.$mainContainerHolder = undefined;
    this.$contentHolder = undefined;
    this.buildTemplateStructure();
    this.registerPagesIntoRouter();
  }

  buildTemplateStructure() {
    this.$appTemplate.innerHTML = AppTemplateTmpl();
    this.cacheDOMElemets();
    this.renderNav();
    this.renderSidebar();
  }

  cacheDOMElemets() {
    this.$navHolder = this.$appTemplate.querySelector('.nav-holder');
    this.$sidebarHolder = this.$appTemplate.querySelector('.sidebar-holder');
    this.$mainContainerHolder = this.$appTemplate.querySelector(
      '.main-container-holder'
    );
    this.$contentHolder = this.$appTemplate.querySelector('.content-holder');
  }

  registerPagesIntoRouter() {
    Router.addRoute('/home', (router) => {
      this.showNavbarHolder();
      this.showSidebarHolder(); // show
      this.clearContentHolder();
      homePage.onBeforePageRendered();
      this.renderContent(homePage.get$PageContent());
    });

    Router.addRoute('/edit-article', () => {
      if (!MainUser.isSignedIn()) {
        Router.goTo('/');
        return;
      }
      this.hideSidebarHolder();
      this.clearContentHolder();
      editArticlePage.onBeforePageRendered();
      this.renderContent(editArticlePage.get$PageContent());
      editArticlePage.onAfterPageRendered();
    });

    Router.addRoute('/signin', () => {
      if (MainUser.isSignedIn()) {
        return Router.goTo('/');
      }
      this.hideNavbarHolder();
      this.hideSidebarHolder();
      registrationPage.renderSigninForm();
      this.clearContentHolder();
      this.renderContent(registrationPage.get$PageContent());
    });

    Router.addRoute('/signup', () => {
      if (MainUser.isSignedIn()) {
        return Router.goTo('/');
      }
      this.hideNavbarHolder();
      this.hideSidebarHolder();
      registrationPage.renderSignupForm();
      this.clearContentHolder();
      this.renderContent(registrationPage.get$PageContent());
    });

    Router.addRoute(/^\/search\?q=[A-Za-z0-9\_\.]*$/gi, () => {
      if (!MainUser.isSignedIn()) {
        return Router.goTo('/');
      }
      this.hideSidebarHolder();
      this.clearContentHolder();
      this.renderContent(searchPage.get$PageContent());
    });

    Router.addRoute(/^\/[A-Za-z0-9\_\.]+$/gi, () => {
      if (!MainUser.isSignedIn()) {
        return Router.goTo('/');
      }
      this.hideSidebarHolder();
      this.clearContentHolder();
      // profilePage.onBeforePageRendered();
      this.renderContent(profilePage.get$PageContent());
      profilePage.onAfterPageRendered(Router.getPath());
    });

    Router.addRoute(/^\/[A-Za-z0-9\_\.]+\/likes$/gi, () => {
      if (!MainUser.isSignedIn()) {
        return Router.goTo('/');
      }
      this.hideSidebarHolder();
      this.clearContentHolder();
      this.renderContent(profilePage.get$PageContent());
      profilePage.onAfterPageRendered(Router.getPath());
    });

    Router.addRoute(/^\/[A-Za-z0-9\_\.]+\/dislikes$/gi, () => {
      if (!MainUser.isSignedIn()) {
        return Router.goTo('/');
      }
      this.hideSidebarHolder();
      this.clearContentHolder();
      this.renderContent(profilePage.get$PageContent());
      profilePage.onAfterPageRendered(Router.getPath());
    });

    Router.addRoute('setting/profile', () => {
      if (!MainUser.isSignedIn()) {
        return Router.goTo('/');
      }
      this.hideSidebarHolder();
      this.clearContentHolder();
      this.renderContent(userSettingPage.get$PageContent());
    });

    Router.addRoute('top-reading', () => {
      if (!MainUser.isSignedIn()) {
        return Router.goTo('/');
      }
      /**
       * this code for test no more
       */
      // this.hideSidebarHolder();
      this.clearContentHolder();
      this.renderContent(document.createElement('div'));
    });

    Router.addRoute('best-writers', () => {
      if (!MainUser.isSignedIn()) {
        return Router.goTo('/');
      }
      /**
       * this code for test no more
       */
      // this.hideSidebarHolder();
      this.clearContentHolder();
      this.renderContent(document.createElement('div'));
    });
  }

  renderContent($contnet) {
    this.$contentHolder.appendChild($contnet);
  }

  clearContentHolder() {
    this.$contentHolder.innerHTML = '';
  }

  hideSidebarHolder() {
    this.$mainContainerHolder.setAttribute('data-with-sidebar', false);
  }

  showSidebarHolder() {
    this.$mainContainerHolder.setAttribute('data-with-sidebar', true);
  }

  showNavbarHolder() {
    this.$appTemplate.setAttribute('data-with-navbar', true);
  }

  hideNavbarHolder() {
    this.$appTemplate.setAttribute('data-with-navbar', false);
  }

  renderNav() {
    this.$navHolder.appendChild(navbar.get$navbarEle());
  }

  renderSidebar() {
    this.$sidebarHolder.appendChild(sidebar.get$sidebar());
  }

  get$AppTemplate() {
    return this.$appTemplate;
  }
})();
