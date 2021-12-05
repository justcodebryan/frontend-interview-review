// MyBind
/**
 * Bind函数实现
 *  - 传入一个以上的参数 context 和 arg1, arg2...
 *  - bind会创建一个绑定函数(bound function), 这个绑定函数是一个怪异函数对象
 * 
 * @param {*} thisArgs 
 * @returns 
 */
function MyBind (thisArgs) {
  // 当前的上下文环境
  const context = this;
  // 外面的形参
  // 因为外层的传入了this, 后续传入其他在函数里面用到的函数, 需要放在数组里面
  const outerArgs = [].slice.call(arguments, 1);

  // 中转对象, 一个空的函数
  const fNOP = function () { };

  // 因为这里有可能出现用new的情况, 所以需要先赋值给一个对象
  const fBound = function () {
    // 里面的参数
    const innerArgs = [].slice.call(arguments);
    // 合并外面和里面的参数
    const argsArr = outerArgs.concat(innerArgs);
    // 首先判断是否是用到new操作符
    // 如果用到了new操作符那么函数就会创建一个原型是fBound的对象
    // 如果没有用到new操作符, 那么函数的原型就不是fBound, 那么this应该指向传入的thisArgs
    return context.apply(this instanceof fBound ? this : thisArgs, argsArr);
  };

  // 为了防止原型被污染, 先将this.prototype赋值给fNOP.prototype
  fNOP.prototype = this.prototype;
  // 通过fNOP创建一个对象, 给到fBound.prototype
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