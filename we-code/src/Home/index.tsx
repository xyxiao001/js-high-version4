import React from 'react';
import './index.scss'
import { observer } from "mobx-react"
import { timeDate } from '../mobx/common'

export interface Props{
}
export interface State{
  prizeList: prizeItem[];
}

export interface prizeItem {
  title: string,
  des: string
}
@observer
class Home extends React.Component<Props, State, {}> {
  constructor(props: Props) {
    super(props);
    this.state = {
      prizeList: [
        {
          title: '第一名',
          des: '获胜者得 200 左右的奖品'
        }
      ]
    };
  }
  
  render() {
    return (
      <section className="we-code-home">
        <section className="home-header">

          <section className="logo-container">
            <img src="http://hp.guahao-inc.com/_nuxt/img/7a19e60.png" className="logo" alt="logo"/>
            <section className="logo2-container">
              <img src="https://static.leetcode-cn.com/cn-mono-assets/production/main/assets/animation-square.5bc7b589.png" alt="logo2" className="logo2-1"/>
              <img src="https://static.leetcode-cn.com/cn-mono-assets/production/main/assets/animation-square.5bc7b589.png" alt="logo2" className="logo2-2" />
              <img src="https://static.leetcode-cn.com/cn-mono-assets/production/main/assets/animation-square.5bc7b589.png" alt="logo2" className="logo2-3" />
            </section>
            <section className="logo2-container logo3-container">
              <img src="https://static.leetcode-cn.com/cn-mono-assets/production/main/assets/animation-square.5bc7b589.png" alt="logo2" className="logo2-1"/>
              <img src="https://static.leetcode-cn.com/cn-mono-assets/production/main/assets/animation-square.5bc7b589.png" alt="logo2" className="logo2-2" />
              <img src="https://static.leetcode-cn.com/cn-mono-assets/production/main/assets/animation-square.5bc7b589.png" alt="logo2" className="logo2-3" />
            </section>

            <section className="home-title">
              <p className="title">
                <span>
                  <img src={process.env.PUBLIC_URL + '/bei.png'} alt=""/>
                </span>
                <span>医院支撑组编程大赛</span>
              </p>
                <p className="date">{ timeDate.startTime }</p>
            </section>
          </section>
        </section>

        <section className="home-content">
          <p className="begin-container">
            <span className="begin-time">距离比赛开始还剩</span>
            <span className="time">{ timeDate.beginTimeStr }</span>
          </p>

          <section className="content-box">

            <section className="box-header">
              <a href="http://confluence.guahao-inc.com/pages/viewpage.action?pageId=53830542" target="_blank" rel="noopener noreferrer">每周一题</a>
              <a href="http://box.hp.guahao-inc.com/typescript" target="_blank" rel="noopener noreferrer">练一练手</a>
            </section>

            <section className="prize-list">
               <p className="tips-line">
                 <i className="box-icon"></i>
                 <span>奖品设置</span>
                 <i className="box-icon"></i>
               </p>
               {
                 this.state.prizeList.map(item => (
                   <p className="prize-item" key={item.title}>
                     <span>
                      { item.title }
                     </span>
                     <span>
                      { item.des }
                     </span>
                   </p>
                 ))
               }
            </section>

            <section className="rule-list">
                <p className="tips-line">
                 <i className="box-icon"></i>
                 <span>比赛规则</span>
                 <i className="box-icon"></i>
               </p>
               <p className="rule-item">
                 1. 算法比赛共计 5 题，比赛时长 120 分钟。
               </p>
               <p className="rule-item">
                 2. 题目依据难易度有不同分值，得分越高排名越高；在得分相同的情况下，答题用时越少则排名越高。
               </p>
               <p className="rule-item">
                 3. 比赛中每提交一次错误解答，解答用时将增加 5 分钟，请谨慎提交解答，避免过多错误提交导致完赛用时过长。
               </p>
               <p className="rule-item">
                 4. 为了防止作弊行为，在提交错误解答后，会告知该错误的类型，不会告知具体的错误用例
               </p>
               <p className="rule-item">
                 5. 题目分值为(困难: 50分， 中等： 25分,  简单： 15 分)，一共为困难1 题， 中等 2 题，简单 2 题。
               </p>
            </section>

          </section>
        </section>

      </section>
    )
  }
}

export default Home;
