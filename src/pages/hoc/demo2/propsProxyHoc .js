import React, { Component} from 'react';

const propsProxyHoc = WrappedComponent => class extends Component {

  handleClick() {
    console.log('click');
  }

  render() {
    return (<WrappedComponent
      {...this.props}
      handleClick={this.handleClick}
    />);
  }
};

@propsProxyHoc
class Usual extends Component {
  render() {
    console.log(this.props, 'props');
    const { handleClick } = this.props;
    return (
      <div onClick= {handleClick}>
        Usual
      </div>
    )
  }
}

export default Usual