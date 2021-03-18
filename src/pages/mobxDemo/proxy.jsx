import React, { Component } from 'react';
import { observer} from 'mobx-react'

@observer
export default class App extends React.Component {
  state = {
    a: 0,
  };
  add = () => {
    this.setState({
      a: this.state.a + 1
    });
  };
  render() {
    return (
      <div>
        {this.state.a}
        <button onClick={this.add} style={{marginLeft:"10px"}}>+1</button>
        <PureItem />
      </div>
    );
  }
}

@observer
class PureItem extends React.Component {

  render() {
    console.log('PureItem的render触发了');
    return (
      <div>你们的事情跟我没关系</div>
    );
  }
}