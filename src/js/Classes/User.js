const { Url } = require('../constants');

export default class User {
  constructor() {
    this.username = undefined;
    this.userImage = undefined;
    this.userBio = undefined;
    this.userRate = undefined;
    this.userBirth = undefined;
  }

  parseData(data) {
    this.username = data.username;
    this.userImage = data.userImage;
    this.userBio = data.userBio;
    this.userRate = data.userRate;
    this.userBirth = data.userBirth;
  }

  getUsername() {
    return this.username;
  }
  getUserImage() {
    return `${Url}images/${this.userImage}`;
  }
  getUserBio() {
    return this.userBio;
  }
  getUserRate() {
    return this.userRate;
  }
  getUserBirth() {
    return this.userBirth;
  }
}
