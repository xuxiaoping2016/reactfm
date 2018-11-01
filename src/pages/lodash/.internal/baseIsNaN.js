/**
 * The base implementation of `isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 * 
 *  为什么不用isNaN？
 * isNaN会调用Number()将参数转换为数字类型，像Symbol类型会报错
 * index.jsx:45 Uncaught TypeError: Cannot convert a Symbol value to a number
 * 
 * isNaN()函数只对数字能正确判断
 * 数组，函数，对象 undefined 对象 都会转换为 NaN，不符合业务需求
 */


// const params = {
//     p1 : [1, 2, 3, 4],
//     p2 : '455',
//     p3 : 123434,
//     p4 : false,
//     p5 :function (){},
//     p6 : undefined,
//     p7 : {name:"xuxiaoping",age:12,city:"上海",home:"香花"},
//     p8 : null,
//     p9 : new Set()
// }

// for(var i in params){
//     console.log(params[i],baseIsNaN(params[i]),Number(params[i]), isNaN(params[i]))
//   }

//   [1, 2, 3, 4] false NaN true
// 455 false 455 false
// 123434 false 123434 false
// false false 0 false
// ƒ p5() {} false NaN true
// undefined false NaN true
// {name: "xuxiaoping", age: 12, city: "上海", home: "香花"} false NaN true
// null false 0 false
// Set(0) {} false NaN true

function baseIsNaN(value) {
    return value !== value
  }
  
  export default baseIsNaN