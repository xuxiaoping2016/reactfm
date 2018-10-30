/**
 * react-motion 的测试
 * 简单的demo Motion
 */
import React, {Component} from 'react'
import MotionDemo from './motionDemo'
import StaggeredMotionDemo from './staggeredMotionDemo'
import TransitionMotionDemo from './transitionMotion'


import Demo1 from './demo1'
import Chat from './demo1-chat-heads'


class Test1 extends Component {
 
  render() {
    return (
      <div>
       <MotionDemo></MotionDemo>

       <StaggeredMotionDemo/>

       <TransitionMotionDemo/>

       <Demo1></Demo1>
       <Chat></Chat>
      </div>
    )
  }
}

export default Test1