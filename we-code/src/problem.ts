// 问题和测试用例的文件
import { InterfaceProblemAll, InterfaceProblem  } from './interface'
const problem: InterfaceProblemAll<InterfaceProblem> = {
  climbStairs: {
    name: 'climbStairs',
    templateDefault: `
    /* 第一题: 爬楼梯 */
    var climbStairs = function(n) {
      const dp = [1, 2]
      let i = 2
      while (i <= n) {
        dp[i] = dp[i - 1] + dp[i -2]
        i++
      }
      return dp[n - 1]
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
       }
    ]
  }
}

export default problem