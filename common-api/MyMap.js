// function MyMap(fn, thisValue) {
//   const res = [];
//   thisValue = thisValue || [];
//   let arr = this;
//   for (let i in arr) {
//     res.push(fn(arr[i]));
//   }
//   return res;
// }

Array.prototype.MyMap = function (callbackFn, thisArg) {
  if (thisArg === null || thisArg === undefined) {
    throw new TypeError('Cannot read property "map" of null or undefined');
  }

  if (typeof callbackFn !== "function") {
    throw new TypeError("callbackFn must be callable!");
  }

  let O = Object(this);
  let T = thisArg;

  // 右移 0 位, 保证 len 为数字且为整数
  const len = O.length >>> 0;
  let A = new Array(len);
  let k = 0;
  while (k < len) {
    if (k in O) {
      let kValue = O[k];
      let mappedValue = callbackFn.call(T, kValue, k, O);
      A[k] = mappedValue;
    }
    k++;
  }

  return A;
};