/**
 * 1 没有发生异常，正确返回结果
 * 2 无异常执行，不需要返回结果 undefined
 * 3 发生了异常
 *
 * 框架的 80%都是在处理异常代码，只有 20%是核心流程；看框架先排除异常代码
 * 函数设计,判断出异常
 *    return false，return null
 *    throw new Error，编程规范出异常都是 throw Error
 * 函数设计，不应该通过 return false、null来处理异常
 *  return false会丢失异常信息
 *
 *  在调用第三方库的时，应该 try catch一下，最好的做法是全局异常处理
 *  try catch 无法捕获 异步异常，比如：定时器里面抛出的异常
 *
 */
function fn1() {
  try {
    fn2()
  } catch(e) {
    console.log(e)
  }
}

function fn2() {
  fn3()
}

function fn3() {
  let a = 100
}

/**
 * 如果函数返回 Promise，就用 await来简化异常链条，
 * 加上 await就可以 try catch捕获异常
 * await 异步代码同步化
 */
async function fn5() {
  try {
    await fn6()
  }catch(e) {
    console.log(e)
  }
}

// 正确的返回异步的 promise
function fn6() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random < .6) {
        reject('300')
      }
    }, 1000)
  })
}

// 错误的没有返回异步的 promise
async function fn7() {
  // 错误的包装，定时器的函数要返回 promise
  await setTimeout(() => {
    throw new Error('fn7 error')
  }, 1000)
  // return 100 async的存在，会把 100包装成 promise
  // 真正的异步没有返回 promise
}
