import { observable, action } from 'mobx';
import moment from 'moment'
import { twoNumber } from '../tools'
import { InterfaceProblem } from '../interface';


class Common {
  @observable
  timeDate = {
    // 当前比赛是否开始,
    isBegin: false,
    startTime: '2020-09-24 19:00:00',
    beginTimeStr: ''
  }
  
  @observable
  userInfo = {
    isFinish: false,
    userName: '',
    userBeginTime: new Date(),
    source: 0,
    finishTime: new Date(),
    allTime: '',
    cacheCode: new Map(),
    finishList: [''],
    // 提交记录
    submitList: [
      {
        time: new Date(),
        name: '',
        type: '',
        log: ''
      }
    ]
  }

  @action
  updateUserInfo (info: {
    userName: string,
    userBeginTime: Date
  }) {
    this.userInfo.userName = info.userName
    this.userInfo.userBeginTime = info.userBeginTime
    localStorage.setItem('RUN_USER', JSON.stringify(this.userInfo))
  }

  @action
  updateAll (data: any) {
    this.userInfo = data
  }

  @action
  updateCode (data: {
    name: string,
    code: string
  }) {
    this.userInfo.cacheCode.set(data.name, data.code)
    localStorage.setItem('RUN_USER', JSON.stringify(this.userInfo))
  }

  @action
  updateSubmit(data: {
    time: Date,
    problem: InterfaceProblem,
    type: string
  }) {
    if (data.type === 'success') {
      const name = data.problem.name
      if (this.userInfo.finishList.includes(name)) {
        return
      }
      this.userInfo.finishList.push(name)
      let source = 0
      if (data.problem.difficulty === 'easy') {
        source = 15
      }
      if (data.problem.difficulty === 'medium') {
        source = 25
      }
      if (data.problem.difficulty === 'hard') {
        source = 50
      }
      this.userInfo.source += source
    }
    if (this.userInfo.finishList.length === 6) {
      this.userInfo.finishTime = new Date()
      this.userInfo.isFinish = true
    }
    localStorage.setItem('RUN_USER', JSON.stringify(this.userInfo))
  }
}

const common = new Common()

// 更新当前用户的操作

setInterval(() => {
  checked()
}, 1000)
  
const checked = () => {
  const startTime = moment(common.timeDate.startTime)
  const now = moment()
  common.timeDate.isBegin = now.unix() > startTime.unix()
  const dur = moment.duration(startTime.diff(now))
  const timeStr = `${twoNumber(dur.days())}天 ${twoNumber(dur.hours())}时 ${ twoNumber(dur.minutes())} 分 ${ twoNumber(dur.seconds()) } 秒`
  common.timeDate.beginTimeStr = timeStr
  // 这里计算上面的答题总耗时
  if (common.userInfo.userName) {
    // 表示已经开始答题了
    let curNow = now
    if (common.userInfo.isFinish) {
      curNow = moment(common.userInfo.finishTime)
    }
    const durTime = moment.duration(curNow.diff(common.userInfo.userBeginTime))
    const time  = `${twoNumber(durTime.hours())}时 ${ twoNumber(durTime.minutes())} 分 ${ twoNumber(durTime.seconds()) } 秒`
    common.userInfo.allTime = time
  }
}
  
checked()
 
export default common

