import getTag from './.internal/getTag.js'
import isObjectLike from './isObjectLike'

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object, else `false`.
 * @example
 *
 * isArguments(function() { return arguments }())
 * // => true
 *
 * isArguments([1, 2, 3])
 * // => false
 * 
 *  const a = function(){
        console.log(Object.prototype.toString.call(arguments)) //[object Arguments]
        return arguments;
      }()
     console.log(a)   rguments [callee: (...), Symbol(Symbol.iterator): ƒ]
 */
function isArguments(value) {
  // isObjectLike  type == "object" && value != null;
  return isObjectLike(value) && getTag(value) == '[object Arguments]'
}

export default isArguments