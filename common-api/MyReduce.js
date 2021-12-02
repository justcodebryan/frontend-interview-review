function MyReduce(callbackFn, initialValue) {
  if (typeof callbackFn !== 'function') {
    throw new TypeError('CallbackFn must be callable');
  }

  let O = Object(this);
  const len = O.length >>> 0;

  if (len === 0 && !initialValue) {
    throw new TypeError('TypeError');
  }

  let accumulator = initialValue;
  let kPresent = false;
  let k = 0;
  if (accumulator === undefined) {
    for (; k < len; k++) {
      if (k in O) {
        accumulator = O[k];
        k++;
        break;
      }
    }
  }

  if (k === len && accumulator === undefined) {
    throw new TypeError();
  }

  for (; k < len; k++) {
    if (k in O) {
      accumulator = callbackFn.call(undefined, accumulator, O[k], k, O);
    }
  }

  return accumulator;
}
