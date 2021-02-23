export default Object.freeze({
  get: function (name) {
    let val;
    let cookies = document.cookie.split(';');
    cookies.forEach((ele) => {
      if (ele.charAt(0) == ' ') {
        ele = ele.slice(1);
      }
      if (ele.indexOf(name) > -1) {
        val = ele.slice(name.length + 1);
      }
    });
    return val;
  },

  set: function (name, value, options) {
    let data = [name + '=' + value];

    if (options) {
      for (const key in options) {
        if (options.hasOwnProperty(key)) {
          if (typeof options.expires == 'number') {
            options.expires = new Date(options.expires * 1000 + +new Date());
            data.push(key + '=' + options.expires);
            continue;
          }
          if (key == 'secure') {
            data.push(key + ';');
            continue;
          }
          data.push(key + '=' + options[key]);
        }
      }
    }

    document.cookie = data.join('; ');
  },

  clear: function (name, options) {
    if (!options) options = {};
    options.expires = -14785;
    if (!arguments.length) {
      document.cookie.split(';').forEach((ele) => {
        if (ele.charAt(0) == ' ') {
          ele = ele.slice(1);
        }
        let arr = ele.split('=');
        options.expires = -14785;
        this.set(arr[0], ' ', options);
        console.log(ele);
      });
      return;
    }

    this.set(name, '', options);
  },
});
