
// async 会把函数强制包装为 promise
async function fn() {
  return 200
}

// Promise { 200 } Object
console.log(fn(), typeof fn())
