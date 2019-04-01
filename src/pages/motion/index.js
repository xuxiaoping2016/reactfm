import React, { Component } from 'react';
import Demo0 from './demo0'
import Demo1 from './StaggeredMotion'
import Demo2 from './transitionMotion'
import Demo1Chat from './demo1_chat_heads'
import Demo2DraggableBall from './demo2-draggable-balls'
import Demo3Todomvc from './demo3-todomvc'

class Test1 extends Component {
   
    render() {
      return (
        <div className="container">
          <Demo0/>
          <Demo1/>
          <Demo2/>
          {/* <Demo1Chat/> */}
          {/* <Demo2DraggableBall/> */}
          <Demo3Todomvc/>
        </div>
      )
    }
  }
  
  export default Test1