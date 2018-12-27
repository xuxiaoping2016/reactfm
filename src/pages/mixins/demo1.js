import React, { Component} from 'react';

var LogMixin = {
  componentWillMount: function () {
      console.log('Component will mount');
  },
  componentDidMount: function () {
      console.log('Component did mount');
  }
};

class AComponent extends Component{
  // mixins= [LogMixin]
  render() {
      return (
          <div>AComponent</div>
      )
  }
}


class BComponent extends Component{
  // mixins: [LogMixin],
  render() {
      return (
          <div>BComponent</div>
      )
  }
}

export { AComponent, BComponent }