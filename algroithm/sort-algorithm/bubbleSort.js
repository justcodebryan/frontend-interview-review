const { customComparator } = require('./utils');

const bubbleSort_1 = function(nums) {
  let flag = true;
  while (flag) {
    flag = false;
    for (let i = 0; i < nums.length; ++i) {
      if (nums[i] > nums[i + 1]) {
        flag = true;
        const temp = nums[i];
        nums[i] = nums[i + 1];
        nums[i + 1] = temp;
      }
    }
  }
}

customComparator(bubbleSort_1);