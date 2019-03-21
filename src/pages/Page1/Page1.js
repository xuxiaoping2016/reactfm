import React, { Component } from 'react';
import history from '../../utils/history'

export default class Page1 extends Component {
    componentDidMount(){
        this.block();
    }

    block = () => {
        const unblock = history.block('Are you sure you want to leave this page?');
    }

    goto = () => {
        history.push('/userinfo')
    }
 

    render(){
        return (
            <div>
                this is page1!! buchong

                <button onClick={this.goto}>history.block</button>
            </div>
        )
    }
}