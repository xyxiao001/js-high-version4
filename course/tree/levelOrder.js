const treeData = require('./treeData').treeData

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val
 *     this.left = this.right = null
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */


// BFS 广度优先遍历实现 - 关键：使用中间数组存储当前层所有节点值
var levelOrder = function (root) {
  const ret = []
  if (!root) {
    return ret
  }
  const q = []
  q.push(root)
  while (q.length !== 0) {
    const currentLevelSize = q.length
    ret.push([])
    for (let i = 1; i <= currentLevelSize; i++) {
      const node = q.shift()
      ret[ret.length - 1].push(node.val)
      if (node.left) q.push(node.left)
      if (node.right) q.push(node.right)
    }
  }

  return ret
}

console.log(
  `层序遍历: ${levelOrder(treeData)}`
)