import { isArray } from '../utils/index.js';

function MyApply(thisArgs, argsArray) {
  let context = thisArgs || globalThis;

  context.fn = this;

  if (!isArray(argsArray)) {
    context.fn(Array.prototype.slice.call(arguments, 1));
  }

  const res = context.fn(...argsArray);

  delete context.fn;

  return res;
}

Function.prototype.MyApply = MyApply;

console.log('=======TEST=======');
console.log('---------用 apply 将数组各项添加到另一个数组----------');
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.MyApply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]

console.log('---------使用 apply 和内置函数----------');
const numbers = [5, 6, 2, 3, 7];

const max = Math.max.MyApply(null, numbers);

console.log(max);
// expected output: 7

const min = Math.min.MyApply(null, numbers);

console.log(min);
// expected output: 2
