const binaryTreeBFS = function (root) {
  const res = [];

  if (root === null) return res;

  const res = [];
  const queue = [];
  queue.push(root);
  while (queue.length) {
    let size = queue.length;
    const level = [];
    while (size--) {
      let node = queue.pop();
      level.push(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(level);
  }
  return res;
}
