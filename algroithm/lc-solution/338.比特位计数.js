/*
 * @lc app=leetcode.cn id=338 lang=javascript
 *
 * [338] 比特位计数
 */

// @lc code=start
/**
 * @param {number} num
 * @return {number[]}
 */
 var countBits = function(num) {
  const bits = [];
  for (let i = 0; i <= num; i++) {
    bits[i] = countOnes(i);
  }
  return bits;
};

function countOnes(x) {
  let ones = 0;
  while (x > 0) {
    x &= (x - 1);
    ones++;
  } 
  return ones;
}
// @lc code=end

