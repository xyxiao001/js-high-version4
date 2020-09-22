import React from "react"
import './log.scss'
import { InterfaceWorkerMessage } from "../interface"
import {
  SyncOutlined,
} from '@ant-design/icons';

function Log(props: {
  list: InterfaceWorkerMessage[],
  running: boolean
}) {
  return (
    <section className="we-code-log">
      <p className="title">控制台: </p>
      <section className="log-list">
        {
          props.list.map((item: any, index: number) => (
            <p key={index} className="log-message">{ item.message}</p>
          ))
        }
      </section>
      {
        props.running ? <p className="loading">
        <span>努力执行代码中哦... <SyncOutlined spin /></span>
       </p> : ''
      }
    </section>
  )
}

export default Log