import React, {Component} from 'react';
import HorizontalLoginForm from './HorizontalLoginForm'
import SetFieldsCom from './setFields'
import Register from './register'

class Contract extends React.Component {
 componentDidMount(){

    //  console.log('looooo',this.form)
 }

 
  render() {
    return (
      <div>
        {/* <SetFieldsCom/> */}
        {/* <HorizontalLoginForm wrappedComponentRef={(form) => this.form = form}/> */}
        <Register/>
      </div>
  );
  }
}
export default Contract;