const objectProto = Object.prototype
const hasOwnProperty = objectProto.hasOwnProperty
const toString = objectProto.toString

/* 
问题一  在尚未部署Symbol的浏览器下
console.log(Symbol)  报错
console.log(typeof Symbol != 'undefined')  不报错  为什么？
答案：由于传递给log()函数是尚未声明的变量Symbol则会导致一个错误。
    对于尚未声明过的变量，只能执行一项操作，即使用typeof操作符检测数据类型(对于尚未定义的变量调用delete不会导致错误，但这样没有什么实际意义，而在严格模式下会导致错误)
*/

const symToStringTag = typeof Symbol != 'undefined' ? Symbol.toStringTag : undefined

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 * 
 * 相关文章 lodash源码分析之获取数据类型
 * https://blog.csdn.net/quxing10086/article/details/79840648
 * 
 * 
 * for(var cur of data1){
      console.log(Object.prototype.toString.call(cur))
    }
    [object Array]
    [object String]
    [object Number]
    [object Boolean]
    [object Function]
    [object Undefined]
    [object Object]
    [object Null]
    [object Symbol]
    [object Number]

 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  if (!(symToStringTag && symToStringTag in Object(value))) {
    return toString.call(value)
  }
  const isOwn = hasOwnProperty.call(value, symToStringTag)
  const tag = value[symToStringTag]
  let unmasked = false
  try {
    value[symToStringTag] = undefined
    unmasked = true
  } catch (e) {}

  const result = toString.call(value)
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag
    } else {
      delete value[symToStringTag]
    }
  }
  return result
}

export default baseGetTag