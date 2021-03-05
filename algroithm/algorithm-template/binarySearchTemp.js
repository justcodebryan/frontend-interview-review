/**
 * 
 * 模板应用范围：
 *    1. 有序数组
 *    2. 有序二维数组
 * 
 * 模板用法：
 *    1. 先将left和right定下来
 *    2. while循环写出来
 *    3. let mid = ((right - left) >> 1) + left; // 固定公式，防止right+left过大溢出，所以先计算相减结果
 *    4. 考虑比较条件
 * 
 * @param {*} nums 
 * @param {*} target 
 * @returns 
 */
const binarySearch = function (nums, target) {
  const n = nums.length;
  let left = 0;
  let right = n - 1;
  while (left <= right) {
    let mid = ((right - left) >> 1) + left;
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
};

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;

console.log(binarySearch(nums, target));