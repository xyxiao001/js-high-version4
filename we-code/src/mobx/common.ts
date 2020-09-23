import { observable } from 'mobx';
import moment from 'moment'
import { twoNumber } from '../tools'
export const timeDate = observable({
  // 当前比赛是否开始,
  isBegin: false,
  startTime: '2020-09-24 19:00:00',
  beginTimeStr: ''
})

export const userInfo = observable({
  userName: '',
})

setInterval(() => {
  const startTime = moment(timeDate.startTime)
  const now = moment()
  timeDate.isBegin = now.unix() > startTime.unix()
  const dur = moment.duration(startTime.diff(now))
  const timeStr = `${twoNumber(dur.days())}天 ${twoNumber(dur.hours())}时 ${ twoNumber(dur.minutes())} 分 ${ twoNumber(dur.seconds()) } 秒`
  timeDate.beginTimeStr = timeStr
}, 1000)