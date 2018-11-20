import React, { Component } from 'react';
// import './style.css'
import './style.scss'
import pathToRegexp from 'path-to-regexp';
import district from 'utils/district.js'

import QsDemo from './qsdemo'
import PathToReg from './pathToRegexp'

import AntAlert from './antAlert'

import permissions from 'utils/permissions'


import im from '../../images/wait.png'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentDidMount(){
        console.log(permissions)
        // console.log(district.newLocation)
        // console.log(district.aLocation)
        // console.log(district.translateAddress)
    }

    

    _handleClick() {
        this.setState({
            count: ++this.state.count
        });
    }

    render(){
        return (
            <div className="container">
                <p className="scss">测试scss 样式文件!!!!!!!!!!</p>
                <img src={im}/>
                this is home~~fdfkd<br/>
                当前计数：{this.state.count}<br/>
                <button onClick={() => this._handleClick()}>自增</button>
                {/* <QsDemo/> */}
                {/* <PathToReg/> */}
                <AntAlert/>
            </div>
        )
    }
}