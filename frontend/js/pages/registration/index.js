import Page from '../Page.js';
import Router from '../../router';
import MainUser from '../../Classes/MainUser';
import { CREATE_DIV } from '../../utils';
import { userValidator } from '../../Classes/validatation/UserValidator.js';
import registrationTemplate from './templ/registration.ejs';
import signinTemplate from './templ/signin.ejs';
import signupTemplate from './templ/signup.ejs';

class Registration extends Page {
  constructor() {
    super();
    this.$pageContent = CREATE_DIV('div', { class: 'container-registration' });
    this.$signinEle = CREATE_DIV('div');
    this.$signupEle = CREATE_DIV('div');
    this.$formHolderEle = undefined;
    this.$errorMessageEle = undefined;
    this.$goToSigninFormBtn = undefined;
    this.$goToSignupFormBtn = undefined;
    this.$signinForm = undefined;
    this.$signupForm = undefined;
    this.checkErrorMessageEle = false;
    this.activeForm = 'signin';
    this.#renderPage();
  }

  #setActiveForm(formName) {
    this.activeForm = formName;
  }

  #renderPage() {
    this.$pageContent.innerHTML = registrationTemplate();
    this.$signinEle.innerHTML = signinTemplate();
    this.$signupEle.innerHTML = signupTemplate();
    this.#cacheDOMElement();
    this.#setupListeners();
  }

  #cacheDOMElement() {
    this.$formHolderEle = this.$pageContent.querySelector('#register-view');
    this.$errorMessageEle = this.$pageContent.querySelector(
      '#show-error-message'
    );
    this.$goToSigninFormBtn = this.$pageContent.querySelector('#in');
    this.$goToSignupFormBtn = this.$pageContent.querySelector('#up');
    this.$signinForm = this.$signinEle.querySelector('form');
    this.$signupForm = this.$signupEle.querySelector('form');
  }

  #setupListeners() {
    this.$goToSigninFormBtn.addEventListener(
      'click',
      this.#onGoToSigninForm.bind(this)
    );
    this.$goToSignupFormBtn.addEventListener(
      'click',
      this.#onGoToSignupForm.bind(this)
    );
    this.$signinForm.addEventListener(
      'submit',
      this.#onSigninSubmit.bind(this)
    );
    this.$signupForm.addEventListener(
      'submit',
      this.#onSignupSubmit.bind(this)
    );
  }

  #getSigninFormData() {
    let form = new FormData(this.$signinForm);
    let email = form.get('email');
    let password = form.get('password');
    return { email, password };
  }

  #onGoToSigninForm(e) {
    if (this.activeForm !== 'signin') {
      this.renderSigninForm();
      Router.changeState('/signin');
    }
  }

  #onGoToSignupForm(e) {
    if (!this.activeForm !== 'signup') {
      this.renderSignupForm();
      Router.changeState('/signup');
    }
  }

  #onSigninSubmit(e) {
    e.preventDefault();

    let data = this.#getSigninFormData();
    let validateResult = this.#validateSigninFormData(data);
    if (!validateResult.success) {
      this.#showError(validateResult.message);
      return;
    }
    MainUser.signin(data.email, data.password);
  }

  #onSignupSubmit(e) {
    e.preventDefault();
    let data = this.#getSignupFormData();
    let validateResult = this.#validateSignupFormData(data);
    if (!validateResult.success) {
      this.#showError(validateResult.message);
      return;
    }
    console.log(data);
    MainUser.signup();
  }

  #getSignupFormData() {
    let form = new FormData(this.$signupForm);
    let email = form.get('email');
    let password = form.get('password');
    let firstName = form.get('firstname');
    let lastName = form.get('lastname');
    return { email, password, firstName, lastName };
  }

  #validateSigninFormData(data) {
    if (!userValidator.checkEmail(data.email).success) {
      return userValidator.checkEmail(data.email);
    } else if (!userValidator.checkPassword(data.password).success) {
      return userValidator.checkPassword(data.password);
    }
    return {
      success: true,
    };
  }
  #validateSignupFormData(data) {
    if (!userValidator.checkFirstName(data.firstName).success) {
      return userValidator.checkFirstName(data.firstName);
    } else if (!userValidator.checkFirstName(data.firstName).success) {
      return userValidator.checkFirstName(data.firstName);
    } else if (!userValidator.checkEmail(data.email).success) {
      return userValidator.checkEmail(data.email);
    } else if (!userValidator.checkPassword(data.password).success) {
      return userValidator.checkPassword(data.password);
    }
    return {
      success: true,
    };
  }
  renderSigninForm() {
    this.#addSelectClass(this.$goToSigninFormBtn);
    this.#setActiveForm('signin');
    this.#removeSelectClass(this.$goToSignupFormBtn);
    this.#clearFormHolderEle();
    this.#renderFormHolderEle(this.$signinEle);
  }

  renderSignupForm() {
    this.#addSelectClass(this.$goToSignupFormBtn);
    this.#setActiveForm('signup');
    this.#removeSelectClass(this.$goToSigninFormBtn);
    this.#clearFormHolderEle();
    this.#renderFormHolderEle(this.$signupEle);
  }

  #clearFormHolderEle() {
    this.$formHolderEle.innerHTML = '';
  }

  #renderFormHolderEle($form) {
    this.$formHolderEle.appendChild($form);
  }

  #addSelectClass($ele) {
    $ele.classList.add('select');
  }

  #removeSelectClass($ele) {
    $ele.classList.remove('select');
  }

  #showError(message) {
    if (!this.checkErrorMessageEle) {
      this.$errorMessageEle.innerHTML = '';
      this.$errorMessageEle.style.display = 'block';
      this.$errorMessageEle.innerHTML = message;
      this.checkErrorMessageEle = true;
      setTimeout(() => {
        this.$errorMessageEle.style.display = 'none';
        this.checkErrorMessageEle = false;
      }, 3000);
    }
  }
}

export const registrationPage = new Registration();
