import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import common from './mobx/common'

// 获取本地保存数据
let info: any = localStorage.getItem('RUN_USER')
if (info) {
  info = JSON.parse(info)
  if (info.userName) {
    if (info.cacheCode) {
      const map = new Map()
      for (let i in info.cacheCode) {
        map.set(i, info.cacheCode[i])
      }
      info.cacheCode = map
    }
    common.updateAll(info)
  }
}


ReactDOM.render(
  <App />,
  // <React.StrictMode>
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
