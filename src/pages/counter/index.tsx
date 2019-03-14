import * as React from 'react';
import {increment, decrement, reset} from '../../stores/actions/counter';

import {connect} from 'react-redux';
import {Dispatch} from 'redux'

interface StateProps {
    [propName: string]: any;
}

export interface Props {
    counter: StateProps;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
  }



  

class Counter extends React.Component <Props,any>{
    public render() {
        return (
            <div>
                <div>当前计数为{this.props.counter.count}</div>
                <button onClick={() => this.props.increment()}>自增
                </button>
                <button onClick={() => this.props.decrement()}>自减
                </button>
                <button onClick={() => this.props.reset()}>重置
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state:StateProps) => {
    return {
        counter: state.counter
    }
};

const mapDispatchToProps = (dispatch:Dispatch) => {
    return {
        increment: () => {
            dispatch(increment())
        },
        decrement: () => {
            dispatch(decrement())
        },
        reset: () => {
            dispatch(reset())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);