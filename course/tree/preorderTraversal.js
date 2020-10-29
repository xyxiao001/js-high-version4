// import { treeData } from './treeData'
const treeData = require('./treeData').treeData

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
 * @return {number[]}
 */

//  递归
const preorderTraversal1 = (root) => {
  const res = [];
  const preOrder = (root) => {
    if (root == null) return;
    res.push(root.val);
    preOrder(root.left);
    preOrder(root.right);
  };
  preOrder(root);
  return res;
}


// 迭代的方式
var preorderTraversal2 = function (root) {
  if (!root) {
    return []
  }
  const result = []
  let node = root
  const stack = []
  while (stack.length || node) {
    while (node) {
      result.push(node.val)
      stack.push(node)
      node = node.left
    }
    node = stack.pop()
    node = node.right

  }
  return result
};

console.log(
  `前序遍历期望结果为：ABDFECGHI`
)

console.log(
  `递归 ${preorderTraversal1(treeData)}`
)

console.log(
  `迭代 ${preorderTraversal2(treeData)}`
)