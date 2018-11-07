import isArrayLike from './isArrayLike.js'
import isObjectLike from './isObjectLike.js'

/**
 * This method is like `isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * isArrayLikeObject([1, 2, 3])
 * // => true
 *
 * isArrayLikeObject(document.body.children)
 * // => true
 *
 * isArrayLikeObject('abc')
 * // => false
 *
 * isArrayLikeObject(Function)
 * // => false
 */
function isArrayLikeObject(value) {
  // isObjectLike 返回 [] {}
  // isArrayLike返回数组 字符串 以及有length属性的对象
  // 返回类数组对象(数组，及有length属性且属性值为有效数字的{})
  return isObjectLike(value) && isArrayLike(value)
}

export default isArrayLikeObject
