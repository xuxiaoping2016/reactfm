import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends Component {
    render(){
        return (
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/fanxing">泛型</Link></li>
                <li><Link to="/intersectiontypes">高级类型</Link></li>
                <li><Link to="/enum">枚举</Link></li>
                {/*
                <li><Link to="/userinfo">userinfo</Link></li> */}
            </ul>
        )
    }
}