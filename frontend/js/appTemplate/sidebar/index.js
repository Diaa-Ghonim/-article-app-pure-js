import sidebarTemplate from './templ/sidebar.ejs';
import { CREATE_DIV } from '../../utils';
import Router from '../../router';

class Sidebar {
  constructor() {
    this.$sidebar = CREATE_DIV('div', { class: 'sidebar-content' });
    this.$showmoreItems = undefined;
    this.render$sidebar();
  }
  render$sidebar() {
    this.$sidebar.innerHTML = sidebarTemplate();
    this.cachDomElements();
    this.setupListeners();
  }
  cachDomElements() {
    /**
     * array from show more links
     */
    this.$showmoreItems = this.$sidebar.querySelectorAll('.showmore');
  }
  setupListeners() {
    this.$showmoreItems.forEach((link) => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        let route = this.attributes.href.value;
        Router.goTo(route);
      });
    });
  }
  get$sidebar() {
    return this.$sidebar;
  }
}

export const sidebar = new Sidebar();
