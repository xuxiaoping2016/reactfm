/**
 * The base implementation of `range` and `rangeRight` which doesn't
 * coerce arguments.
 *
 * @private
 * @param {number} start The start of the range.  范围起始值
 * @param {number} end The end of the range.  范围结束值
 * @param {number} step The value to increment or decrement by.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the range of numbers.
 */

 /* 
 1  7  2 
 [1,3,5,7]
 
 
 */

function baseRange(start, end, step, fromRight) {
    let index = -1
    let length = Math.max(Math.ceil((end - start) / (step || 1)), 0)
    const result = new Array(length)
  
    while (length--) {
      result[fromRight ? length : ++index] = start
      start += step || 1
    }
    return result
  }
  
  export default baseRange