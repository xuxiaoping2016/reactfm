//isEqual比较函数，用来判断参数是否一致，默认使用全等来判断
var simpleIsEqual = function simpleIsEqual(a, b) {
    return a === b;
  };
  
function index (resultFn, isEqual) {
    //不传isEqual，使用默认的内置函数
    if (isEqual === void 0) {
      isEqual = simpleIsEqual;
    }
  
    var lastThis;
    var lastArgs = [];  //上一次的入参
    var lastResult;     //缓存的结果
    var calledOnce = false;  //是否调用过，区分第一次
  
    //判断两次入参是否相等，使用了every方法，这个是every方法的函数
    var isNewArgEqualToLast = function isNewArgEqualToLast(newArg, index) {
      return isEqual(newArg, lastArgs[index]);
    };
  
    var result = function result() {
      //将入参arguments按顺序一个个存入newArgs内
      for (var _len = arguments.length, newArgs = new Array(_len), _key = 0; _key < _len; _key++) {
        newArgs[_key] = arguments[_key];
      }
  
      //入参不变，直接返回缓存的结果lastResult
      if (calledOnce && lastThis === this && newArgs.length === lastArgs.length && newArgs.every(isNewArgEqualToLast)) {
        return lastResult;
      }
  
      lastResult = resultFn.apply(this, newArgs);  //apply到resultFn,传入参数newArgs，缓存结果
      calledOnce = true;
      lastThis = this;  //this？
      lastArgs = newArgs;  //新入参替换缓存的参数
      return lastResult;   //返回新计算的结果
    };
  
    return result;   //返回一个函数，闭包，不被GC
  }
  
  export default index;