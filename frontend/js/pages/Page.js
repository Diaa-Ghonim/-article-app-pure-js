import { CREATE_DIV } from '../utils';

export default class Page {
  constructor() {
    this.$pageContent = CREATE_DIV('div', { class: 'page' });
  }

  get$PageContent() {
    return this.$pageContent;
  }
}
