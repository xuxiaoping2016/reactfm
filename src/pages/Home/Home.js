import React, { Component } from 'react';
// import './style.css'
import './style.scss'
import history from '../../utils/history'

import im from '../../images/wait.png'
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentDidMount(){
        console.log("Home",this.props)
    }

    _handleClick() {
        this.setState({
            count: ++this.state.count
        });
    }

    goto = () => {
        history.push('/counter',{ some: 'state' })
    }
    render(){
        return (
            <div className="container">
                <p className="scss">测试scss 样式文件!!!!!!!!!!</p>
                <img src={im}/>
                this is home~~fdfkd<br/>
                当前计数：{this.state.count}<br/>
                <button onClick={() => this._handleClick()}>自增</button>
                <button onClick={ this.goto }>跳到计数器</button>
            </div>
        )
    }
}