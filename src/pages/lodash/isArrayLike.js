import isLength from "./isLength.js";

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * isArrayLike([1, 2, 3])
 * // => true
 *
 * isArrayLike(document.body.children)
 * // => true
 *
 * isArrayLike('abc')
 * // => true
 *
 * isArrayLike(Function)
 * // => false
 * 
 * value.length  只有字符串 函数 数组才有length；
 * 
 * 返回数组 字符串 以及有length属性的对象
 */
function isArrayLike(value) {
  return value != null && typeof value !== "function" && isLength(value.length);
}

export default isArrayLike;
