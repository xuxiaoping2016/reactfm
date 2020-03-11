import React, { useState, useMemo } from "react";

function Counter(){

}

function UseMemoDemo() {
  const [count, setCount] = useState(0);

  //  再这里 可以将 count == 3 看做一个变量，及 flag = count == 3；
//   当count == 1 时 flag  == false；
//   当count == 2 时 flag  == false；
//   当count == 3 时 flag  == true；  flag值改变了 则执行函数
//   当count == 4 时 flag  == false； flag值改变了 则执行函数
//   当count == 5 时 flag  == false； flag值不变，则不执行函数
  const double = useMemo(() => {
      return count * 2;
  },[count == 3])

  return (
      <div>
          <button type="button" onClick={() => { setCount(count+1)}}>
              Click ({count}), double:({double})
          </button>
      </div>
  )
}

export default UseMemoDemo;