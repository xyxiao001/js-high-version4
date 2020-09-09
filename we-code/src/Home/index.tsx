import React from 'react';
import './index.scss'

function Home() {
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
                <img src="bei.png" alt=""/>
              </span>
              <span>医院支撑组编程大赛</span>
            </p>
            <p className="date">9 月 17 日</p>
          </section>
        </section>
      </section>
    </section>
  );
}

export default Home;
