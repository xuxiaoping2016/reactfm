import React, { Component} from 'react';

export default class TextareaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        content :''
    }
  }

  handleChange = (event) => {
    this.setState({
        content: event.target.value
    })
  }

  render() {
    return (
      <div>
        <div>textarea 标签</div>
        <div>当前输入名字:{this.state.content}</div>
        <textarea value={this.state.content} onChange={this.handleChange}></textarea>
      </div>
    );
  }
}