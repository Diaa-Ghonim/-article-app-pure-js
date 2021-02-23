export const CREATE_DIV = function (type, attributes) {
  if (!type || typeof type !== 'string') return;
  let div = document.createElement('div');
  for (const key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      div.setAttribute(key, attributes[key]);
    }
  }
  return div;
};

export const PARSE_OBJECT_IN_CLASS = function (obj, Class) {
  let instance = new Class();
  instance.parseData(obj);
  return instance;
};
