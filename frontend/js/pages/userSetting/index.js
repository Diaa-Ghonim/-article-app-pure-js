import Page from '../Page';
import userEditTemplate from './templ/user-setting.ejs';
import MainUser from '../../Classes/MainUser';

class UserSettingPage extends Page {
  constructor() {
    super();
    this.$pageContent.innerHTML = userEditTemplate();
    this.$form = undefined;
    this.cachDomElements();
    this.setupLisenters();
  }

  cachDomElements() {
    this.$form = this.$pageContent.querySelector('#user-edit-form');
    console.log(this.$form);
  }
  getFormData() {
    let form = new FormData(this.$form);
    return {
      username: form.get('username'),
      userBio: form.get('bio'),
      userBirth: `${form.get('birth-month')}/${form.get(
        'birth-day'
      )}/${form.get('birth-year')}`,
    };
  }

  setupLisenters() {
    this.$form.addEventListener('submit', (e) => {
      e.preventDefault();
      console.log('edited form !!!');
      console.log(this.getFormData());
      MainUser.editInfo(this.getFormData());
    });
  }
}

export const userSettingPage = new UserSettingPage();
