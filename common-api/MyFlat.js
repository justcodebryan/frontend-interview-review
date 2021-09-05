function flatDeep(arr, depth) {
  return depth > 0
    ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(arr, depth - 1) : val))
    : arr.slice();
}

function eachFlat(arr = [], depth = 1) {
  const result = [];

  (function flat(arr, depth) {
    arr.forEach(item => {
      if (Array.isArray(item) && depth > 0) {
        flat(item, depth - 1);
      } else {
        result.push(item);
      }
    });
  })(arr, depth);

  return result;
}

function forFlat(arr = [], depth = 1) {
  const result = [];

  (function flat(arr, depth) {
    for (let item of arr) {
      if (Array.isArray(item) && depth > 0) {
        flat(arr, depth - 1);
      } else {
        item !== void 0 && result.push(item);
      }
    }
  })(arr, depth);

  return result;
}
