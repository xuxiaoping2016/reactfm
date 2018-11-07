import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

export default class Nav extends Component{
    render(){
        return (
            <ul className="app-nav">
            <li><NavLink exact to="/">首页</NavLink></li>
        </ul>
        )
    }
}