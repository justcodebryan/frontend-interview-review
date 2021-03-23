/*
 * @lc app=leetcode.cn id=238 lang=javascript
 *
 * [238] 除自身以外数组的乘积
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
  const L = [];
  const R = [];

  const anwser = [];

  L[0] = 1;
  for (let i = 1; i < nums.length; i++) {
    L[i] = nums[i - 1] * L[i - 1];
  }

  R[nums.length - 1] = 1;
  for (let i = nums.length - 2; i >= 0; i--) {
    R[i] = nums[i + 1] * R[i + 1];
  }

  for (let i = 0; i < nums.length; i++) {
    anwser[i] = L[i] * R[i];
  }

  return anwser;
};
// @lc code=end

