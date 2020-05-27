import React, { Component } from "react";

export default class Page1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      textAreaValue: "请撰写一篇关于你喜欢的 DOM 元素的文章.",
      selectedValue: "coconut",
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };
  handleChange2 = (event) => {
    this.setState({ textAreaValue: event.target.value });
  };
  handleChange3 = (event) => {
    this.setState({ selectedValue: event.target.value });
  };

  handleSubmit = (event) => {
    console.log(
      "提交的名字: " +
        this.state.value +
        " " +
        this.state.textAreaValue +
        " " +
        this.state.selectedValue
    );
    event.preventDefault();
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <div>
          文章:
          <textarea
            value={this.state.textAreaValue}
            onChange={this.handleChange2}
          />
        </div>
        <div>
          选择你喜欢的风味:
          <select
            value={this.state.selectedValue}
            onChange={this.handleChange3}
          >
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </div>
        <input type="submit" value="提交" />
      </form>
    );
  }
}
