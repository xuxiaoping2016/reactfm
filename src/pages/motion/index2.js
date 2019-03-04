import React, { Component } from 'react';
import {Motion, spring, presets} from 'react-motion'

class Test1 extends Component {
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
  
      return (
        <div className="container">
          <Motion style={{x: spring(this.state.left, presets.wobbly)}}>
            {interpolatingStyle => {
              // debugger
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
  
  export default Test1