/**
 * The base implementation of `findIndex` and `findLastIndex`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 * 
 * 功能类似 数组的findIndex 函数，不同的是可以从后往前遍历
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
    const { length } = array
    let index = fromIndex + (fromRight ? 1 : -1)

   /*  (fromRight ? index-- : ++index) < length  
    fromRight ? index-- : (++index < length)
    比较运算符的优先级为11，而三元表达式（条件运算符）的优化级为4，
    因此可以确定比较运算符的优先级要比三元表达式的要高*/
    // fromRight 为 true  先执行++操作 ，然后判断index < length 是否成立，成立则循环
    // fromRight 为 false 先判断index是否存在(即>0)，满足条件 然后执行--操作

    /* 后缀自减，而不是用前缀自减呢
    当使用前缀自减  会先执行++ ，然后while进行判断index是否>0 ，大于0才执行循环，
    否则不执行这样下标为0的数组项就进入不了循环
    */

    /* 为什么使用前缀自增？ 
    先自增 当index == length就不循环了
    如果后自增，那么当index = 7时，先比较满足条件，然后再加的话8就就如循环了
    
    */
  
    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index
      }
    }
    return -1
  }
  
  export default baseFindIndex