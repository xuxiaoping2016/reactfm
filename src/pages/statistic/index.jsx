import React, {Component} from 'react';
import {observable} from 'mobx';
import {observer} from "mobx-react"

var appState = observable({
    timer: 0
});

@observer
export default class StatisticView extends Component{
    componentDidMount(){
        console.log(props)
    }
    onReset = () => {
        this.props.appState.resetTimer();
    }

    render() {
        return (
            <button onClick={this.onReset}>
                Seconds passed: {this.props.appState.timer}
            </button>
        );
    }
}