const { default: Validator } = require('./Validator');

class UserValidator extends Validator {
  constructor() {
    super();
  }

  checkPassword(password) {
    if (!password || password.length < 6) {
      return {
        success: false,
        message: 'password not exist or less than 6 letters',
      };
    }
    return {
      success: true,
    };
  }

  checkEmail(email) {
    let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!email || !regex.test(email)) {
      return {
        success: false,
        message: 'email not exist or not correct',
      };
    }
    return {
      success: true,
    };
  }
  checkFirstName(firstName) {
    if (!data.firstName || data.firstName.length < 3) {
      return {
        success: false,
        message: 'firstname not exist or less than 4 letters',
      };
    }
    return {
      success: true,
    };
  }

  checkLastName(lastName) {
    if (!data.lastName || data.lastName.length < 3) {
      return {
        success: false,
        message: 'lastname not exist or less than 4 letters',
      };
    }
    return {
      success: true,
    };
  }
}

export const userValidator = new UserValidator();
