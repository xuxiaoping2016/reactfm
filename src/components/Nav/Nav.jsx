import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends Component {
    render(){
        return (
            <ul>
                <li><Link to="/">首页</Link></li>
                <li><Link to="/context">context</Link></li>
                <li><Link to="/page1">Page1</Link></li>
                <li><Link to="/counter">counter</Link></li>
                <li><Link to="/userinfo">userinfo</Link></li>
                <li><Link to="/hooks">hooks</Link></li>
                <li><Link to="/swiper">swiper</Link></li>
                <li><Link to="/clipboard">clipboard</Link></li>
            </ul>
        )
    }
}