import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Menu } from 'antd';
import menus from './navConfig.js'
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
            // <ul>
            //     <li><Link to="/">30 天精通 RxJS</Link></li>
            //     {menus.map((item,index) =>
            //     <li key={index}><Link to={item.path}>{item.label}</Link></li>
            //     )}
            //     <li><Link to="/page1">Page1</Link></li>
            //     <li><Link to="/counter">counter</Link></li>
            //     <li><Link to="/userinfo">userinfo</Link></li>
            // </ul>
        )
    }
}