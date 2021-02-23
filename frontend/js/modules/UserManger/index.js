import UserCardInfo from './UserCard/View';
import userCardPresenter from './UserCard/Presenter';
// const getUserCardInfo = UserCardAllInfoView.renderUserCardInfo
export { UserCardInfo };

export default new (class UserManager {
  constructor() {}
  getUserCardInfo(username, onSuccess, onFailure) {
    userCardPresenter.getUserCardInfo(username, onSuccess, onFailure);
  }
})();
