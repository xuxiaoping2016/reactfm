import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import XlsxRouter from './homeRouter'
import Readfilers from 'pages/Home/demos/fileReader.jsx';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render(){

        return (
            <div className="container">
                <ul>
                    <li><Link to="/home/readfile">读取图片文件</Link></li>
                </ul>
                <XlsxRouter/>
                <Readfilers/>
            </div>
        )
    }
}