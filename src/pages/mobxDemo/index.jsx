import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
const MenuItem = Menu.Item;

export default class MobxDemo extends Component {
    render(){
        return (
            <div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}
                >
                    <MenuItem key="1"><Link to="/mobxdemo/child1">mobx跨组件使用</Link></MenuItem>
                    <MenuItem key="2"><Link to="/mobxdemo/child2">关于@observer的一些说明</Link></MenuItem>
                </Menu>
                <p>Mobx使用详解<br/>https://www.jianshu.com/p/505d9d9fe36a</p>
                {this.props.children}
            </div>
        )
    }
}