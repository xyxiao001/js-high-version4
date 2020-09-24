import React, { useState, useEffect, SetStateAction, Dispatch, useCallback } from "react";
import Editor from './editor'
import Log from './log'
import './index.scss'
import { Button, message, Tag, Popconfirm } from 'antd' 
import problem from '../problem'
import { InterfaceProblemAll, InterfaceProblem, InterfaceWorkerMessage  } from '../interface'
import runWorker from './run.worker'
import { observer } from "mobx-react"
import common from '../mobx/common'
import NameModal from './NameModal'
import moment from "moment";
let set: any = ''

const List = observer(() => {
  const [code, setCode] = useState('')

  const [currentProblem, setCurrentProblem]: [any, Dispatch<SetStateAction<any>>] = useState(null)

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

  const [NameModalVisible, setNameModalVisible] = useState(false)

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

  // 重置代码
  const handleResetCode = () => {
    if (currentProblem) {
      setCode(currentProblem.templateDefault)
    }
  }

  const handleShowAnswer = () => {
    if (currentProblem) { 
      setCode(currentProblem.answer || currentProblem.templateDefault)
    }
  }

  const checkedUser = ():boolean => {
    if (common.userInfo.userName === '') {
      message.warning('请填写姓名开始答题')
      setNameModalVisible(true)
      return false
    }
    return true
  }

  // 点击执行测试用例
  const handleRun = () => {
    if (!checkedUser()) {
      return
    }

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
          common.updateSubmit({
            type: 'fail',
            problem: currentProblem,
            time: new Date()
          })
          setIsRunning(false)
          worker.terminate()
          clearInterval(set)
          setWorker(null)
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
      common.updateSubmit({
        type: 'success',
        problem: currentProblem,
        time: new Date()
      })
    }
    if (data.type === 'error') {
      message.error(data.message)
      clearInterval(set)
      setIsRunning(false)
      common.updateSubmit({
        type: 'fail',
        problem: currentProblem,
        time: new Date()
      })
    }
  }, [currentProblem])

  const handleProblemClick = (name: string) => {
    if (isRunning) {
      message.warning('代码还在执行中，请等待执行完成后切换!!')
      return
    }
    if (!checkedUser()) {
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

  const getTagColor = (str: string): string => {
    let key = 'green'
    if (str === 'hard') {
      key = 'red'
    }
    if (str === 'medium') {
      key = 'blue'
    }
    return key
  }

  // 姓名弹框确认
  const handleNameModal = (name: string) => {
    if (name.trim() === '') {
      message.warning('请填写姓名开始答题')
      return
    }
    setNameModalVisible(false)
    common.updateUserInfo({
      userName: name,
      userBeginTime: new Date()
    })
    runBegin()
  }

  // 开始答题
  const runBegin =  () => {
    console.log(common.userInfo.userName)
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
      let editorCode = cur.templateDefault
      // 查询缓存的代码
      const map = common.userInfo.cacheCode
      if (map.get(current)) {
        editorCode = map.get(current)
      }
      setCode(editorCode)
      setCurrentProblem(cur)
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
 
  useEffect(() => {
    if (!checkedUser()) {
      return
    }
    return () => {
    }
  }, [])

  useEffect(() => {
    common.updateCode({
      name: current,
      code: code
    })
  }, [code, current])

  return (
    <section className="we-code-list">
      <section className="problem-list">
        {/* 单独的用来展示答题进度的 */}
        {
          common.userInfo.userName ? (
            <section className="problem-item show-user">
              <p>
                <span>答题人: </span>
                <span>{ common.userInfo.userName }</span>
              </p>
              <p>
                <span>答题开始时间: </span>
                <span>{ moment(common.userInfo.userBeginTime).format('YYYY-MM-DD HH:mm:ss') }</span>
              </p>
              <p>
                <span>答题总共耗时: </span>
                <span>{ common.userInfo.allTime }</span>
              </p>
              <p>
                <span>答题状态: </span>
                <span>{ common.userInfo.isFinish ? '已完成' : '进行中' }</span>
              </p>
              <p></p>
              <p>
                <span>当前得分: </span>
                <span>{ common.userInfo.source }分</span>
              </p>

              {/* <section>
                <p>提交日志</p>
                {
                  common.userInfo.submitList?.map((item: any) => (
                    <p key={item.time}>
                      { item.log }
                    </p>
                  ))
                }
              </section> */}

            </section>
          ) : ''
        }
        {
          problemList.map((item: InterfaceProblem) => (
            <section className="problem-item" key={item.name} onClick={() => handleProblemClick(item.name)}>
              <p className="title">
                <span className={item.name === current ? 'current' : ''}>{ item.name }</span>
                <Tag color={getTagColor(item.difficulty)}>{ item.difficulty }</Tag>
                {
                  common.userInfo.finishList.includes(item.name) ? <Tag color="green">已经通过测试</Tag> : ''
                }
              </p>
              <p>{ item.des }</p>
            </section>
          ))
        }
      </section>
      <section className="control-list">
        <Button onClick={handleRun} loading={isRunning}>运行测试用例</Button>
        {
          window.isShowAnswer ?
          <Popconfirm
          title="确定查看答案"
          onConfirm={handleShowAnswer}
          okText="确定"
          cancelText="取消"
        >
          <Button>显示答案</Button>
        </Popconfirm> : ''
        }
        <Popconfirm
          title="是否需要恢复初始代码"
          onConfirm={handleResetCode}
          okText="确定"
          cancelText="取消"
        >
          <Button>恢复初始代码</Button>
        </Popconfirm>
      </section>
      <section className="editor-box">
        <Editor handleUpdateCode={handleUpdateCode} value={code}></Editor>
        <Log list={messageList} running={isRunning}></Log>
      </section>
      <section className="dialog">
        <NameModal visible={NameModalVisible} confirm={handleNameModal} />
      </section>
    </section>
  );
})

export default List;
