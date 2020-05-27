// import React, { Component } from "../../../others/react";
import React, { Component } from 'react'

export default class Co extends Component {
  render() {
    // console.log(this.props.children)
    return (
      <div>
        {React.Children.map(this.props.children, (item) => {
          return <div>{item}</div>;
          // return ([<div>{item}</div>,[<div>{item}</div>,<div>{item}</div>]])
        })}
      </div>
    );
  }
}
