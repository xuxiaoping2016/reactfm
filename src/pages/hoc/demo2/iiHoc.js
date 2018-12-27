 // usual
 import React, { Component } from 'react';

const iiHoc = WrappedComponent => class extends WrappedComponent {
    render() {
      console.log(this.state, 'state');
      return super.render();
    }
}
 
 @iiHoc
 export default class Usual extends Component {
 
   constructor() {
     super();
     this.state = {
       usual: 'usual',
     }
   }
 
   componentDidMount() {
     console.log('didMount')
   }
 
   render() {
     return (
       <div>
         Usual
       </div>
     )
   }
 }
 