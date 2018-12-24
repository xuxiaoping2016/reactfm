import React, { Component } from 'react';
import {request} from 'utils/request'

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    componentDidMount() {
        if (this.state.count == 1) {
            console.log("...")
        }
    }

    handleClick = () => {
        this.setState({
            count: ++this.state.count
        });
    }
    render() {
        return (
            <div>
                this is home~558888888888888888888<br />
                当前计数：{this.state.count}<br />
                <button onClick={this.handleClick}>自增</button>
            </div>
        )
    }
}