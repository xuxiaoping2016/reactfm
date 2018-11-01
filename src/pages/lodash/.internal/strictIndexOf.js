/**
 * A specialized version of `indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * 
 * 从指定位置查找 数组中是否有与value 全等于的数组项，如有返回下标，否则 -1；
 */
function strictIndexOf(array, value, fromIndex) {
    let index = fromIndex - 1
    const { length } = array
  
    while (++index < length) {
        console.log(index)
      if (array[index] === value) {
        return index
      }
    }
    return -1
  }
  
  export default strictIndexOf