function MyCall(fn) {
  let context = this;
  context.fn = fn;

  let args = [].slice.call(arguments, 1);
  context.fn(...args);

  delete context.fn;
}

function add(x, y) {
  return x + y;
}
