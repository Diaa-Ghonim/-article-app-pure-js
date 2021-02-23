import { CREATE_DIV } from '../../../utils';
import middleNavTemplate from './templ/middleNav.ejs';
import router from '../../../router';
import pubsub from '../../../pubsub';

export default class MiddleNav {
  constructor(data) {
    this.$middleNav = CREATE_DIV('div', { class: 'user-nav' });
    this.$listItems = undefined;
    this.renderMiddleNav(data);
  }
  renderMiddleNav(data) {
    this.$middleNav.innerHTML = middleNavTemplate(data);
    this.cacheDomElements();
    this.setupListeners();
    this.activeListOnPageRendered();
  }
  getMiddleNav() {
    return this.$middleNav;
  }
  cacheDomElements() {
    this.$listItems = this.$middleNav.querySelectorAll('li');
  }
  setupListeners() {
    let that = this;
    this.$listItems.forEach((listItem) => {
      listItem.addEventListener('click', function (e) {
        e.preventDefault();
        that.deactiviateList();
        that.activeList(this);
        let route = this.querySelector('a').attributes.href.value;
        if (route !== router.getPath()) {
          router.changeState(route);
          pubsub.publish('MiddleNav/articlesStateChanged', route);
        }
      });
    });
  }

  activeListOnPageRendered() {
    this.$listItems.forEach((listItem) => {
      if (
        listItem.querySelector('a').attributes.href.value == router.getPath()
      ) {
        this.activeList(listItem);
      }
    });
  }
  activeList(listItem) {
    listItem.classList.add('active-list');
  }
  deactiviateList() {
    this.$listItems.forEach((listItem) => {
      listItem.classList.remove('active-list');
    });
  }
}
