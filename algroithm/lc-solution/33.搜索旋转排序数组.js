/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 
 * 分成两部分: 左边的有序部分, 右边的有序部分
 * 首先使用二分法找到中间那个值
 * 如果找到直接返回
 * 如果没有找到, 判断左边和右边的两个数组是否是有序的
 *  - 左边有序 -> 判断有序数组内部 -> 
 */
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    let mid = ((right - left) >> 1) + left;

    // 找到target直接返回
    if (nums[mid] === target) return mid;

    // nums[mid]大于nums[left], 此时mid还未超过旋转的那个位置
    // 左边有序[left, mid]
    if (nums[left] <= nums[mid]) {
      // 在左边的有序部分中
      if (nums[mid] >= target && nums[left] <= target) {
        // target在[left, mid]之间
        right = mid - 1;
      } else {
        // target不在[left, mid]之间
        left = mid + 1;
      }
    } else {
      // nums[mid]小于nums[left], 此时mid超过旋转的位置
      // 右边有序[mid, right]

      if (nums[mid] <= target && nums[right] >= target) {
        // target在[mid, right]之间
        left = mid + 1;
      } else {
        // target不在[mid, right]之间
        right = mid - 1;
      }
    }
  }

  // 查找完整个数组没有找到, 返回-1
  return -1;
};