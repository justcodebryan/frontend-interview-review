/*
 * @lc app=leetcode.cn id=283 lang=javascript
 *
 * [283] 移动零
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  let right = 0;
  let left = 0;
  const len = nums.length;
  while (right < len) {
    if (nums[right] !== 0) {
      swap(nums, right, left);
      left++;
    }
    right++;
  }
};

function swap (arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
// @lc code=end

