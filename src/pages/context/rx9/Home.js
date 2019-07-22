import React, { Component } from 'react';
// import Rx from 'rxjs/Rx';
import { take, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
// import './style.css'
// import './style.scss'

import im from '../../images/wait.png'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentDidMount(){
        of(1,2,3,4,5)
        .pipe(
            take(3),
            map(val => val + 2)
        ).subscribe(console.log);

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
            </div>
        )
    }
}