import React, {Component} from 'react';
class ContextDemo extends Component {

    render() {
        
        return (
            <div>
               JSX 对使用React 不是必须的。当你不想在你的构建环境中设置编译器，那么不使用 JSX 的 React 是非常方便的。<br/>
每一个 JSX 元素都是调用 React.createElement(component, props, ...children) 的语法糖，因此，任何你使用 JSX 来做事都可以通过纯 JavaScript 实现 
            </div>
        )
    }
}

export default ContextDemo;
