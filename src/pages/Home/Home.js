import React, { Component } from 'react';
import {Link} from 'react-router-dom'

import XlsxRouter from 'pages/Home/homeRouter.js'

import './css/home.scss'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render(){
        const { path } = this.props.match;
        return (
            <div className="container">
                <ul className="home-menu">
                    <li><Link to={`${path}/readfile`}>读取文件</Link></li>
                    <li><Link to={`${path}/readxlsx`}>读取xlsx</Link></li>
                </ul>
                <XlsxRouter/>
            </div>
        )
    }
}