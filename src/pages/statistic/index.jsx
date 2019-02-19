import React, {Component} from 'react';
import {Modal, Row, Col} from 'antd'
import {observable,action} from 'mobx';
import TimerView from './mobxdemo1'

var appState = observable({
    timer: 0
});

appState.resetTimer = action(function reset() {
    appState.timer = 0;
});

setInterval(action(function tick() {
    appState.timer += 1;
}), 1000);

export default class Demo extends Component{
    render() {
        return (
           <div>
               <TimerView appState = {appState}/>
           </div>
        );
    }
}

