import React, { Component } from 'react';
import Co from './Components'
// import './style.css'
// import './style.scss'

import im from '../../images/wait.png'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            
        }
    }

    _handleClick() {
        this.setState({
            count: ++this.state.count
        });
    }

    render(){
        let eles = [
            'abcd',
            'abcd',
            'abcd',
            'abcd',
        ]
        return (
            <div className="container">
                <p className="scss">测试scss 样式文件!!!!!!!!!!</p>
                <img src={im}/>
                this is home~~fdfkd<br/>
                当前计数：{this.state.count}<br/>
                <button onClick={() => this._handleClick()}>自增</button>
                <Co>
                    3434
                    <div>fdfdf</div>
                    <div>rer</div>
                    <div>rrere</div>
                </Co>
            </div>
        )
    }
}