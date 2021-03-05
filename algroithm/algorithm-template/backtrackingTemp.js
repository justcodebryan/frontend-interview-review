const backtrackingAllSubSet = function (nums) {
  const res = [];

  function dfs(path, start) {
    res.push([...path]);

    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      dfs(path, i + 1);
      path.pop();
    }
  }

  dfs([], 0);
  return res;
}

const backtrackingAllArr_1 = function (nums) {
  const res = [];

  function dfs(path) {
    if (path.length === nums.length) {
      res.push([...path]);
    }

    for (let i = 0; i < nums.length; i++) {
      // 搜索是否已经用过该数字, 会增加时间复杂度
      if (path.indexOf(nums[i]) !== -1) continue;
      path.push(nums[i]);
      dfs(path);
      path.pop();
    }
  }
  
  dfs([]);
  return res;
}

/**
 * 
 * 回溯带map
 * 
 * @param {*} nums 
 * @returns 
 */
const backtrackingAllArr_2 = function (nums) {
  const res = [];
  const used = {};

  function dfs(path) {
    if (path.length === nums.length) {
      res.push([...path]);
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[nums[i]]) continue;
      path.push(nums[i]);
      used[nums[i]] = true;
      dfs(path);
      path.pop();
      used[nums[i]] = false;
    }
  }
  
  dfs([]);
  return res;
}

const nums = [1, 2, 3];
console.log('------backtrackingAllSubSet------');
console.log(backtrackingAllSubSet(nums));

console.log('------backtrackingAllArr_1------');
console.log(backtrackingAllArr_1(nums));

console.log('------backtrackingAllArr_2------');
console.log(backtrackingAllArr_2(nums));