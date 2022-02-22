function add(...args) {
  function helper(num1, num2) {
    const num1Digits = (num1.toString().split('.') || '').length;
    const num2Digits = (num2.toString().split('.') || '').length;
    const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
  }

  let res = 0;
  for (let i = 0; i < args.length; i++) {
    res = helper(res, args[i]);
  }

  return res;
}

