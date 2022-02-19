
/**
 * @param {number} num
 * const sum1 = sum(1)
 * sum1(2) == 3 // true
 * sum1(3) == 4 // true
 * sum(1)(2)(3) == 6 // true
 * sum(5)(-1)(2) == 6 // true
 */
function sum (num) {
  // your code here
  const fn = (arg) => sum(num + arg);
  fn[Symbol.toPrimitive] = () => num;
  return fn;
}