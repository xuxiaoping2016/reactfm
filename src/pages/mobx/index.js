import React from 'react';
import {observer} from 'mobx-react';
import appState from '../../mobx/example/ceshi'
import todos from '../../mobx/example/todos'


@observer
export default class TimerView extends React.Component {
    render() {
        return (
            <button onClick={this.onReset.bind(this)}>
                Seconds passed: {appState.timer}
            </button>
        );
    }

    onReset() {
        appState.resetTimer();
    }
};