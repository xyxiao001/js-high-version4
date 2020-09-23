// 用来执行编辑器代码的
export const compileCode = (src: string): Function => {
  src = `with (exposeObj) { ${src} }`
  /* eslint-disable */
  return new Function('exposeObj', src)
}

const proxyObj = (originObj: any):any =>  {
  let exposeObj = new Proxy(originObj, {
    has: (target, key: any) => {
      if (['console', 'Math', 'Date', 'Set', 'Map', 'Object', 'Array', 'WeakMap', 'parseInt', 'parseFloat'].indexOf(key) >= 0) {
        return target[key]
      }
      if (!target.hasOwnProperty(key)) {
        throw new Error(`这是在沙箱里面哦，不要访问不存在的编辑器和非内置属性哦 ${key}`)
      }
      return target[key]
    },
  })
  return exposeObj
}

export const createSandbox = (src: string, obj = {}, name = '') => {
  // 如果name 不为空 则返回当前定义的函数
  if (name) {
    src += `return ${name}`
    const cur: any = {}
    cur[name] = null
    obj = Object.assign(obj, cur)
  }
  let proxy = proxyObj(obj)
  return compileCode(src).call(proxy, proxy) //绑定this 防止this访问window
}