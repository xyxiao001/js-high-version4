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
  const stack = []
  stack.push(root)
  while (stack.length !== 0) {
    const currentLevelSize = stack.length
    for (let i = 1; i <= currentLevelSize; i++) {
      // 变量 i 无实际意义，只是为了循环 n 次
      // 将当前层的所有结点出队列，再将下一层的所有结点入队列
      const node = stack.shift()
      ret.push(node.val)
      if (node.left) stack.push(node.left)
      if (node.right) stack.push(node.right)
    }
  }

  return ret
}

console.log(`层序遍历结果 A,B,C,D,F,G,I,E,H`)

console.log(
  `层序广度优先遍历 ${levelOrder(treeData)}`
)