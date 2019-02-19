import React, {Component} from 'react';
import {Modal, Row, Col} from 'antd'
import {observable} from 'mobx';
import {observer} from "mobx-react"

var appState = observable({
    timer: 0
});

@observer
export default class TimerView extends React.Component {
    render() {
        return (
            <button onClick={this.onReset.bind(this)}>
                Seconds passed: {this.props.appState.timer}
            </button>
        );
    }

    onReset() {
        this.props.appState.resetTimer();
    }
};

