// MyBind
function MyBind(thisArgs) {
  const context = this;
  const outerArgs = [].slice.call(arguments, 1);

  const fNOP = function () { };

  const fBound = function () {
    const innerArgs = [].slice.call(arguments);
    const argsArr = outerArgs.concat(innerArgs);
    return context.apply(this instanceof fBound ? this : thisArgs, argsArr);
  };

  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();
  return fBound;
}

Function.prototype.MyBind = MyBind;

const a = {
  x: 42,
  getX: function () {
    return this.x;
  }
};

const unboundGetX = a.getX;
console.log(unboundGetX()); // The function gets invoked at the global scope
// expected output: undefined

const boundGetX = unboundGetX.MyBind(a);
console.log(boundGetX());
// expected output: 42