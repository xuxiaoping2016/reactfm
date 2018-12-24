import React, { Component } from 'react';
import {inject, observer} from 'mobx-react'

@inject('MobxStore')
@observer
class AllNum extends Component {
    render(){
        const { MobxStore } = this.props;
        return <div>num1 + num2 = {MobxStore.total}</div>
    }
} ;

@inject('MobxStore')
@observer
class Main extends Component {
    render(){
        const { MobxStore } = this.props;
        return (
            <div>
                <p>num1 = {MobxStore.num1}</p>
                <p>num2 = {MobxStore.num2}</p>
                <div>
                <button onClick={MobxStore.addNum1}>num1 + 1</button>
                <button onClick={MobxStore.addNum2}>num2 + 1</button>
                </div>
            </div>
        )
    }
} ;


export default class Home extends Component {
    render(){
        return (
            <div>
                <AllNum />
                <Main />
            </div>
        )
    }
}