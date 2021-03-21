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
};

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
};

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
    // 判断什么时候出现结果
    if (path.length === nums.length) {
      res.push([...path]);
    }

    // 遍历数组，开始进行回溯
    // 输入 [1, 2, 3]
    for (let i = 0; i < nums.length; i++) {
      if (used[nums[i]]) continue;
      // 进入递归，先设置已用过的元素，将map里面的状态置为true
      path.push(nums[i]);
      used[nums[i]] = true;

      // 递归，深度优先遍历
      dfs(path);

      // 退出递归，下次map要重新使用，所以需要将之前用过的元素弹出，将map里面的状态置为false
      path.pop();
      used[nums[i]] = false;
    }
  }

  dfs([]);
  return res;
};

const nums = [1, 2, 3];
console.log('------backtrackingAllSubSet------');
console.log(backtrackingAllSubSet(nums));

console.log('------backtrackingAllArr_1------');
console.log(backtrackingAllArr_1(nums));

console.log('------backtrackingAllArr_2------');
console.log(backtrackingAllArr_2(nums));