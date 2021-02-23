import navbarTemplate from './templ/navbar.ejs';
import { CREATE_DIV } from '../../utils';
import Router from '../../router';
import MainUser from '../../Classes/MainUser';
import Pubsub from '../../pubsub';

class Navbar {
  constructor() {
    this.$navbarEle = CREATE_DIV('div', { class: 'navbar' });
    this.listItems = undefined; // listItems
    this.$settingDropdownBtn = undefined; // settingDropdownBtn;
    this.$settingDropdown = undefined;
    this.$searchForm = undefined;
    this.renderNavbar(); // step 1
    this.handleUIUponUserState(); // name handleUIUponUserState();
    this.setupListeners();
  }

  renderNavbar() {
    this.$navbarEle.innerHTML = navbarTemplate();
    this.cachDomElement();
    console.log(this.$searchForm);
  }
  cachDomElement() {
    this.listItems = this.$navbarEle.querySelectorAll('li');
    this.$settingDropdownBtn = this.$navbarEle.querySelector('#show-dropdown');
    this.$settingDropdown = this.$navbarEle.querySelector('.dropdown');
    this.$searchForm = this.$navbarEle.querySelector('.search-form');
  }
  setupListeners() {
    this.$searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let data = new FormData(this.$searchForm);
      let r = data.get('search');
      if (!r) return;
      Router.goTo(`/search?q=${r}`);
    });
    this.$settingDropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.$settingDropdown.classList.toggle('dropped'); // active, shown, displayed, dropped
    });

    /**
     *  hide dropdown when user click on document body except that dropdown
     */
    document.body.addEventListener('click', (e) => {
      e.stopPropagation();
      if (
        !e.target.classList.contains('options') &&
        !e.target.classList.contains('dropdown')
      ) {
        this.$settingDropdown.classList.add('dropped');
      }
    });

    this.listItems.forEach((li) => {
      li.addEventListener('click', (e) => {
        e.preventDefault();
        let route = li.querySelector('a').attributes.href.value;
        if (route !== Router.getPath()) {
          Router.goTo(route);
        }
        if (li.classList.contains('sign-out-btn')) {
          MainUser.signout();
        }
        this.handleUIUponUserState();
      });
    });

    Pubsub.subscribe('MainUser/userStateChanged', (obj) => {
      this.handleUIUponUserState();
    });
  }

  handleUIUponUserState() {
    if (MainUser.isSignedIn()) {
      this.updateNavContentForSignInUser();
    } else {
      this.updateNavContentForSignOutUser();
    }
  }

  updateNavContentForSignInUser() {
    this.$navbarEle.setAttribute('data-user-logged-in', true);
  }
  updateNavContentForSignOutUser() {
    this.$navbarEle.setAttribute('data-user-logged-in', false);
  }

  get$navbarEle() {
    return this.$navbarEle;
  }
}

export const navbar = new Navbar();
