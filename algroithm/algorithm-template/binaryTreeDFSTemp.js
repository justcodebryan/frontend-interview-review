// Preorder traversal 后序遍历
const preorderTraversal = function (root) {
  if (root === null) return null;

  console.log(root.val);  // Do Something
  preorderTraversal(root.left);
  preorderTraversal(root.right);
};

// Inorder traverse 中序遍历
const inorderTraversal = function (root) {
  if (root === null) return null;

  inorderTraversal(root.left);
  console.log(root.val);  // Do Something
  inorderTraversal(root.right);
};

// Postorder traversal 后序遍历
const postorderTraversal = function (root) {
  if (root === null) return null;

  preorderTraversal(root.left);
  preorderTraversal(root.right);
  console.log(root.val);  // Do Something
};