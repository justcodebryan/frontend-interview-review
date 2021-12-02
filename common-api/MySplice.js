function MySplice(startIndex, deleteCount, ...addElement) {
  if (this === null || this === undefined) {
    throw new TypeError('Cannot read property "splice" of null or undefined');
  }

  let argLen = arguments.length;
  let O = Object(this);
  const len = O.length >>> 0;
  let deleteArr = new Array(deleteCount);


}

Array.prototype.MySplice = MySplice;

