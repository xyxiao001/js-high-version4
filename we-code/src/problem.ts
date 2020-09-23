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
       * 第二题: 判断子序列, 
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
  numberOf2sInRange: {
    name: 'numberOf2sInRange',
    templateDefault: `
      /**
       * 第四题  看看 2 出现的个数
       * @param {number} n
       * @return {number}
        编写一个方法，计算从 0 到 n (含 n) 中数字 2 出现的次数。

        示例:

        输入: 25
        输出: 9
        解释: (2, 12, 20, 21, 22, 23, 24, 25)(注意 22 应该算作两次)
        提示：
        n <= 10^9
      */
        var numberOf2sInRange = function(n) {

        };
    `,
    testCase: [
      {
        params: [2],
        result: 1
      },
      {
        params: [26],
        result: 10
      },
      {
        params: [100],
        result: 20
      },
      {
        params: [8000],
        result: 3400
      },
      {
        params: [9999999],
        result: 7000000
      }
    ],
    des: `第四题: 看看 2 出现的个数,  编写一个方法，计算从 0 到 n (含 n) 中数字 2 出现的次数。`,
    difficulty: 'medium',
    answer: `
      var numberOf2sInRange = function(n) {
        // 9   1   1 * 10 ** (1-1)
        // 99  20   2 * 10 ** (2-1)
        // 999 300  3 * 10 ** (3-1)
        /// 9999 4000   4 * 10 ** (4-1)
        //// 99999 50000  5* 10 ** (5-1)
        let total = 0;
        if (n < 10) {
            for (let i = 0; i <= n; i++) {
                if (i === 2) {
                    total++
                }
            }
            return total;
        }
        const nStr = n.toString(10);
        const lenN = nStr.length;
        for (let i = 0; i < nStr.length; i++) {
            const each = parseInt(nStr[i], 10);
            const k = (lenN - i - 1);
            const eachFul = 10 ** (k - 1) * k;
    
            if (each > 2) {
                total += each * eachFul;
                total += 10 ** k;
            } else if (each === 2) {
                total += parseInt(nStr.substr(i + 1), 10) || 0;
                total += each* eachFul + 1;
            } else {
                total += each * eachFul;
            }
        }
    
        return total;
      };
    `
  },
  maxNumber : {
    name: 'maxNumber',
    templateDefault: `
      /**
       * 给定长度分别为 m 和 n 的两个数组，其元素由 0-9 构成，表示两个自然数各位上的数字。
       * 现在从这两个数组中选出 k (k <= m + n) 个数字拼接成一个新的数，要求从同一个数组中取出的数字保持其在原数组中的相对顺序。
       求满足该条件的最大数。结果返回一个表示该最大数的长度为 k 的数组。
       说明: 请尽可能地优化你算法的时间和空间复杂度。
       示例 1:
       输入:
       nums1 = [3, 4, 6, 5]
       nums2 = [9, 1, 2, 5, 8, 3]
       k = 5
       输出:
       [9, 8, 6, 5, 3]
       示例 2:
       
       输入:
       nums1 = [6, 7]
       nums2 = [6, 0, 4]
       k = 5
       输出:
       [6, 7, 6, 0, 4]
       示例 3:
       
       输入:
       nums1 = [3, 9]
       nums2 = [8, 9]
       k = 3
       输出:
       [9, 8, 9]
       * @param {number[]} nums1
       * @param {number[]} nums2
       * @param {number} k
       * @return {number[]}
       */
      var maxNumber = function(nums1, nums2, k) {
      };
    `,
    testCase: [
      {
        params: [[3, 4, 6, 5], [9, 1, 2, 5, 8, 3], 5],
        result: [9, 8, 6, 5, 3]
      },
      {
        params: [[6, 7], [6, 0, 4], 5],
        result: [6, 7, 6, 0, 4]
      },
      {
        params: [[3, 9], [8, 9], 3],
        result: [9, 8, 9]
      },
    ],
    des: `
      第五题:  最大的数字
      给定长度分别为 m 和 n 的两个数组，其元素由 0-9 构成，表示两个自然数各位上的数字。现在从这两个数组中选出 k (k <= m + n) 个数字拼接成一个新的数，要求从同一个数组中取出的数字保持其在原数组中的相对顺序。
      求满足该条件的最大数。结果返回一个表示该最大数的长度为 k 的数组。
      说明: 请尽可能地优化你算法的时间和空间复杂度。
    `,
    difficulty: 'hard',
    answer: `
      /**
       * @param {number[]} nums1
       * @param {number[]} nums2
       * @param {number} k
       * @return {number[]}
       */
      var maxNumber = function(nums1, nums2, k) {
        var result = [];
    
        // 初始化找出两个数组内从1到k的最大序列组合，缓存下来供后续组合使用
        var map1 = findMaxK(nums1, k);
        var map2 = findMaxK(nums2, k);
    
        // 合并两个数组，找出最大序列。两个数组的组合方式有多种，表示各有i和k-i个数
        var maxNum = 0;
        for (var i=0; i<=k; i++) {
            if (i <= nums1.length && k-i <= nums2.length) {
                var merge = mergeMax(map1[i], map2[k-i]);
                if (merge) {
                    var num = merge.join('');
                    if (num > maxNum) {
                        maxNum = num;
                        result = merge;
                    }
                }
            }
        }
    
        // 将两个已知数组合并，通过比较字典序入栈的方式找出最大序列
        function mergeMax(a, b) {
            if (!a || !b) return a || b;
            var stack = [];
            while (a.length > 0 || b.length > 0) {
                if (a.length === 0) {
                    stack.push(b.shift());
                } else if (b.length === 0) {
                    stack.push(a.shift());
                } else {
                    // 比较数组的字典序，大的先出
                    if (b.join('') > a.join('')) {
                        stack.push(b.shift());
                    } else {
                        stack.push(a.shift());
                    }
                }
            }
            return stack;
        }
        
        // 找出一个数组的最大k位以内序列，包含从1到k个map项
        function findMaxK(nums, k) {
            var len = nums.length;
            var map = {};
            if (len > 0) {
                for (var i=1; i<=k; i++) {
                    var stack = [nums[0]];
                    for (var j=1; j<len; j++) {
                        while (nums[j] > stack[stack.length-1] && len - j > i - stack.length) {
                            stack.pop();
                        }
                        if (stack.length < i) stack.push(nums[j]);
                    }
                    map[i] = stack;
                }
            }
            return map;
        }
        
        return result;
    };
    `
  }
}

export default problem