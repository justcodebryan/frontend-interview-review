const binaryTreeBFS = function (root) {
  if (root === null) return null;

  const res = [];

  const queue = [];
  queue.push(root);

  while (queue.length) {
    let size = queue.length;
    const level = [];
    while (size--) {
      let node = queue.shift();
      level.push(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(level);
  }
  return res;
};
