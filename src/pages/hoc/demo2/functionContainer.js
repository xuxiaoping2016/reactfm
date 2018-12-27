import React, { Component } from 'react';

const addFunc = WrappedComponent => class extends Component {
    handleClick() {
      console.log('click');
    }
  
    render() {
      const props = {
        ...this.props,
        handleClick: this.handleClick,
      };
      return <WrappedComponent {...props} />;
    }
};
  
const addStyle = WrappedComponent => class extends Component {
    render() {
      return (<div style={{ color: '#76d0a3' }}>
        <WrappedComponent {...this.props} />
      </div>);
    }
};

class Usual extends Component {
    render() {
      console.log(this.props, 'Usual props');
      return (
        <div>
          Usual
        </div>
      )
    }
}

const WrappenComponent = addStyle(addFunc(Usual));
  
export default class WrappedUsual extends Component {
    render() {
      console.log(this.props, 'props');
      return (<div>
        <WrappenComponent />
      </div>);
    }
}

// //usual
// class Usual extends Component {
//     render() {
//       console.log(this.props, 'props');
//       return <div>
//         Usual
//       </div>
//     }
//   };
 
  
//   class StyleContainer extends Component {
  
//     render() {
//       return (<div style={{ color: '#76d0a3' }}>
//         <div>container</div>
//         <Usual {...this.props} />
//       </div>);
//     }
//   }
  
//   class FuncContainer extends Component {
//     handleClick() {
//       console.log('click');
//     }
  
//     render() {
//       const props = {
//         ...this.props,
//         handleClick: this.handleClick,
//       };
//       return (<StyleContainer {...props} />);
//     }
//   }
  
//   export default FuncContainer;