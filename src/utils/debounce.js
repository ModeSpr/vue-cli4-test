/**
 * 防和节流 debounce throttle
 * https://raw.githubusercontent.com/lodash/lodash/4.17.15-npm/lodash.js
 */

// 防止多次触发
export function _throttled (fn) {
  if (this.lock) return
  this.lock = true
  this[fn]()
  setTimeout(() => {
    this.lock = false
  }, 1000)
}
export const throttled = throttle(
  function (fn) {
    this[fn]()
  },
  1000,
  { leading: true, trailing: false }
)
/**
 * @static
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 */
var FUNC_ERROR_TEXT = 'Expected a function'
function isObject (value) {
  var type = typeof value
  return value != null && (type === 'object' || type === 'function')
}
function now () {
  return +new Date()
}
var nativeMin = Math.min
export function debounce (func, wait, options) {
  var lastArgs
  var lastThis
  var maxWait
  var result
  var timerId
  var lastCallTime
  var lastInvokeTime = 0
  var leading = false
  var maxing = false
  var trailing = true

  if (typeof func !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT)
  }
  wait = Number(wait) || 0
  if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing ? Math.max(Number(options.maxWait) || 0, wait) : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc (time) {
    var args = lastArgs
    var thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function leadingEdge (time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait)
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  function remainingWait (time) {
    var timeSinceLastCall = time - lastCallTime
    var timeSinceLastInvoke = time - lastInvokeTime
    var timeWaiting = wait - timeSinceLastCall

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting
  }

  function shouldInvoke (time) {
    var timeSinceLastCall = time - lastCallTime
    var timeSinceLastInvoke = time - lastInvokeTime

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait))
  }

  function timerExpired () {
    var time = now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time))
  }

  function trailingEdge (time) {
    timerId = undefined

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel () {
    if (timerId !== undefined) {
      clearTimeout(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush () {
    return timerId === undefined ? result : trailingEdge(now())
  }

  function debounced () {
    var time = now()
    var isInvoking = shouldInvoke(time)

    lastArgs = arguments
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        clearTimeout(timerId)
        timerId = setTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait)
    }
    return result
  }
  debounced.cancel = cancel
  debounced.flush = flush
  return debounced
}

/**
 * @static
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 */
export function throttle (func, wait, options) {
  var leading = true
  var trailing = true

  if (typeof func !== 'function') {
    throw new TypeError(FUNC_ERROR_TEXT)
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }
  return debounce(func, wait, {
    leading: leading,
    maxWait: wait,
    trailing: trailing
  })
}
