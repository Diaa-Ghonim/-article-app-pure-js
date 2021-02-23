import User from '../../../Classes/User.js';
import { Url } from '../../../constants';
import { PARSE_OBJECT_IN_CLASS } from '../../../utils';
import HttpClient from '../../../lib/HttpClient';
export default new (class UserManagerModel {
  constructor() {
    this.users = []; // array of users
    this.topTen = [];
  }

  getUserInfo(username, onSuccess, onFailure) {
    const filteredUser = this.users.find(
      (user) => user.getUsername() === username
    );

    if (filteredUser) {
      onSuccess(filteredUser);
    } else {
      HttpClient.get(
        Url + 'userInfo/' + username,
        {},
        (result) => {
          let userInstance = PARSE_OBJECT_IN_CLASS(result, User);
          this.users.push(userInstance);
          onSuccess(userInstance);
        },
        (err) => {
          console.log(err);
          onFailure(err);
        }
      );
    }
  }

  getTopTenUsers() {}
  // user || userId
  deleteUser(user) {}
})();
