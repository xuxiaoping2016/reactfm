import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends Component {
    render(){
        return (
            <ul style={{paddingRight:"20px"}}>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/page1/1">Page1</Link></li>
                <li><Link to="/stockManage">库存管理</Link></li>
                <li><Link to="/userinfo">userinfo</Link></li>
                <li><Link to="/drag">drag</Link></li>
                <li><Link to="/classname">classnames插件</Link></li>
                <li><Link to="/animate">animate 动画</Link></li>
            </ul>
        )
    }
}