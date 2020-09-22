import problem from '../problem'
import { createSandbox } from '../run'
import { isEqual } from 'lodash'
import { InterfaceProblem  } from '../interface'

// 定义 worker 消息通知类型
// type: error 错误消息提示 start: 表示开始跑测试用例,  running: 表示其他测试用例消息,   ending: 表示结束测试用例 ，成功 

// eslint-disable-next-line no-restricted-globals
const ctx: Worker = self as any
// Respond to message from parent thread
ctx.addEventListener('message', (event: any) => {
  // console.log('我是 worker 我收到消息了~ 准备开始😁')
  const data = event.data
  const time = performance.now()
  let runFunc = null
  try {
    runFunc = createSandbox(data.code, {}, data.name)
    const current = problem[data.name]
    if (current && runFunc) {
      runTest(runFunc, current, time)
    } else {
      ctx.postMessage({
        type: 'error',
        message: '代码执行错误, 未匹配到题目'
      })
      return
    }
  } catch (error) {
    ctx.postMessage({
      type: 'error',
      message: `代码执行错误, 请检查代码, \n ${error}`
    })
    return
  }
})

const runTest = (func: Function, cur: InterfaceProblem, time: number) => {
  ctx.postMessage({
    type: 'start',
    message: '开始执行测试用例🛩🛩🛩🛩🛩'
  })
  let i = 0
  while (i < cur.testCase.length) {
    const curCase = cur.testCase[i]
    const running = func(...curCase.params)
    const res = isEqual(running, curCase.result)
    if (res) {
      ctx.postMessage({
        type: 'running',
        message: `第${i + 1}个测试用例执行成功, 入参${JSON.stringify(curCase.params)}, 期望结果${curCase.result}, 实际运行结果${running}`
      })
    } else {
      ctx.postMessage({
        type: 'error',
        message: `第${i + 1}个测试用例执行失败, 入参${JSON.stringify(curCase.params)}, 期望结果${curCase.result}, 实际运行结果${running}`
      })
      break;
    }
    i++
  }
  if (i === cur.testCase.length) {
    ctx.postMessage({
      type: 'ending',
      message: `恭喜💐通过全部测试用例, 耗时${(performance.now() - time).toFixed(2)}ms`
    })
  }
}

export default {} as typeof Worker & (new () => Worker);