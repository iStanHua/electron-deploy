/**
 * 特殊字符
 */
export function validateSpecialChar(value) {
  return /[。~!@#$%\^\+\*&\\\/\?\|:\.<>{}()';="]/.test(value)
}

/**
 * 密码
 */
export function validatePassword(value) {
  return /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)(?![a-zA-z\d]+$)(?![a-zA-z!@#$%^&*]+$)(?![\d!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/.test(value)
}

/**
 * 手机号
 */
export function validatePhoneNumber(value) {
  return /^1[3456789]\d{9}$/.test(value)
}

/**
 * 电话
 */
export function validateTelephone(value) {
  return /^0\d{2,3}-?\d{7,8}$/.test(value)
}

/**
 * 邮箱
 */
export function validateEmail(value) {
  return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value)
}

/**
 * 身份证
 */
export function validateIdCard(value) {
  return /^\d{15}$|^\d{17}[0-9Xx]$/.test(value)
}

/**
 * 邮政编码
 */
export function validateZipcode(value) {
  return /^[1-9][0-9]{5}$/.test(value)
}

/**
 * 金额
 */
export function validateMomey(value) {
  return /^-?\d*(\.\d{0,2})?$/.test(value)
}

/**
 * 纯数字
 */
export function validatePureNumber(value) {
  return /^[0-9]*$/.test(value)
}

/**
 * 车牌号
 */
export function validateCarNumber(value) {
  return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(value)
}

/**
 * 中文
 */
export function validateChinese(value) {
  return /[\u4E00-\u9FA5]/.test(value)
}

/**
 * 表情符号
 */
export function validateEmoji(value) {
  return /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g.test(value)
}

/**
 * 货币格式
 */
export function currencyFormat(value) {
  value = value.replace(/\,/g, '')
  return value.replace(/(?!^)(?=(\d{3})+$)/g, ',')
}

/**
 * 手机格式
 */
export function phoneFormat(value) {
  value = validate.trim(value)
  return value.replace(/(?!^)(?=(\d{4})+$)/g, ' ')
}

/**
 * 清除所有空格
 */
export function trim(value) {
  return value.replace(/\s/g, '')
}