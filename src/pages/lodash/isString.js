import getTag from './.internal/getTag.js'

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a string, else `false`.
 * @example
 *
 * isString('abc')
 * // => true
 *
 * isString(1)
 * // => false
 * 
 * 
 * 
 * var str1 = '23434';
      var str2 = new String('fdfd')
      
      console.log(typeof str1, typeof str2)
      console.log(isString(str1), isString(str2));
      console.log(Object.prototype.toString.call(str1),Object.prototype.toString.call(str2))

      分别打印
      string object
      true true
      [object String] [object String]

 */
function isString(value) {
  const type = typeof value
  return type == 'string' || (type == 'object' && value != null && !Array.isArray(value) && getTag(value) == '[object String]')
}

export default isString