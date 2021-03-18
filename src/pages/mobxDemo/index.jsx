import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import {createAtom, autorun, observable, action} from 'mobx'
import {observer} from 'mobx-react'
import { Menu } from 'antd'
// import {clock} from './clock'
const MenuItem = Menu.Item;

const mn = require('./mobx.cjs.development')

const {createAtom, autorun, observable, action} = mn

class N {
    @observable name= 'fdfdfdf'
    @action change  = () => {
        this.name = Math.random()*10000
        console.log('name',this.name)
    }
}
const ob = new N()
autorun(() => {
    console.log('....',ob.name)
})
@observer
export default class MobxDemo extends Component {
    state ={
        show: true
    }
    hide = () => {
        this.setState({
            show:false
        })
    }
    
    render(){
        return (
            <div>

                {/* <button onClick={clock.startTicking}>开始</button><button onClick={clock.stopTicking}>停止</button> */}
                <button onClick={this.hide}>隐藏</button>
                <button onClick={ob.change}>更新</button>
                {/* {this.state.show ? (
                    <div>{ob.name}</div>
                ) : null} */}
                {/* <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <MenuItem key="1"><Link to="/mobxdemo/child1">mobx跨组件使用</Link></MenuItem>
                    <MenuItem key="2"><Link to="/mobxdemo/child2">关于@observer的一些说明</Link></MenuItem>
                    <MenuItem key="2"><Link to="/mobxdemo/proxy">es6 proxy</Link></MenuItem>
                </Menu>
                <p>Mobx使用详解<br/>https://www.jianshu.com/p/505d9d9fe36a</p>
                <p>MobX 核心源码解析<br/>https://segmentfault.com/p/1210000010496905</p>
                <p>Mobx 思想的实现原理<br/>https://www.jianshu.com/p/8e9ab3f26162</p>
                {this.props.children} */}
            </div>
        )
    }
}