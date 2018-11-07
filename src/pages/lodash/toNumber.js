import isObject from './isObject.js'  //value != null && (type == 'object' || type == 'function')
import isSymbol from './isSymbol.js'

/** Used as references for various `Number` constants.
 * isNaN(0 / 0)  // true
 */
const NAN = 0 / 0   

/** Used to match leading and trailing whitespace. 匹配首尾空格 */
const reTrim = /^\s+|\s+$/g

/** Used to detect bad signed hexadecimal string values. 用于检测错误的带符号十六进制字符串值*/
const reIsBadHex = /^[-+]0x[0-9a-f]+$/i

/** Used to detect binary string values. 检测八进制数值*/
const reIsBinary = /^0b[01]+$/i

/** Used to detect octal string values. 检测八进制数值 */  
const reIsOctal = /^0o[0-7]+$/i

/** Built-in method references without a dependency on `root`. */
const freeParseInt = parseInt

/**
 * Converts `value` to a number.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @see isInteger, toInteger, isNumber
 * @example
 *
 * toNumber(3.2)
 * // => 3.2
 *
 * toNumber(Number.MIN_VALUE)
 * // => 5e-324
 *
 * toNumber(Infinity)
 * // => Infinity
 *
 * toNumber('3.2')
 * // => 3.2
 * 
 * 功能类似Number()函数
 * 所不同的是 toNumber()还能将Symbol 类型 转为数字NaN,而Number对Symbol操作会报错
 * 
 * function(value){
 * if (isSymbol(value)) {
        return NAN
    }
    return Number(value)
 * }
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value
  }
  if (isSymbol(value)) {
    return NAN
  }

  //走到这一步 还有 字符串 Boolean fun，undefined,obj(null)
  if (isObject(value)) { // 数组 对象 和 函数 进行处理 是对象 现获取原始值，原始值还是对象的话就转换为字符串
    const other = typeof value.valueOf == 'function' ? value.valueOf() : value
    value = isObject(other) ? `${other}` : other
  }

  console.log(typeof value, typeof value != 'string')
  if (typeof value != 'string') {
    return value === 0 ? value : +value
  }
  value = value.replace(reTrim, '')
  const isBinary = reIsBinary.test(value)
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value)
}

export default toNumber