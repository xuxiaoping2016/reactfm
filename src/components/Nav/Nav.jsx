import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends Component {
    render(){
        return (
            <ul style={{ paddingRight:"40px"}}>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/page1">Page1</Link></li>
                <li><Link to="/counter">counter</Link></li>
                <li><Link to="/context">上下文(Context)</Link></li>
            </ul>
        )
    }
}