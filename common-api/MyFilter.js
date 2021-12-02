function MyFilter(callbackFn, thisArg) {
  if (this === null || this === undefined) {
    throw new TypeError('Cannot read property "filter" of null or undefined');
  }
  if (Object.prototype.toString.call(callbackFn) !== '[object Function]') {
    throw new TypeError('CallbackFn is not function');
  }

  let O = Object(this);
  let len = O.lenght >>> 0;

  let resLen = 0;
  const res = [];
  for (let i = 0; i < len; i++) {
    if (i in O) {
      let element = O[i];
      if (callbackFn.call(thisArg, O[i], i, O)) {
        res[resLen++] = element;
      }
    }
  }
  return res;
}

Array.prototype.MyFilter = MyFilter;