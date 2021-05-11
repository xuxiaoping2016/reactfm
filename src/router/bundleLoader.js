/*
 * @Author: xiaoping.xu
 * @Date: 2021-05-10 10:41:51
 * @LastEditors: xiaoping.xu
 * @LastEditTime: 2021-05-10 10:59:45
 * @Desc: 
 */

module.exports = function(cb) {
    Promise.all(
    /*! require.ensure | page1 */
    [__webpack_require__.e("vendors~page1"), __webpack_require__.e("page1")])
    .then((function(require) {
        cb(__webpack_require__(
        /*! !../../../node_modules/babel-loader/lib?cacheDirectory=true!./Page1.js */
        "./node_modules/babel-loader/lib/index.js?cacheDirectory=true!./src/pages/Page1/Page1.js"));
    }).bind(null, __webpack_require__)).
    catch(__webpack_require__.oe);
}