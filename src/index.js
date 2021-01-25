// 捕获错误用
export const invokeWithErrorCatch = ({
  fn = noop,
  errorHandler = noop,
  log = true,
}) => {
  try {
    return fn()
  } catch (err) {
    log && logError(err)
    return (
      errorHandler && typeof errorHandler === 'function' && errorHandler(err)
    )
  }
}

// 返回包裹过错误处理的函数
export const wrapError = (fn) => {
  return function wrappedFn(...args) {
    return invokeWithErrorCatch({ fn: () => fn.call(this, ...args) })
  }
}

// 用于捕获promise中出现的错误
export const wrapPromiseWithCache = (fn) => {
  return function wrappedPromise(...args) {
    return invokeWithErrorCatch({
      fn: () => fn.call(this, ...args).catch((err) => logError(err)),
    })
  }
}

export const logError = (err) => {
  if (process.env.NODE_ENV === 'development') {
    console.error(`(DEV ONLY)\n${err}`)
  } else {
    console.warn(`(logError)\n${err}`)
  }
}

export const stringify = (val) =>
  invokeWithErrorCatch({ fn: () => JSON.stringify(val) })
export const unstringify = (val) =>
  invokeWithErrorCatch({ fn: () => JSON.parse(val) })

export const noop = () => {}

export default {
  invokeWithErrorCatch,
  wrapError,
  wrapPromiseWithCache,
  logError,
  stringify,
  unstringify,
  noop,
}
