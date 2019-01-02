import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'antd';
import menus from './navConfig'

const MenuItem = Menu.Item;
export default class Nav extends Component {
    render(){
        return (
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
        >
            {menus.map((item,index) =>
            <MenuItem key={index}><Link to={item.path}>{item.label}</Link></MenuItem>
            )}
        </Menu>
        )
    }
}