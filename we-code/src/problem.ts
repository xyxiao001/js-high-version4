// 问题和测试用例的文件
import { InterfaceProblemAll, InterfaceProblem  } from './interface'
const problem: InterfaceProblemAll<InterfaceProblem> = {
  climbStairs: {
    name: 'climbStairs',
    templateDefault: `
    /* 第一题: 爬楼梯 
    * 有个小孩正在上楼梯，楼梯有n阶台阶，小孩一次可以上1阶或者2阶。
    * 实现一种方法，计算小孩有多少种上楼梯的方式。
    * 只考虑 100 层以下。
    
      示例1:
      输入：n = 3
      输出：3
    */
    var climbStairs = function(n) {
    };
    `,
    testCase: [
      {
       params: [1],
       result: 1
      },
      {
        params: [5],
        result: 8
      },
      {
        params: [15],
        result: 987
      },
      {
        params: [50],
        result: 20365011074
      },
      {
        params: [100],
        result: 573147844013817200000
      }
    ],
    des: `
      第一题: 爬楼梯,
      有个小孩正在上楼梯，楼梯有n阶台阶，小孩一次可以上1阶或者2阶。
      实现一种方法，计算小孩有多少种上楼梯的方式。
      只考虑 100 层以下。
    `,
    difficulty: 'easy',
    answer: `
    var climbStairs = function(n) {
      const dp = [1, 2]
      let i = 2
      while (i <= n) {
        dp[i] = dp[i - 1] + dp[i -2]
        i++
      }
      return dp[n - 1]
    };
    `
  },
  isSubsequence: {
    name: 'isSubsequence',
    templateDefault: `
      /**
       * 给定字符串 s 和 t ，判断 s 是否为 t 的子序列。

       你可以认为 s 和 t 中仅包含英文小写字母。字符串 t 可能会很长（长度 ~= 500,000），而 s 是个短字符串（长度 <=100）。
       
       字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。
       
       示例 1:
       s = "abc", t = "ahbgdc"
       
       返回 true.
       
       示例 2:
       s = "axc", t = "ahbgdc"
       
       返回 false.
       * @param {string} s
       * @param {string} t
       * @return {boolean}
       */
      var isSubsequence = function(s, t) {
      };
    `,
    testCase: [
      {
        params: ['abc', 'ahbgdc'],
        result: true
      },
      {
        params: ['axc', 'ahbgdc'],
        result: false
      },
      {
        params: ['dcahbgdc', 'ahbgdcahbgdcahbgdcahbgdcahbgdcahbgdcahbgdcahbgdcafdjdfjadfadfafjafjajfjaafafgargwhsbwvsbmbmfdjafighaighaighaifhahavaf'],
        result: true
      },
      {
        params: ['dcahbgdcxbv', 'ahbgdcahbgdcahbgdcahbgdcahbgdcahbgdcahbgdcahbgdcafdjdfjadfadfafjafjajfjaafafgargwhsbwvsbmbmfdjafighaighaighaifhahavaf'],
        result: false
      },
      {
        params: ['abv', 'accabv'],
        result: true
      },
    ],
    des: `
    第二题: 判断子序列, 
    给定字符串 s 和 t ，判断 s 是否为 t 的子序列。
    你可以认为 s 和 t 中仅包含英文小写字母。字符串 t 可能会很长（长度 ~= 500,000），而 s 是个短字符串（长度 <=100）。
    字符串的一个子序列是原始字符串删除一些（也可以不删除）字符而不改变剩余字符相对位置形成的新字符串。（例如，"ace"是"abcde"的一个子序列，而"aec"不是）。`,
    difficulty: 'easy',
    answer: `
      var isSubsequence = function(s, t) {
          // 双指针 贪心算法
          let i = 0
          let j = 0
          while (i < s.length && j < t.length) {
              if (s[i] === t[j]) {
                  i++
              }
              j++
          }
          return i === s.length
      };
    `
  },
  canReach: {
    name: 'canReach',
    templateDefault: `
      /**
        第三题 我能跳到嘛,
        这里有一个非负整数数组 arr，你最开始位于该数组的起始下标 start 处。当你位于下标 i 处时，你可以跳到 i + arr[i] 或者 i - arr[i]。
        请你判断自己是否能够跳到对应元素值为 0 的 任一 下标处。
        注意，不管是什么情况下，你都无法跳到数组之外。

        输入：arr = [4,2,3,0,3,1,2], start = 5
        输出：true
        解释：
        到达值为 0 的下标 3 有以下可能方案： 
        下标 5 -> 下标 4 -> 下标 1 -> 下标 3 
        下标 5 -> 下标 6 -> 下标 4 -> 下标 1 -> 下标 3 

        输入：arr = [3,0,2,1,2], start = 2
        输出：false
        解释：无法到达值为 0 的下标 1 处。 


       * @param {number[]} arr
       * @param {number} start
       * @return {boolean}
       */
        const canReach = (arr, start) => {
        };
    `,
    testCase: [
      {
        params: [[4,2,3,0,3,1,2], 5],
        result: true
      },
      {
        params: [[4,2,3,0,3,1,2], 0],
        result: true
      },
      {
        params: [[3,0,2,1,2], 2],
        result: false
      },
      {
        params: [[4,2,3,0,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,6,7,8,1,0,1,245,111,3,1,2,1], 4],
        result: true
      },
      {
        params: [[4,2,3,0,3,1,2,3,1,2,3,1,2,3,1,2,3,1,2,6,7,8,1,0,1,245,111,3,1,2,1], 100],
        result: false
      }
    ],
    des: `
      第三题 我能跳到嘛,
      这里有一个非负整数数组 arr，你最开始位于该数组的起始下标 start 处。当你位于下标 i 处时，你可以跳到 i + arr[i] 或者 i - arr[i]。
      请你判断自己是否能够跳到对应元素值为 0 的 任一 下标处。
      注意，不管是什么情况下，你都无法跳到数组之外。`,
    difficulty: 'medium',
    answer: `
    const canReach = (arr, start) => {
      const visited = new Set();
      const queue = [start];
      for (let len = 0, max = arr.length; len < queue.length; ++len) {
        const idx = queue[len];
        if (visited.has(idx)) continue;
        if (arr[idx] === 0) return true;
        visited.add(idx);
        idx + arr[idx] < max && queue.push(idx + arr[idx]);
        idx - arr[idx] >= 0 && queue.push(idx - arr[idx]);
      }
      return false;
    };
    `
  },
  aaa: {
    name: '',
    templateDefault: ``,
    testCase: [],
    des: ``,
    difficulty: 'medium'
  }
}

export default problem