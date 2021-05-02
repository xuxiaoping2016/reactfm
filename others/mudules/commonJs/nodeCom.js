/*
 * @Author: xiaoping.xu
 * @Date: 2021-04-21 00:24:14
 * @LastEditors: xiaoping.xu
 * @LastEditTime: 2021-04-21 00:25:06
 * @Desc: 
 */
var x = 5;
var addX = function (value) {
  return value + x;
};
module.exports.x = x;
module.exports.addX = addX;
console.log(module)