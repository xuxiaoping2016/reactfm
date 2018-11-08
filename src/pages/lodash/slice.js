/**
 * Creates a slice of `array` from `start` up to, but not including, `end`.
 *
 * **Note:** This method is used instead of
 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
 * returned.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position. A negative index will be treated as an offset from the end.
 * @param {number} [end=array.length] The end position. A negative index will be treated as an offset from the end.
 * @returns {Array} Returns the slice of `array`.
 * @example
 *
 * var array = [1, 2, 3, 4]
 *
 * _.slice(array, 2)
 * // => [3, 4]
 * 
 * 
 * const data1 = [[5],[1, 2, 3, 4],'455',123434,false,
 * function (){console.log('f')},undefined,{name:"xuxiaoping",age:12,city:"上海",home:"香花"},
 *  null,Symbol("d"),new Set(),NaN]
 * 
 * 不同数据类型的length属性的返回值
 *  undefined null 没有length属性，调用会报错
 *  数字，布尔，object， Symbol length属性为 undefined
 *  函数 length 返回函数的形参个数
 *  字符串 ，length返回字符串长度
 *  数组，返回数组元素个数
 * 
 * 
 *  start end 可以是负数，但是转换成正数后 start大于end 将返回一个空数组
 * 
 * 代码逻辑
 * 1、
 *
 */
function slice(array, start, end) {
  let length = array == null ? 0 : array.length;
  if (!length) {  //undefined,null 数字，boolean ，{} ，Symbol 返回 [];
    return [];
  }
  start = start == null ? 0 : start;
  end = end === undefined ? length : end;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }

  // 为什么要使用无符号右移运算？
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  let index = -1;
  const result = new Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

export default slice;
