import isArguments from '../isArguments.js'

/** Built-in value reference. */
// 对象的Symbol.isConcatSpreadable属性等于一个布尔值，
// 表示该对象用于Array.prototype.concat()时，是否可以展开。

// 疑问  Symbol.isConcatSpreadable  在尚未不支持Symbol 的浏览器中会报错 为什么还需要这样写？
const spreadableSymbol = Symbol.isConcatSpreadable

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */

//  //检查一个变量是否是一个可展开的对象或者数组
function isFlattenable(value) {
  return Array.isArray(value) || isArguments(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol])
    // //如果是数组，则可展开
    //如果是arguments对象，则可展开
    //如果当前环境含有Symbol对象，且此变量含有Symbol.isConcatSpreadable属性，
    // Symbol.isConcatSpreadable用于改变array或者array-like对象使用concat时的默认行为
}

export default isFlattenable
