import React, { Component } from 'react';
import img from '../../images/wait.png';
import favicon from '../../images/warn.png';

class Cat extends Component {
    render() {
      const {mouse} = this.props
      return (
        <img src={img} style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
      );
    }
}

class Cat2 extends Component {
    render() {
      const {mouse} = this.props
      return (
        <img src={favicon} style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
      );
    }
}

class MouseWithCat extends Component {
    constructor(props) {
      super(props);
      this.state = { x: 0, y: 0 };
    }
  
    handleMouseMove = (event) => {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    }
  
    render() {
        const {x,y} = this.state;
        const { render } = this.props;
      return (
        <div style={{ height: '300px' }} onMouseMove={this.handleMouseMove}>
          {render(this.state)}
        </div>
      );
    }
  }
  
  export default class MouseTracker extends Component {
    render() {
      return (
        <div>
          <h1>Move the mouse around!</h1>
          <MouseWithCat render={data=><Cat mouse={data} />}/>

          <MouseWithCat render={data=><Cat2 mouse={data} />}/>
        </div>
      );
    }
  }