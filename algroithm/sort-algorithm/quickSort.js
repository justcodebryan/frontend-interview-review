const { customComparator, printArray, generateRandomArray } = require('./utils');

const netherlandsFlags = function () {
  function partition(nums, l, r, p) {
    let less = l - 1;
    let more = r + 1;
    while (l < more) {
      if (nums[l] < p) {
        swap(nums, ++less, l++);
      } else if (nums[l] > p) {
        swap(nums, --more, l);
      } else {
        l++;
      }
    }
    return [less + 1, more - 1];
  }

  function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  const testArr = generateRandomArray(10, 100);
  printArray(testArr);
  res = partition(testArr, 0, testArr.length - 1, 1);
  printArray(testArr);
  console.log(res[0]);
  console.log(res[1]);
};

const quickSort = function (nums) {
  function partition(arr, l, r) {
    let less = l - 1;
    let more = r;
    while (l < more) {
      if (arr[l] < arr[r]) {
        swap(arr, ++less, l++);
      } else if (arr[l] > arr[r]) {
        swap(arr, --more, l);
      } else {
        l++;
      }
    }
    swap(arr, more, r);
    return [less + 1, more];
  }

  function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  function helper(arr, l, r) {
    if (l < r) {
      swap(arr, l + Math.floor(Math.random() * (r - l + 1)), r);
      let p = partition(arr, l, r);
      helper(arr, l, p[0] - 1);
      helper(arr, p[1] + 1, r);
    }
  }

  if (nums === null || nums.length < 2) return;

  helper(nums, 0, nums.length - 1);
};

customComparator(quickSort);
// netherlandsFlags();