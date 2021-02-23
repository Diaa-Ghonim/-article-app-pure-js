import userModel from '../../model';
import UserCardInfoView from '../View/index';
export default new (class {
  constructor() {}
  getUserCardInfo(username, onSuccess, onFailure) {
    userModel.getUserInfo(
      username,
      (userInfo) => {
        let userCardInfoEle = new UserCardInfoView(
          userInfo
        ).getUserCardInfoEle();
        onSuccess(userCardInfoEle, userInfo);
      },
      (err) => {
        onFailure(err);
      }
    );
  }
})();
