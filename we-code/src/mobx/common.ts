import { observable } from 'mobx';
import moment from 'moment'
export const timeDate = observable({
  startTime: '2020-09-17 19:00:00',
  beginTimeStr: ''
})

setInterval(() => {
  const startTime = moment(timeDate.startTime)
  const now = moment()
  const dur = moment.duration(startTime.diff(now))
  const timeStr = `${dur.days()}天 ${dur.hours()}时 ${ dur.minutes()} 分 ${ dur.seconds() } 秒`
  timeDate.beginTimeStr = timeStr
}, 1000)