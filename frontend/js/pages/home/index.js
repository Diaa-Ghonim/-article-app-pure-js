import Page from '../Page';
import { articelManager } from '../../modules/ArticleManager';

class HomePage extends Page {
  constructor() {
    super();
    // this.$pageContent = undefined;
    this.cache = false;
  }
  onBeforePageRendered() {
    if (!this.cache) {
      articelManager.getArticlesElementForUser(
        (holder) => {
          this.$pageContent.appendChild(holder);
          console.log(this.$pageContent);
          this.cache = true;
        },
        (holder) => {
          this.$pageContent.appendChild(holder);
        }
      );
    }
  }
}

export const homePage = new HomePage();
