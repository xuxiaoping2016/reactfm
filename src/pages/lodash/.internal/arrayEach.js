/**
 * A specialized version of `forEach` for arrays.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 * 
 * 功能类似于 数组的foreach 函数
 * 不同的是只要迭代函数返回false 就会终止循环
 * const arr = [1,2,3,4,5,6,7,8,9];
      this.arrayEach(arr,function(cur,index){
       if(cur == 4) return false;
       console.log(cur);
      })
 *  只会打印 1，2, 3
 */
function arrayEach(array, iteratee) {
    let index = -1
    const length = array == null ? 0 : array.length
  
    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break
      }
    }
    return array
  }
  
  export default arrayEach