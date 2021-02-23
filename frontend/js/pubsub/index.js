export default Object.freeze(
  new (class Pubsub {
    constructor() {
      this.obj = {};
    }

    subscribe(event, callback) {
      if (!this.obj[event]) this.obj[event] = [];
      this.obj[event].push(callback);
    }

    unsubscribe(event, callbackReference) {
      if (!this.obj[event]) return;
      let index = this.obj[event].indexOf(callbackReference);
      this.obj[event].splice(index, 1);
      if (!this.obj[event].length) delete this.obj[event];
    }

    publish(event, data) {
      if (!this.obj[event]) return;
      this.obj[event].forEach((callback) => {
        callback(data);
      });
    }
  })()
);
