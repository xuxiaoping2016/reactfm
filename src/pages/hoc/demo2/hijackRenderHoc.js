import React, { Component } from 'react';

const hijackRenderHoc = config => WrappedComponent => class extends WrappedComponent {

    render() {
        const { style = {} } = config;
        const elementsTree = super.render();
        console.log(elementsTree, 'elementsTree');
        if (config.type === 'add-style') {
        return <div style={{...style}}>
            {elementsTree}
        </div>;
        }
        return elementsTree;
    }
};
  //usual
  @hijackRenderHoc({type: 'add-style', style: { color: 'red'}})
  export default class Usual extends Component {
 
    constructor() {
      super();
      this.state = {
        usual: 'usual',
      }
    }
  
    componentDidMount() {
      console.log('Usual didMount')
    }
  
    render() {
      return (
        <div>
          Usual
        </div>
      )
    }
}