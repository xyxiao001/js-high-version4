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
var postorderTraversal1 = function(root) {
    // 后续遍历 左右跟
    if (!root) return []
    const arr = []
    const findVal = (tree) => {
      tree.left && findVal(tree.left)
      tree.right && findVal(tree.right)
      arr.push(tree.val)
    }
    findVal(root)
    return arr
};


//迭代
/**
 * 
 * 每次先入左节点, 然后入右节点
   每次把值都插到数组的最前面
 */
const postorderTraversal2 = root => {
  let res = [], stack = []
  while (root || stack.length) {
    res.unshift(root.val)
    if (root.left) stack.push(root.left)
    if (root.right) stack.push(root.right)
    root = stack.pop()
  }
  return res
}