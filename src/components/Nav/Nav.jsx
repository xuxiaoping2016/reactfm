import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends Component {
    render(){
        return (
            <ul>
                <li><Link to="/">flex布局</Link></li>
                <li><Link to="/page1">Page1</Link></li>
            </ul>
        )
    }
}