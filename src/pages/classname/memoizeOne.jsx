import React, { Component, Fragment } from 'react';
import memoizeOne from 'memoize-one';

export default class TableList extends Component {
  state = { filterText: "",text:''};

  handleChange = event => {
    this.setState({ filterText: event.target.value });
  };
  handleInput = event => {
    this.setState({ text: event.target.value });
  };
  
  filter = memoizeOne(
    (list, filterText) => {
        console.log('计算')
        return list.filter(item => item.text.includes(filterText))
    }
  );
  
  render() {
    const { list, title } = this.props;
    //当list和filterName不变时，filteredList返回值不变
    const filteredList = this.filter(list, this.state.filterText);
    return (
      <Fragment>
        <input onChange={this.handleChange} value={this.state.filterText} />
        <input onChange={this.handleInput} />
      	<ul>{filteredList.map(item => <li key={item.id}>{item.text}</li>)}</ul>
      </Fragment>
    )
  }
}