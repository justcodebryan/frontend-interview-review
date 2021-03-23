/*
 * @lc app=leetcode.cn id=59 lang=javascript
 *
 * [59] 螺旋矩阵 II
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
  const maxNum = n * n;
  let curNum = 1;
  const res = new Array(n).fill(0).map(() => new Array(n).fill(0));
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let directionIndex = 0;
  let row = 0, column = 0;
  while (curNum <= maxNum) {
    res[row][column] = curNum;
    curNum++;
    const nextRow = row + directions[directionIndex][0];
    const nextColumn = column + directions[directionIndex][1];
    if (nextRow < 0 || nextRow >= n || nextColumn < 0 || nextColumn >=n || res[nextRow][nextColumn] !== 0) {
      directionIndex = (directionIndex + 1) % 4;
    }
    row = row + directions[directionIndex][0];
    column = column + directions[directionIndex][1];
  }

  return res;
};
// @lc code=end

