//concat.js
// http://www.felearn.com/lodash-source-study-array-concat-compact-isarguments-isflattenable/  源码解析地址
var arrayPush = require('./_arrayPush'),//同Array.push方法,第一个参数是原数组，第二个是需要添加的值得数组集合
    baseFlatten = require('./_baseFlatten'),//数组扁平化，后面再分析，比如[1,[2,3],[4,5,[6]]] => [1,2,3,4,5,6]
    copyArray = require('./_copyArray'),//拷贝数组
    isArray = require('./isArray');//Array.isArray方法的引用。

/**
 * @param {Array} array 需要处理的数组
 * @param {...*} [values] 需要添加的元素或数组
 * @returns {Array} 返回处理后的数组
 * @example
 *
 * var array = [1];
 * var other = _.concat(array, 2, [3], [[4]]);
 *
 * console.log(other);
 * // => [1, 2, 3, [4]]
 *
 * console.log(array);
 * // => [1]  
 */
function concat() {
  var length = arguments.length;//参数个数
  if (!length) {//没有参数，返回空数组
    return [];
  }
  var args = Array(length - 1), //包含需要添加的数组或元素的数组
      array = arguments[0],//原数组
      index = length;//参数索引

  while (index--) {//遍历参数，将除了第一个参数的其他参数加入args中
    args[index - 1] = arguments[index];
  }
  //如果第一个参数是数组，先复制一份（这样就不会修改原数组），然后将args扁平化一级([1,[2,[3]]] => [1,2,[3]])之后添加进拷贝的数组中，并返回添加之后的数组
  //如果第一个参数不是数组，直接将其作为空数组的第一个元素（[array]）,然后将args扁平化一级([1,[2,[3]]] => [1,2,[3]])之后添加进该数组，并返回添加之后的数组
  return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
}

module.exports = concat;