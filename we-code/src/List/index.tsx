import React, { useState, useEffect, SetStateAction, Dispatch, useCallback } from "react";
import Editor from './editor'
import Log from './log'
import './index.scss'
import { Button, message } from 'antd' 
import problem from '../problem'
import { InterfaceProblemAll, InterfaceProblem, InterfaceWorkerMessage  } from '../interface'
import runWorker from './run.worker'

let set: any = ''


function List() {
  const [code, setCode] = useState('')

  const [current, setCurrent] = useState('climbStairs')

  const [worker, setWorker]: any = useState(null)

  const [messageList, setMessageList]: [InterfaceWorkerMessage[], Dispatch<SetStateAction<InterfaceWorkerMessage[]>>] = useState([
    {
      message: '',
      type: ''
    }
  ])

  const [isRunning, setIsRunning] = useState(false)

  const problemList = []

  for (let i in problem) {
    if (i) {
      problemList.push(problem[i])
    }
  }


  let runTime = 0

  // 程序最大执行时间
  const maxTime = 5000

  // 编辑器内容更新函数
  const handleUpdateCode = (code: string) => {
    setCode(code)
  }

  // 点击执行测试用例
  const handleRun = () => {
    if (worker) {
      setMessageList([])
      worker.postMessage({
        code,
        name: current
      })
      setIsRunning(true)
      runTime = 0
      clearInterval(set)
      // 表示当前开始了
      set = setInterval(() => {
        if (runTime > maxTime) {
          // 表示超时了
          message.error('代码执行超时')
          setIsRunning(false)
          worker.terminate()
          setWorker(null)
          clearInterval(set)
        }
        runTime += 100
      }, 100)
    } else {
      const newWorker = new runWorker()
      setWorker(newWorker)
      handleRun()
    }
  }

  const receive = useCallback((event: any) => {
    const data = event.data
    // console.log('收到 worker 发送的消息了', event.data)
    setMessageList(messageList => {
      return [...messageList, data]
    })
    if (data.type === 'start') {
    }

    if (data.type === 'running') {
      // 表示当前开始了新的测试用例
    }

    if (data.type === 'ending') {
      message.success(data.message)
      clearInterval(set)
      setIsRunning(false)

    }
    if (data.type === 'error') {
      message.error(data.message)
      clearInterval(set)
      setIsRunning(false)
    }
  }, [])

  const handleProblemClick = (name: string) => {
    if (isRunning) {
      message.warning('代码还在执行中，请等待执行完成后切换!!')
      return
    }
    resetEditor()
    setCurrent(name)
  }

  const resetEditor = () => {
    setIsRunning(false)
    setMessageList([])
    runTime = 0
    clearInterval(set)
  }

  useEffect(() => {
    return () => {
      if (worker) {
        console.log('组件卸载,停掉 worker')
        worker.terminate()
        setWorker(null)
        clearInterval(set)
      }
    }
  }, [worker])

  useEffect(() => {
    const key: keyof InterfaceProblemAll<string> = current
    const cur = problem[key]
    if (cur) {
      setCode(cur.templateDefault)
    }
    return () => {
      // cleanup
    }
  }, [current])

  useEffect(() => {
    if (!worker) {
      const newWorker = new runWorker()
      setWorker(newWorker)
    }
    if (worker) {
      worker.addEventListener('message', receive)
    }
    return () => {
      if (worker) {
        worker.removeEventListener('message', receive)
      }
    }
  }, [messageList, receive, worker])

  return (
    <section className="we-code-list">
      <section className="problem-list">
        {
          problemList.map((item: InterfaceProblem) => (
            <section className="problem-item" key={item.name} onClick={() => handleProblemClick(item.name)}>
              <p className="title">{ item.name }</p>
              <p>{ item.des }</p>
            </section>
          ))
        }
      </section>
      <section className="control-list">
        <Button onClick={handleRun} loading={isRunning}>运行测试用例</Button>
        <Button>恢复初始代码</Button>
      </section>
      <section className="editor-box">
        <Editor handleUpdateCode={handleUpdateCode} value={code}></Editor>
        <Log list={messageList} running={isRunning}></Log>
      </section>
    </section>
  );
}

export default List;
