function isFunction(target) {
  return typeof target === 'function';
}

function isArray(target) {
  // return Object.prototype.toString.call(target) === '[object Array]';
  return Array.isArray(target);
}

function isBoolean(target) {
  return typeof target === 'boolean';
}

function isString(target) {
  return typeof target === 'string';
}

function isNumber(target) {
  return typeof target === 'number';
}

function isObject(target) {
  return target && typeof target === 'object';
}

function isNull(target) {
  return typeof target === 'object' && !target;
}

function isUndefined(target) {
  return typeof target === 'undefined';
}