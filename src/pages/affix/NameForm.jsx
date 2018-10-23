import React from 'react';

export default class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ['coconut']};
    }
  
    handleChange = (event) => {
        var v = event.target.value
        console.log(v)
        const val = this.state.value;
        const index = val.indexOf(v)
      this.setState({value: event.target.value});
    }
  
    handleSubmit = (event) => {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange} multiple={true}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
          </label>
          {this.state.value}
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }