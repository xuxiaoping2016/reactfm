import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement, reset } from 'store/actions/counter';

const mapStateToProps = state => {
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    increment: () => {
      dispatch(increment());
    },
    decrement: () => {
      dispatch(decrement());
    },
    reset: () => {
      dispatch(reset());
    },
  };
};
@connect(
  mapStateToProps,
  mapDispatchToProps
)
export default class Counter extends Component {
  render() {
    const { increment, decrement, reset, counter } = this.props;
    return (
      <div>
        <div>当前计数为(显示redux计数){counter.count}</div>
        <button
          onClick={() => {
            increment();
            console.log('调用自增函数');
          }}
        >
          自增
        </button>
        <button
          onClick={() => {
            decrement();
            console.log('调用自减函数');
          }}
        >
          自减
        </button>
        <button
          onClick={() => {
            reset();
            console.log('调用重置函数');
          }}
        >
          重置
        </button>
      </div>
    );
  }
}
