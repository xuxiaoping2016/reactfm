import React, { Component } from 'react';
import { observable, action,computed } from 'mobx'
import {observer} from 'mobx-react'
// 通过 observable 定义组件的状态
const user = observable({
    name: "Jay",
     age: 22
})

// 通过 action 定义如何修改组件的状态
const changeName = action(name => user.name = name)
const changeAge =action(age => user.age = age)

// 通过 observer 定义 ReactComponent 组件。
const Hello = observer(class Hello extends React.Component {
        componentDidMount(){
            // 视图层通过事件触发 action
        // changeName('Wang') // render Wang
    }

    render() {
                // 渲染
            console.log('render',user.name);
        return <div>Hello,{user.name}!</div>
    }
})

// 非视图层事件触发，外部直接触发 action
changeName('Wang2')// render Wang2
// 重点：没有触发重新渲染
// 原因：Hello 组件并没有用到 `user.age` 这个可观察数据
changeAge('18')  // no console

export default Hello;