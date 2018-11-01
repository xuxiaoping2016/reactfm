// 功能类似 数组的findIndex 函数，不同的是可以从后往前遍历
import baseFindIndex from './baseFindIndex.js'  
import baseIsNaN from './baseIsNaN.js'
// 从指定位置查找 数组中是否有与value 全等于的数组项，如有返回下标，否则 -1
import strictIndexOf from './strictIndexOf.js'

/**
 * The base implementation of `indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  //value === value  非NaN
  console.log(value,value === value)
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex)
}

export default baseIndexOf