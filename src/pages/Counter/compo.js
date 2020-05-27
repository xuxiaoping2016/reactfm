import React, { Component } from "react";
import PT from "prop-types";

export default class Name extends Component {
  static propTypes = {
    name: PT.string,
  };
  render() {
    return <div>姓名：{this.props.name}</div>;
  }
}
