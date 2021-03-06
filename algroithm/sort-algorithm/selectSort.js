const { customComparator } = require('./utils');

const selectSort = function (nums) {
  for (let i = 0; i < nums.length; ++i) {
    let minIndex = i;
    for (let j = i + 1; j < nums.length; ++j) {
      minIndex = nums[j] < nums[minIndex] ? j : minIndex;
    }

    const temp = nums[i];
    nums[i] = nums[minIndex];
    nums[minIndex] = temp;
  }
};

customComparator(selectSort);