import { articelManager } from '../../modules/ArticleManager';
import Page from '../Page.js';
import {
  tinymceInit,
  removeAndReinitializeEditor,
} from '../../lib/tinymce-init.js';

class EditArticlePage extends Page {
  constructor() {
    super();
    // this.$pageContent = articelManager.getEditArticleEle();
  }

  #renderTinymce() {
    tinymceInit();
    removeAndReinitializeEditor();
  }
  onBeforePageRendered() {
    this.$pageContent.appendChild(articelManager.getEditArticleEle());
  }
  onAfterPageRendered() {
    this.#renderTinymce();
  }
}

export const editArticlePage = Object.freeze(new EditArticlePage());
