export const isEqual = function (arr1, arr2) {
  if ((arr1 === null && arr2 !== null) || (arr1 !== null && arr2 === null)) return false;
  if (arr1 === null && arr2 === null) return true;
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
};

export const copyArray = function (arr) {
  if (arr === null) {
    return null;
  }
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    res[i] = arr[i];
  }
  return res;
};

export const generateRandomArray = function (maxSize, maxValue) {
  const arr = [];
  for (let i = 0; i < maxSize + 1; i++) {
    arr[i] = (maxValue + 1) * Math.random() - maxValue * Math.random();
  }
  return arr;
};

export const printArray = function (arr) {
  if (arr === null) {
    return null;
  }
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i] + '');
  }
  console.log('\n');
};

export const comparator = function (arr) {
  arr.sort((a, b) => {
    return a - b;
  });
};

export const customComparator = function (testFunc) {
  const beginTime = new Date();
  // const testTime = 500000;
  const testTime = 50000;
  const maxSize = 100;
  const maxValue = 100;
  let succeed = true;
  for (let i = 0; i < testTime; i++) {
    let arr1 = generateRandomArray(maxSize, maxValue);
    let arr2 = copyArray(arr1);
    testFunc(arr1);
    comparator(arr2);
    if (!isEqual(arr1, arr2)) {
      succeed = false;
      printArray(arr1);
      printArray(arr2);
      break;
    }
  }
  const endTime = new Date();
  const deltaTime = endTime - beginTime;

  console.log('-------TEST FUNC INFO-------');
  console.log('testTime -> ', testTime);
  console.log('testFunc Name -> ', testFunc.name);
  console.log('-------TEST RESULT-------');
  console.log('The testFunc passed or not? -> ', succeed ? 'Yes' : 'No');
  console.log('The time that testFunc consuming -> ', deltaTime);
};