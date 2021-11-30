<<<<<<< Updated upstream
function MyDeepClone (obj, cache = new WeakMap()) {
  if (typeof obj !== 'object') return obj;
  if (cache.get(obj)) return cache.get(obj);
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);

  const cloneObj = new obj.constructor();
  cache.set(obj, cloneObj);
  Object.keys(obj).forEach(key => {
    if (target.hasOwnProperty(key)) {
      cloneObj[key] = MyDeepClone(obj[key], cache);
    }
  });

  return cloneObj;
=======
const { isObject } = require('../utils');


function MyDeepClone (target) {
  const res = {};

  // undefined & null

  // RegExp 

  // Function

  Object.keys(target).forEach(key => {
    if (target.hasOwnProperty(key)) {
      res[key] = isObject(res[key]) ? MyDeepClone(res[key]) : res[key];
    }
  });

  return res;
>>>>>>> Stashed changes
}

function MyShallowClone (target) {
  const res = {};

  Object.keys(target).forEach(key => {
    if (target.hasOwnProperty(key)) {
      res[key] = target[key];
    }
  });

  return res;
}
