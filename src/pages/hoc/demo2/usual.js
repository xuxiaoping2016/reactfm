import React, { Component } from 'react';

const simpleHoc = WrappedComponent => {
    console.log('simpleHoc');
    return class extends Component {
      render() {
          console.log(this.props,"...//")
        return <WrappedComponent {...this.props}/>
      }
    }
}

@simpleHoc
class Usual extends Component {
  render() {
    console.log(this.props, 'props');
    return (
      <div>
        Usual
      </div>
    )
  }
}
export default Usual;