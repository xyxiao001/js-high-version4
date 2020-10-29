/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
// 栈S;
// p= root;
// while(p || S不空){
//     while(p){
//         p入S;
//         p = p的左子树;
//     }
//     p = S.top 出栈;
//     访问p;
//     p = p的右子树;
// }

// 递归
var inorderTraversa1 = function (root) {
  const res = [];
  const inorder = (root) => {
    if (!root) {
      return;
    }
    inorder(root.left);
    res.push(root.val);
    inorder(root.right);
  }
  inorder(root);
  return res;
};

// 迭代方式
var inorderTraversal2 = function (root) {
  // 中序遍历，左 跟 右
  const stack = []
  const res = []
  while (root || stack.length > 0) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack[stack.length - 1]
    stack.pop()
    res.push(root.val)
    root = root.right
  }
  return res
};