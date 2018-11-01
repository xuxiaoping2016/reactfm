function eq(value, other) {
    return value === other || (value !== value && other !== other)
  }

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * 
 * 某个键值对在数组中首次出现的位置
 * const data = [["name","55"],["age","12"],["city","12"]];
       console.log(assocIndexOf(data,"age"))
 */
function assocIndexOf(array, key) {
  let { length } = array
  while (length--) {
    if (eq(array[length][0], key)) {
      return length
    }
  }
  return -1
}

export default assocIndexOf