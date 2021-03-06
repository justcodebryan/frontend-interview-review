const { customComparator } = require('./utils');

const insertSort = function (nums) {
  if (nums === null || nums.length < 2) return;
  
  for (let i = 1; i < nums.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] > nums[j + 1]) {
        swap(nums, j, j + 1);
      }
    }
  }

  function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
};

customComparator(insertSort);