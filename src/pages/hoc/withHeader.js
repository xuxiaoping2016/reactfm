import React, {Component} from 'react';


// export default function withHeader(props) {
//   return (WrappedComponent) => {
//     return class HOC extends Component {
//       render() {
//         console.log(this.props)
//         return <div>
//           <div className="demo-header">
//             {props.tit}
//           </div>
//           <WrappedComponent {...this.props}/>
//         </div>
//       }
//     }
//   }
// }


export default (props) => (WrappedComponent) => class HOC extends Component {
  render() {
    console.log(this.props)
    return <div>
      <div className="demo-header">
        {props.tit}
      </div>
      <WrappedComponent {...this.props}/>
    </div>
  }
}