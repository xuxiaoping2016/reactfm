import React, {Component} from 'react';
import Transition from './trans'

export default class Transitiondemo extends Component {

  state= { in: false };

  toggleEnterState = () => {
    this.setState({ in: !this.state.in });
  }

  render() {
    return (
      <div>
        <Transition in={this.state.in} timeout={500} />
        <button onClick={this.toggleEnterState}>Click to Enter</button>
      </div>
    );
  }
}