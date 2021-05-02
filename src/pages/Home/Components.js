/*
 * @Author: xiaoping.xu
 * @Date: 2021-04-20 10:15:57
 * @LastEditors: xiaoping.xu
 * @LastEditTime: 2021-04-26 10:22:23
 * @Desc: 
 */
// import React, { Component } from "../../../others/react";
import React, { Component } from 'react'

export default class Co extends Component {
  getFile =(e)=> {
    console.log(e.target.files)
  }
  render() {
    // console.log(this.props.children)
    return (
      <div>
        {React.Children.map(this.props.children, (item) => {
          return <div>{item}</div>;
          // return ([<div>{item}</div>,[<div>{item}</div>,<div>{item}</div>]])
        })}
        <input type="file" onChange={this.getFile}></input>
      </div>
    );
  }
}
