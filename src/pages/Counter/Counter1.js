/*
 * @Author: xiaoping.xu
 * @Date: 2021-05-11 14:22:00
 * @LastEditors: xiaoping.xu
 * @LastEditTime: 2021-08-25 11:26:04
 * @Desc:
 */
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "../../../others/react-redux";
import { increment, decrement, reset } from "store/actions/counter";
import Nest from "./nestedC";

const mapStateToProps = (state, ownprops) => {
  // ownprops 是组件自身接受的属性
  // console.log('ownprops',ownprops)
  console.log("执行了传入的mapStateToProps函数");
  return {
    counter: state.counter,
  };
};

const mapDispatchToProps = (dispatch) => {
  // return {
  //   increment: () => {
  //     dispatch(increment());
  //   },
  //   decrement: () => {
  //     dispatch(decrement());
  //   },
  //   reset: () => {
  //     dispatch(reset());
  //   },
  // };
  // return bindActionCreators({
  //   increment,decrement,reset
  // },dispatch)
};
// {increment,decrement,reset}
// (state,props,me)=>{
//   return {...state,...props, ...me}
// }
@connect(mapStateToProps, { increment, decrement, reset }, undefined, {
  withRef: true,
})
export default class Counter extends Component {
  state = {
    name: "xuxia",
  };
  render() {
    console.log("this.props", this.props);
    const { increment, decrement, reset, counter } = this.props;
    return (
      <div>
        {/* <Name name={this.state.name}></Name> */}
        <div>当前计数为(显示redux计数){counter.count}</div>
        <button
          onClick={() => {
            increment();
            console.log("调用自增函数");
          }}
        >
          自增
        </button>
        <button
          onClick={() => {
            decrement();
            console.log("调用自减函数");
          }}
        >
          自减
        </button>
        <button
          onClick={() => {
            reset();
            console.log("调用重置函数");
          }}
        >
          重置
        </button>
        <Nest nestName="nest" />
      </div>
    );
  }
}
