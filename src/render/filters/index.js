
function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

/**
* 格式化日期
* @param {String} date   日期
* @param {String} format 日期格式
*/
export function formatDate(date, format = 'yyyy-MM-dd hh:mm:ss') {
  date = new Date(date)
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      let str = o[k] + ''
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return format
}

/**
* 格式化日期为年前、月前、日前、小时前、分钟前、刚刚
* @param {String} date   日期
*/
export function diffDate(date) {
  date = new Date(date)
  let _diff = new Date - date
  let s = 1000
  let m = s * 60
  let h = m * 60
  let d = h * 24
  let mh = d * 30
  let y = mh * 12
  let str = ''
  if (_diff / s < 60) {
    str = '刚刚'
  }
  else if (_diff / m < 60) {
    str = Math.floor(_diff / m) + '分钟前'
  }
  else if (_diff / h < 24) {
    str = Math.floor(_diff / h) + '小时前'
  }
  else if (_diff / d < 60) {
    str = Math.floor(_diff / d) + '天前'
  }
  else if (_diff / mh < 12) {
    str = Math.floor(_diff / mh) + '月前'
  }
  else if (_diff / y > 1) {
    str = Math.floor(_diff / y) + '年前'
  }
  return str
}

/**
 * 货币格式化
 * @param {String} num
 */
export function moneyFormat(num) {
  return String(num).replace(/(?=((?!\b)\d{3})+$)/g, ',')
}
