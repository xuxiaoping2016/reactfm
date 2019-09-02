import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends Component {
    render(){
        return (
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/interface">接口,类</Link></li>
                <li><Link to="/fanxing">泛型</Link></li>
                <li><Link to="/intersectiontypes">高级类型</Link></li>
                <li><Link to="/enum">枚举、高级、迭代器和生成器</Link></li>
                <li><Link to="/jsx">jsx</Link></li>
                <li><Link to="/moduledemo">模块</Link></li>
                <li><Link to="/functions">函数</Link></li>
                {/*
                <li><Link to="/userinfo">userinfo</Link></li> */}
            </ul>
        )
    }
}