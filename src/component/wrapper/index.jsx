import React, {Component} from 'react';

export default class Wrapper extends Component {
    render() {
      return (
        <div style={{padding:"20px"}}>
            {this.props.children}
        </div>
      );
    }
  }