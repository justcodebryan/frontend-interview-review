/*
 * @lc app=leetcode.cn id=1302 lang=javascript
 *
 * [1302] 层数最深叶子节点的和
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var deepestLeavesSum = function(root) {
  let maxDepth = 0;
  let sum = 0;
  function dfs(root, depth) {
    if (root === null) return;

    if (depth > maxDepth) {
      maxDepth = depth;
      sum = root.val;
    } else if (depth === maxDepth) {
      sum = sum + root.val;
    }
    dfs(root.left, depth + 1);
    dfs(root.right, depth + 1);
  }

  dfs(root, 0);

  return sum
};
// @lc code=end

