/**
 * react-motion 的测试
 * 简单的demo Motion
 */
import React, {Component} from 'react'
import {Motion, spring, presets} from 'react-motion'

import './test.less'

class MotionDemo extends Component {
  state = {
    left: 0
  }

  clickHandler() {
    let targetX = 0
    if(this.state.left === 0) {
      targetX = 200
    } else {
      targetX = 0
    }

    this.setState({
      left: targetX
    })
  }

  componentDidMount() {
    this.clickHandler()
  }

  render() {
    console.log(spring(this.state.left, presets.wobbly))
    return (
      <div className="container">
        <Motion style={{x: spring(this.state.left, presets.wobbly)}}>
          {interpolatingStyle => {
            // debugger
            // console.log(interpolatingStyle)
            return (
              <div style={{transform: `translateX(${interpolatingStyle.x}px)`}} className='box'></div>
            )
          }}
        </Motion>
        <button onClick={this.clickHandler.bind(this)}>run</button>
      </div>
    )
  }
}

export default MotionDemo