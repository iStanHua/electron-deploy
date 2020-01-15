/**
 * 绑定事件
 * @param {Object} el      Element对象
 * @param {String} event   事件名称
 * @param {Function} fn    回调函数
 */
export function on(el, event, fn) {
  if (el.addEventListener) {
    el.addEventListener(event, fn, false)
  } else if (el.attachEvent) {
    el.attachEvent('on' + event, fn)
  } else {
    el['on' + event] = fn
  }
}

/**
 * 解除事件
 * @param {Object} el      Element对象
 * @param {String} event   事件名称
 * @param {Function} fn    回调函数
 */
export function off(el, event, fn) {
  if (el.removeEventListener) {
    el.removeEventListener(event, fn, false)
  } else if (ele.detachEvent) {
    el.detachEvent('on' + event, fn)
  } else {
    el['on' + event] = null
  }
}
/**
 * 解除一次事件
 * @param {Object} el      Element对象
 * @param {String} event   事件名称
 * @param {Function} fn    回调函数
 */
export function once(el, event, fn) {
  let listener = function () {
    if (fn) {
      fn.apply(this, arguments)
    }
    off(el, event, listener)
  }
  on(el, event, listener)
}
/**
 * 是否存在class名称
 * @param {Object} el    Element对象
 * @param {string} cls   class名称
 */
export function hasClass(el, cls) {
  cls = cls || ''
  if (cls.replace(/\s/g, '').length == 0) return false
  return new RegExp(' ' + cls + ' ').test(' ' + el.className + ' ')
}

/**
 * 添加class名称
 * @param {Object} el    Element对象
 * @param {string} cls   class名称
 */
export function addClass(el, cls) {
  if (!hasClass(cls)) {
    let _cls = el.className
    el.className = _cls == '' ? cls : _cls + ' ' + cls
  }
}
/**
 * 移除class名称
 * @param {Object} el    Element对象
 * @param {string} cls   class名称
 */
export function removeClass(el, cls) {
  if (hasClass(cls)) {
    let _cls = ' ' + el.className.replace(/[\t\r\n]/g, '') + ' '
    while (_cls.indexOf(' ' + name + ' ') > -1) {
      _cls = _cls.replace(' ' + name + ' ', ' ')
    }
    el.className = _cls.replace(/^\s+|\s+$/g, '')
  }
}