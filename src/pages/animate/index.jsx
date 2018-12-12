import React, { Component } from 'react';
import anime from 'animejs';

import './css/index.less'

export default class Index extends Component {
    componentDidMount(){
        // var cssSelector = anime({
        //     targets: '#cssSelector .el',
        //     translateX: 250
        //   });
    }

  render() {
    return (
    <div id="cssSelector">
        <div className="line">
          <div className="square el"></div>
        </div>
      </div>
    )
  }
}