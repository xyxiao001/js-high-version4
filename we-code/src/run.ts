// 用来执行编辑器代码的
export const compileCode = (src: string): Function => {
  src = `with (exposeObj) { ${src} }`
  /* eslint-disable */
  return new Function('exposeObj', src)
}

const proxyObj = (originObj: any):any =>  {
  let exposeObj = new Proxy(originObj, {
    has: (target, key: any) => {
      if (["console", "Math", "Date"].indexOf(key) >= 0) {
        return target[key]
      }
      // if (!target.hasOwnProperty(key)) {
      //   throw new Error(`Illegal operation for key ${key}`)
      // }
      return target[key]
    },
  })
  return exposeObj
}

export const createSandbox = (src: string, obj = {}, name = '') => {
  let proxy = proxyObj(obj)
  // 如果name 不为空 则返回当前定义的函数
  src += `return ${name}`
  return compileCode(src).call(proxy, proxy) //绑定this 防止this访问window
}