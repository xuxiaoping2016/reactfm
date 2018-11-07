import isFlattenable from './isFlattenable.js'

/**
 * The base implementation of `flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  predicate || (predicate = isFlattenable)
  result || (result = [])

  if (array == null) {
    return result
  }

  // [1, [2, 3, [4]]]

  for (const value of array) {
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        console.log("fuhe",value)
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result)
      } else {
        result.push(...value)
      }
    } else if (!isStrict) {  //不是严格限制条件，直接将数据赋给result，如果isStrict 为true则不添加此数据
      console.log("result.length",value)
      result[result.length] = value
    }
  }
  return result
}

export default baseFlatten
