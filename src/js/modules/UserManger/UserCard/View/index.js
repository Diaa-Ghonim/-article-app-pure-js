import userCardInfoTemplate from '../templ/userCardInfo.ejs';
import { CREATE_DIV } from '../../../../utils';
import Router from '../../../../router';
import UserCardModel from '../../model';

// export * from './UserCard'
// export * from './UserCardInfo'
// export * from './UserList';

export default class UserCardInfo {
  constructor(userInfo) {
    this.$userCardInfoEle = CREATE_DIV('div', { class: 'user-info-wrapper' });
    this.$editBtn = undefined;
    this.renderUserCardInfo(userInfo);
  }

  renderUserCardInfo(userInfo) {
    this.$userCardInfoEle.innerHTML = userCardInfoTemplate(userInfo);
    this.cachDomElements();
    this.setupListeners();
  }
  cachDomElements() {
    this.$editBtn = this.$userCardInfoEle.querySelector('#edit-btn');
  }
  setupListeners() {
    this.$editBtn.addEventListener('click', () => {
      Router.goTo('setting/profile');
    });
  }

  getUserCardInfoEle() {
    return this.$userCardInfoEle;
  }
}

/**
 * renderUserCardInfo($element, onRendered) {
        UserCardModel.getUserInfo(Router.getUsername(), (data) => {
            this.$userCardInfo.innerHTML = UserCardInfoTemplate(data);
            $element.appendChild(this.$userCardInfo)
            this.cachDomElements();
            this.setupListeners();
            if (onRendered) {
                onRendered(data);
            }         
        }, (err) => {
            this.$userCardInfo.innerHTML = 'something went wrong !!!';
            $element.appendChild(this.$userCardInfo);
        })
        
    }
 */
