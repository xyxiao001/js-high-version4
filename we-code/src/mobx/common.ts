import { observable } from 'mobx';
import moment from 'moment'
import { twoNumber } from '../tools'
export const timeDate = observable({
  isBegin: false,
  startTime: '2020-09-23 19:00:00',
  beginTimeStr: ''
})

setInterval(() => {
  const startTime = moment(timeDate.startTime)
  const now = moment()
  timeDate.isBegin = now.unix() > startTime.unix()
  const dur = moment.duration(startTime.diff(now))
  const timeStr = `${twoNumber(dur.days())}天 ${twoNumber(dur.hours())}时 ${ twoNumber(dur.minutes())} 分 ${ twoNumber(dur.seconds()) } 秒`
  timeDate.beginTimeStr = timeStr
}, 1000)