import React, { Component} from 'react';

// 接受props和ref作为参数
// 返回一个React 组件
const FancyButton = React.forwardRef((props, ref) => {
  console.log(props,ref);
  return (
    <button className="fancybutton" ref={ref}>
      {props.children}
    </button>
  )
});


// 父组件
// app.js
class App extends React.Component {

  constructor(props) {
    super(props);
    // 创建一个ref 名字随意
    this.fancyButtonRef = React.createRef();
    this.ele = React.createRef();
  }

  componentDidMount() {
    console.log('ref', this.fancyButtonRef);
    // this.ref.current 表示获取ref指向的DOM元素
    this.fancyButtonRef.current.classList.add('primary'); // 给FancyButton中的button添加一个class
    this.fancyButtonRef.current.focus(); // focus到button元素上
  }

  getCon = () => {
    console.log(this.ele,this.ele.current.innerHTML)
  }

  render() {
    // 直接使用ref={this.fancyButtonRef}
    return (
      <div>
        <p ref={this.ele}>将ref从父组件中转发到子组件中的dom元素上</p>
        <button onClick={this.getCon}>获取p元素内容</button>
        <FancyButton ref={this.fancyButtonRef}>子组件</FancyButton>
      </div>
    );
  }
}

export default App;
