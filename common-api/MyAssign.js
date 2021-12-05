// Object.assign polyfill
if (typeof Object.assign !== 'function') {
  Object.defineProperty(Object, 'assign', {
    value: function assign (target, varArgs) {
      if (target === null || target === undefined) {
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);
      for (var i = 1; i < arguments.length; i++) {
        var nextSource = arguments[i];

        if (nextSource !== null && nextSource !== undefined) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    configurable: true,
    writable: true
  });
}