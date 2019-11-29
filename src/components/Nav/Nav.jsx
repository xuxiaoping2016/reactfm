import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import navConfig from './navConfig'
import {Link} from 'react-router-dom';

export default class Nav extends Component {
    state = {
        index : ['0']
    }
    render(){
        return (
            <Menu theme="dark" mode="inline" defaultSelectedKeys={this.state.index}>
            {
                navConfig.map((item,index) => 
                    <Menu.Item key={index}>
                    {/* <Icon type="user" /> */}
                    <Link to={item.path} className="nav-text">{item.title}</Link>
                    </Menu.Item>
                )
            }
            </Menu>
        )
    }
}