# Question1

source: https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/

Given an array of integers, without reordering, determine the maximum difference between any element and any prior smaller element. If there is never a lower prior element, return -1.

Example1
arr = [5, 3, 6, 7, 4]

There are no earlier elements than arr[0].
There is no earlier reading with a value lower than arr[1]

There are two lower earlier readings with a value lower than arr[2] = 6:
arr[2] - arr[1] = 6 - 3 = 3
arr[2] - arr[0] = 6 - 5 = 1

There are three lower earlier readings with a lower value than arr[3] = 7:
arr[3] - arr[2] = 7 - 6 = 1
arr[3] - arr[1] = 7 - 3 = 4
arr[3] - arr[0] = 7 - 5 = 2

There is one lower earlier reading with a lower value than arr[4] = 4:
arr[4] - arr[1] = 4 - 3 = 1

The maximum trailing record is arr[3] - arr[1] = 4.

Example2
arr = [4, 3, 2, 1]

No item in arr has a lower earlier reading, therefore return -1

Function DescriptionComplete the function maximumTrailing in the editor below.

maximumTrailing has the following parameter(s):
int arr[n]: an array of integers

```js
function maximumTrailing(input) {
  // write your code
  const len = input.length
  if (input === null || len < 2) {
    return -1
  }

  let arrMax = -1
  let leftMin = input[0]
  for (let i = 0; i < len; i++) {
    if (input[i] > leftMin && input[i] - leftMin > arrMax) {
      arrMax = input[i] - leftMin
    }
    if (input[i] < leftMin) {
      leftMin = input[i]
    }
  }

  return arrMax
}
```

# Question2

Implement a function sequentialResolution that takes in an array of
promises, promises, and an array of indices, order. The promises
should be resolved in the order of the indices in the order array.
After each promise is resolved push the returned value from the
promise to a global array resolvedPromises.

If a promise fails to resolve, the function should throw an error, and
no further promises should be resolved. The error message should
be "Error Thrown" (without quotes). The function should not return
anything.

Each promise uses a variable, promises[i] provided in the input. It
resolves and returns promises[i] if it is not equal to 0. If it is equal to
0, the function rejects and returns an error message "Error" (without
quotes).

For example, if order = [2,1,3], promises = [1,2,1], then the second
promise should be resolved first followed by the first and third
promises. Here, no promise is rejected. Promises are resolved as [2,1,1].

Function Description
Complete the function sequentialResolution in the editor below. The
function should resolve promises sequentially and should not
return anything. If any promise fails to resolve, the function should
throw an error, and no further promises should be resolved.
sequentialResolution has the following parameters:

promises[promises[0],...promises[n-1]]: an array of promises

order[order[0],...order[n-1]]: an array of indices

```js
const resolvedPromises = []

async function sequentialResolution(promises, order) {
  for (const index of order) {
    try {
      const result = await promises[index]
      if (result === 0) {
        throw new Error('Error')
      }
      resolvedPromises.push(result)
    } catch (error) {
      throw new Error('Error Thrown')
    }
  }
}
```
