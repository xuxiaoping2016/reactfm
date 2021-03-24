import { wrapMapToPropsConstant, wrapMapToPropsFunc } from './wrapMapToProps'
// mapStateToProps 是函数时调用
export function whenMapStateToPropsIsFunction(mapStateToProps) {
  return (typeof mapStateToProps === 'function')
    ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps')
    : undefined
}
// mapStateToProps 不存在时执行  返回值是如下函数的返回值，
// 执行getConstant并保存结果，对外输出一个获取改结果的函数
// export function wrapMapToPropsConstant(getConstant) {
//   return function initConstantSelector(dispatch, options) {
//     const constant = getConstant(dispatch, options)

//     function constantSelector() { return constant }
//     constantSelector.dependsOnOwnProps = false 
//     return constantSelector
//   }
// }
export function whenMapStateToPropsIsMissing(mapStateToProps) {
  return (!mapStateToProps)
    ? wrapMapToPropsConstant(() => ({}))
    : undefined
}

export default [
  whenMapStateToPropsIsFunction,
  whenMapStateToPropsIsMissing
]
