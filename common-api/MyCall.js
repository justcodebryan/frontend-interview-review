function MyCall(fn) {
  let context = this;
  context.fn = fn;

  let args = arguments.slice(1);
  context.fn(...args);

  delete context.fn;
}