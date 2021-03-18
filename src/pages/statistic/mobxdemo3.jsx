
import React from 'react';
import { observable, computed, action,autorun, intercept } from 'mobx';  // /Users/xuxiaoping/work/github/mobx/packages/mobx/src/mobx.ts
import { observer } from 'mobx-react';
//Mobx使用详解  https://www.jianshu.com/p/505d9d9fe36a

// class MyState {
//     @observable num1 = 0;
//     @observable num2 = 100;
  
//     @action addNum1 = () => {
//       this.num1 ++;
//     };
//     @action addNum2 = () => {
//       this.num2 ++;
//     };
//     @computed get total() {
//       return this.num1 + this.num2;
//     }
//   }
  
  // const newState = new MyState();
  // autorun(action=>{
  //     console.log(action,newState.num1,newState.num2,newState.total)
  // })


  //  ruanyifeng  decorator start
  // function dec(id){
  //   console.log('evaluated', id);
  //   return (target, property, descriptor) => console.log('executed', id);
  // }
  
  // class Example {
  //     @dec(1)
  //     @dec(2)
  //     method(){}
  // }

  //ruanyifeng  decorator end


  // const theme = observable({
  //   backgroundColor: "#ffffff"
  // })
  
  // const disposer = intercept(theme, "backgroundColor", change => {
  //   console.log('change',change)
  //   if (!change.newValue) {
  //     // 忽略取消设置背景颜色
  //     return null;
  //   }
  //   if (change.newValue.length === 6) {
  //     // 补全缺少的 '#' 前缀
  //     change.newValue = '#' + change.newValue;
  //     return change;
  //   }
  //   if (change.newValue.length === 7) {
  //       // 这一定是格式正确的颜色代码！
  //       return change;
  //   }
  //   if (change.newValue.length > 10) disposer(); // 不再拦截今后的任何变化
  //   throw new Error("This doesn't like a color at all: " + change.newValue);
  // })

  const changeTheme = () => {
    // theme.backgroundColor = '#00ff00'
  }


  class Aa{
    a=3
  }

  const a1 = observable({a:2})
  autorun(()=>{
    console.log("Completed %d of %d items",
        a1.a,
        a1.b)
  })

  @observer
  export default class App extends React.Component {
    render() {

      const handleDecorator = () => {
        // const r = new Example()
        // r.method()
      }
      const chnageA1 = () => {
        console.log(a1)
        a1.a = Math.random()
      }
      const chnageA2 = () => {
        console.log(a1)
        a1.b = Math.random()
      }

      return (
        <div>
          {/* <button onClick={newState.addNum1}>addNum1</button>
          <button onClick={newState.addNum2}>addNum2</button> */}
          <button onClick={handleDecorator}>decorator</button>
          {/* <div>
          <button onClick={changeTheme}>theme</button>
          <div style={{width:"100px",height:"20px",background:theme.backgroundColor}}></div>
          </div> */}
          <div>
            store a1<br/>
            <button onClick={chnageA1}>change1</button>
            <button onClick={chnageA2}>change a2</button>
            <div>a: {a1.a}</div>
            <div>b: {a1.b}</div>
          </div>
        </div>
      );
    }
  }