import React, { useState, useEffect } from "react";
import Editor from './editor'
import './index.scss'
import { Button } from 'antd' 

function List() {
  const [code, setCode] = useState('');

  // 编辑器内容更新函数
  const handleUpdateCode = (code: string) => {
    setCode(code)
  }

  // 点击执行测试用例
  const handleRun = () => {
    console.log(`运行测试用例`, code)
  }

  useEffect(() => {
    return () => {
      // cleanup
    }
  }, [code])

  return (
    <section className="we-code-list">
      <section className="control-list">
        <Button onClick={handleRun}>运行测试用例</Button>
      </section>
      <section className="editor-box">
        <Editor handleUpdateCode={handleUpdateCode}></Editor>
      </section>
    </section>
  );
}

export default List;
