// 工具类函数

export const twoNumber = (num: number): string => {
  if (num >= 10) {
    return String(num)
  } else {
    return `0${num}`
  }
}