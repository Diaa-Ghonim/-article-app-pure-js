export default new (class Router {
  constructor() {
    this.routes = [];
  }

  getPath() {
    if (location.search) {
      return `/search${location.search}`;
    }
    return location.pathname;
  }
  getUsername() {
    return location.pathname.split('/')[1];
  }
  changeState(route) {
    if (!typeof route == 'string')
      throw new Error('param route must be string');
    window.history.pushState({}, '', route);
  }

  addRoute(uri, callback) {
    if (!uri || !callback) throw new Error('uri || callback not exist');
    if (!typeof uri == 'string' || !uri instanceof RegExp)
      throw new Error('uri must be only string or reqexp');
    if (typeof callback !== 'function')
      throw new Error('callback must be function');

    this.routes.forEach((route) => {
      if (route.uri === uri || route.uri.toString() === uri.toString())
        throw new Error('this uri is exist');
    });

    let route = {
      uri,
      callback,
    };
    this.routes.push(route);
  }

  goToCurrentPage() {
    let path = this.getPath();
    if (path == '/') {
      path = '/home';
      this.changeState('/home');
    }

    let check = false;
    for (let i = 0; i < this.routes.length; i++) {
      let route = this.routes[i];
      let regex = new RegExp(route.uri);

      if (route.uri instanceof String) {
        regex = new RegExp(`^${route.uri}$`);
      }

      if (regex.test(path)) {
        console.log(regex, path, route.uri);
        route.callback();
        check = true;
        break;
      }
    }

    if (!check) {
      document
        .querySelector('.main-container-holder')
        .setAttribute('data-with-sidebar', false);
      document.querySelector('.content-holder').innerHTML =
        '<h1> Not found page </h1>';
    }
  }

  goTo(route) {
    this.changeState(route);
    this.goToCurrentPage();
  }
})();
