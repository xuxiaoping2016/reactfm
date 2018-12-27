// 高阶组件
import React from 'react';

function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('先前的属性：', prevProps);
      console.log('当前属性：', this.props);
    }
    
    render() {
      // 使用forwardedRef作为一个ref属性传入组件中
      const { forwardedRef, ...rest } = this.props;
      return (
        <Component ref={forwardedRef} {...rest} />
      );
    }
  }
  
  // 使用React.forwardRef对LogProps组件进行转发
  return React.forwardRef((props, ref) => (
    // 上面定义的LogProps组件接受一个forwarded属性
    <LogProps forwardedRef={ref} {...props} />
  ));
}




// 接受props和ref作为参数
// 返回一个React 组件
const FancyButton1 = React.forwardRef((props, ref) => (
    <button className="fancybutton" ref={ref}>
      {props.children}
    </button>
));

const FancyButton = logProps(FancyButton1)



// 父组件
// app.js
class App extends React.Component {
  
  constructor(props) {
    super(props);
    // 创建一个ref 名字随意
    this.fancyButtonRef = React.createRef();
  }
  
  componentDidMount() {
    console.log('ref', this.fancyButtonRef);
    // this.ref.current 表示获取ref指向的DOM元素
    this.fancyButtonRef.current.classList.add('primary'); // 给FancyButton中的button添加一个class
    this.fancyButtonRef.current.focus(); // focus到button元素上
  }
  
  render() {
    // 直接使用ref={this.fancyButtonRef}
    return (
      <div>
        <p>在高阶组件中使用转发ref<br/>
        如果使用了高阶组件，还是按照上面普通的方式使用的话，会导致ref直接转发到高阶组件上，这很明显是错的，我们只需转发多次即可</p>
        <FancyButton ref={this.fancyButtonRef}>子组件</FancyButton>
      </div>
    );
  }
}

export default App;