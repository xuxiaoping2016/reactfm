import React, {Component} from 'react';


function Repeat(props) {
    let items = [];
    for (let i = 0; i < props.numTimes; i++) {
      items.push(props.children(i));
    }
    return <div>{items}</div>;
  }
  
class ContextDemo extends Component {

    render() {
        
        return (
            <div>
                <div>
                    <p>一、简介<br/>从本质上讲，JSX 只是为 React.createElement(component, props, ...children) 函数提供的语法糖。</p>
                    <p>二、指定 React 元素类型<br/>
                        1、React 必须在作用域中<br/>
                        2、对 JSX 类型使用点语法<br/>
                        3、用户定义组件必须以大写字母开头<br/>
                        4、在运行时选择类型&nbsp;&nbsp;&nbsp;&nbsp;不能使用一个普通的表达式作为 React 元素类型。如果你想使用普通表达式来表示元素类型，首先你需要将其赋值给大写的变量。这通常会出现在根据不同的 props 渲染不同的组件时<br/>
                    </p>
                    <p>三、JSX 中的 props(属性)<br/>
                    有几种不同的方式来指定 JSX 中的 props(属性) 。<br/>
                        1、JavaScript 表达式作为 props(属性) ，传递任何一个用 大括号 包裹的 JavaScript 表达式作为 props(属性)<br/>
                        2、字符串字面量<br/>
                        3、props(属性) 默认为 “true”，如果你没给 prop(属性) 传值，那么他默认为 true <br/>
                        4、属性展开
                    </p>
                    <p>四、JSX 中的 Children<br/>
                        1、字符串字面量&nbsp;&nbsp;&nbsp;&nbsp;您可以在开放标签和闭合标签中放入一个字符串，那么 props.children 就是那个字符串<br/>
                        2、JSX Children&nbsp;&nbsp;&nbsp;&nbsp; 你可以提供多个 JSX 元素作为 children，可以混合不同类型的 children(子元素) 在一起使用，所以你可以混用字符串字面量和 JSX children<br/>
                        3、JavaScript 表达式作为 Children(子元素)，通过使用 {} 包裹，你可以将任何的 JavaScript 元素而作为 children(子元素) 传递
                        4、Functions(函数) 作为 Children(子元素)<br/>
                        5、Booleans, Null, 和 Undefined 被忽略，false，null，undefined，和 true 都是有效的的 children(子元素) 。但是并不会被渲染
                    </p>
                </div>
                <Repeat numTimes={10}>
                {(index) => <div key={index}>This is item {index} in the list</div>}
                </Repeat>
            </div>
        )
    }
}

export default ContextDemo;
