import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import Editor from './editor'
import './index.scss'
import { Button, message } from 'antd' 
import { createSandbox } from '../run'
import problem from '../problem'
import { InterfaceProblemAll, InterfaceProblem  } from '../interface'
import { isEqual } from 'lodash'
function List() {
  const [code, setCode] = useState('')

  const [current] = useState('climbStairs')

  const [currentProblem, setCurrentProblem]: [InterfaceProblem | null,  Dispatch<SetStateAction<any>>] = useState(null)

  // 编辑器内容更新函数
  const handleUpdateCode = (code: string) => {
    setCode(code)
  }

  // 点击执行测试用例
  const handleRun = () => {
    // console.log(`运行测试用例\n`, code)
    let runFunc = null
    try {
      runFunc = createSandbox(code, {}, current)
    } catch (error) {
      message.error('代码执行错误, 请检查代码')
    }
    if (runFunc && currentProblem) {
      // 这个函数就是拿到代码里面定义的那个函数
      console.log(currentProblem)
      runTest(runFunc, currentProblem)
    }
  }

  const runTest = (func: Function, problem: InterfaceProblem) => {
    problem.testCase.forEach(item => {
      const result = func(...item.params)
      const equal = result === item.result && isEqual(result, item.result)
      if (equal) {
        console.log(`当前用例测试通过, 用例参数${item.params}, 期望结果: ${item.result}, 运行结果${result}`)
      } else {
        console.log(`当前用例测试没有通过, 用例参数${item.params}, 期望结果: ${item.result}, 运行结果${result}`)
      }
    })
  }

  useEffect(() => {
    const key: keyof InterfaceProblemAll<string> = current
    const cur = problem[key]
    if (cur) {
      setCode(cur.templateDefault)
      setCurrentProblem(cur)
    }
    return () => {
      // cleanup
    }
  }, [current])

  return (
    <section className="we-code-list">
      <section className="control-list">
        <Button onClick={handleRun}>运行测试用例</Button>
      </section>
      <section className="editor-box">
        <Editor handleUpdateCode={handleUpdateCode} value={code}></Editor>
      </section>
    </section>
  );
}

export default List;
