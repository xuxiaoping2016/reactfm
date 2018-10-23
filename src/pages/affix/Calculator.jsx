import React, {Component} from 'react';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};



function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}


class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value)
  }

  render() {
    const { temperature, scale} = this.props;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}


export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: '',
      scale:"c"
    };
  }

  toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
  }
  
 toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
  }
  
  tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }

  handleCelsiusChange = (temperature) => {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange = (temperature) => {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const { temperature, scale } = this.state;
    const { tryConvert, toCelsius, toFahrenheit } = this;

    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput scale="c" temperature = {celsius} onTemperatureChange = {this.handleCelsiusChange}/>
        <TemperatureInput scale="f" temperature = {fahrenheit} onTemperatureChange = {this.handleFahrenheitChange}/>
        <BoilingVerdict celsius={parseFloat(celsius)}/>
      </div>
    );
  }
}