/**
 * react-motion 的测试
 * 简单的demo Motion
 */
import React, {Component} from 'react'
import MotionDemo from './motionDemo'
import StaggeredMotionDemo from './staggeredMotionDemo'
import TransitionMotionDemo from './transitionMotion'


class Test1 extends Component {
 
  render() {
    return (
      <div>
       <MotionDemo></MotionDemo>

       <StaggeredMotionDemo/>

       <TransitionMotionDemo/>
      </div>
    )
  }
}

export default Test1