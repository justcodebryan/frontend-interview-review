function MyObjectFactory() {
  const obj = new Object();

  let Constructor = [].shift.call(arguments);

  obj.__proto__ = Constructor.prototype;

  const res = Constructor.apply(obj, arguments);

  return res instanceof Object ? res : obj;
}
