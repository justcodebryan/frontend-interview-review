/*
 * @lc app=leetcode.cn id=17 lang=javascript
 *
 * [17] 电话号码的字母组合
 */

// @lc code=start
/**
 * @param {string} digits
 * @return {string[]}
 */
const generateNumStrMap = () => {
  const map = new Map();

  map.set('2', 'abc');
  map.set('3', 'def');
  map.set('4', 'ghi');
  map.set('5', 'jkl');
  map.set('6', 'mno');
  map.set('7', 'pqrs');
  map.set('8', 'tuv');
  map.set('9', 'wxyz');

  return map;
};

var letterCombinations = function (digits) {
  if (digits.length === 0) return [];

  const map = generateNumStrMap();

  const strs = [];

  function helper(strs, map, digits, idx, combination) {
    if (combination.length === digits.length) {
      strs.push(combination);
    } else {
      let digit = digits.charAt(idx);
      let letters = map.get(digit);
      let lettersCount = letters.length;

      for (let i = 0; i < lettersCount; i++) {
        combination = combination + letters.charAt(i);
        helper(strs, map, digits, idx + 1, combination);
        combination.splice(idx, 1);
      }
    }
  }

  helper(strs, map, digits, 0, '');
  return strs;
};
// @lc code=end

