import verifyPlainObject from '../utils/verifyPlainObject'
// 返回一个函数，这个函数的功能执行getConstant获取要访问的属性，并返回一个返回该属性对象的constantSelector函数
// whenMapStateToPropsIsMissing 调用时 getConstant = () => {}
export function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    const constant = getConstant(dispatch, options)

    function constantSelector() { return constant }
    constantSelector.dependsOnOwnProps = false 
    return constantSelector
  }
}

// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
// 
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
export function getDependsOnOwnProps(mapToProps) {
  // console.log('mapToProps',mapToProps)
  return (mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined)
    ? Boolean(mapToProps.dependsOnOwnProps)
    : mapToProps.length !== 1  // 函数的形参个数；
}

// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
// 
//  * Detects(发现; 查明; 侦察出) whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//    
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//    
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//    校验方法
export function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, { displayName }) {
    const proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      // console.log('proxy.dependsOnOwnProps',proxy.dependsOnOwnProps)
      return proxy.dependsOnOwnProps
        ? proxy.mapToProps(stateOrDispatch, ownProps)
        : proxy.mapToProps(stateOrDispatch)
    }

    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true
    // console.log('proxy.dependsOnOwnProps==true',proxy.dependsOnOwnProps)
    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps // 这里是组件写的mapStateToProps或者mapDispatchToProps函数或者mergeProps；
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps)
      // console.log('proxy.dependsOnOwnProps get',proxy.dependsOnOwnProps)
      console.log('proxy',proxy)
      let props = proxy(stateOrDispatch, ownProps)
      console.log('props....结果',props)  // counter: {count: 0}
      // console.log("typeof props === 'function'",typeof props === 'function')
      if (typeof props === 'function') {
        proxy.mapToProps = props
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props)
        props = proxy(stateOrDispatch, ownProps)
      }

      if (process.env.NODE_ENV !== 'production') 
        verifyPlainObject(props, displayName, methodName)
      // console.log('mapToProps',props)
      return props
    }
    return proxy
  }
}




// const fn = (n) => n ?  fn.a(n) : fn.b(n)
// fn.a = (n) => console.log("fdfd",n)
// fn.b = (n) => {
//   fn.b=()=>console.log('ffff');
//   console.log('b')
// }
// fn() // b
