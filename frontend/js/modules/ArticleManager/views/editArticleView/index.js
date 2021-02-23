import createArticleTemplate from '../templ/editArticleTemp.ejs';
import { CREATE_DIV } from '../../../../utils';
import Presenter from '../../presenter';
export default new (class {
  constructor() {
    this.$editArticleEle = CREATE_DIV('div', { class: 'add-article-wrapper' });
    this.$form = undefined;
    this.$result = undefined;
    this.renderEditArticle();
  }
  renderEditArticle() {
    this.$editArticleEle.innerHTML = createArticleTemplate({});
    this.cachDomElements();
    this.setupListeners();
  }

  cachDomElements() {
    this.$form = this.$editArticleEle.querySelector('form');
    this.$result = this.$editArticleEle.querySelector('#con');
  }
  setupListeners() {
    this.$form.addEventListener('submit', (e) => {
      e.preventDefault();
      // this.$result.innerHTML += tinymce.get('textarea').getContent();
      // this.$result.innerHTML += tinymce.activeEditor.getContent({format : 'html'});
      // this.$result.innerHTML += tinymce.activeEditor.getContent();
      Presenter.logSomething(tinymce.get('textarea').getContent());
      this.$result.innerHTML += tinymce.activeEditor.setContent(' ');
    });
  }
  getEditArticle() {
    return this.$editArticleEle;
  }
})();
