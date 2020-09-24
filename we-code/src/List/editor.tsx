import React, { useRef, useEffect, useState } from "react";
import './editor.scss'
// 基本包
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'
// 代码高亮
import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'
// 代码 crtl+f 
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'

function Editor(props: any) {
  const editorRef = useRef(null)
  const [listener, setListener] = useState(false)
  const [monacoInstance, setMonacoInstance]: any = useState(null);

  useEffect(() => {
    if (editorRef && !monacoInstance) {
      console.log('开始初始化编辑器', editorRef, monacoInstance)
      const editorContainer = editorRef.current as unknown as HTMLElement
      // 设置初始化的默认参数
      setMonacoInstance(monaco.editor.create(editorContainer, {
        value: '',
        language: 'typescript'
      }))
    }
    return () => {
      //使用完成销毁实例
      if (monacoInstance) {
        console.log(`执行清除编辑器操作`)
        monacoInstance.dispose()
        setListener(false)
      }
    }
  }, [monacoInstance])

  useEffect(() => {
    if (monacoInstance) {
      // 绑定初始更新事件
      if (!listener) {
        monacoInstance.onDidChangeModelContent(() => {
          const newValue = monacoInstance.getValue()
          props.handleUpdateCode(newValue)
        })
        setListener(true)
      }
     
      if (props.value !== monacoInstance.getValue()) {
        monacoInstance.setValue(props.value)
      }
    }
  }, [listener, monacoInstance, props])

  return (
    <section className="we-code-editor">
      <section ref={editorRef} className="editor-content"></section>
    </section>
  )
}

export default Editor;
