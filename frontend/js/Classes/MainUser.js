import { Url } from '../constants';
import Router from '../router';
import Cookie from '../cookie';
import Pubsub from '../pubsub';

export default new (class MainUser {
  constructor() {
    this.name = undefined;
    this.email = undefined;
    this.IS_USER_SIGIN_IN = false;
  }

  signin(email, pass) {
    return fetch(Url + 'sign', {
      method: 'put',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ email, pass }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        Cookie.set('userId', 45);
        this.IS_USER_SIGIN_IN = true;
        Pubsub.publish('MainUser/userStateChanged', { newState: 'signin' });
        Router.goTo('/');
        console.log(Pubsub.obj);
      })
      .catch((err) => {
        return err.message;
      });
  }

  signup(data) {
    fetch(Url + 'sign', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.IS_USER_SIGIN_IN = true;
        Pubsub.publish('MainUser/userStateChanged', { newState: 'signup' });
        Router.goTo('/');
      })
      .catch((err) => {
        return err.message;
      });
  }

  signout() {
    Cookie.clear();
    this.IS_USER_SIGIN_IN = false;

    // Pubsub.publish('MainUser/userStateChanged', {newState: 'signout'});
  }
  isSignedIn() {
    if (Cookie.get('userId')) {
      this.IS_USER_SIGIN_IN = true;
    }
    return this.IS_USER_SIGIN_IN;
  }

  editInfo(data) {
    fetch(Url + 'userInfo', {
      method: 'put',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log('edited done');
        console.log(data);
      })
      .catch((err) => {
        return err.message;
      });
  }
})();
