import React, { Component} from 'react';

export default class NameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name :''
    }
  }

  handleSubmit = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  render() {
    return (
      <div>
        <div>input 表单</div>
        <div>当前输入名字:{this.state.name}</div>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleSubmit}/>
        </label>
      </div>
    );
  }
}