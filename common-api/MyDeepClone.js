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
