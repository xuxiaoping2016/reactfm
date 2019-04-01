import React, { Component } from 'react';

export default class HooksDemo1 extends Component {
    state = {
        list:[
            {text:"在组件内部调用这个函数渲染组件",id:1},
            {text:"在组件内部调用这个函数渲染组件",id:2},
            {text:"在组件内部调用这个函数渲染组件",id:3},
        ]
    }

    render(){
        const { render} = this.props;
        const {list} = this.state;
        return (
            <div>
                {render(list)}
            </div>
        )
    }
}