const binaryTreeBFS = function (root) {
  if (root === null) return null;

  const res = [];

  // 初始化队列
  const queue = [];
  // 将第一个节点放入队列中, 根节点
  queue.push(root);

  while (queue.length) {
    let size = queue.length;
    const level = [];
    // 循环每层的结点
    while (size--) {
      // 每个节点拿出来进行操作
      let node = queue.shift();
      level.push(node);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    // 操作完成一层的结点
    res.push(level);
  }
  return res;
};
