import React, {Component} from 'react';

// HOCInheritance.js
let getDisplayName = (component)=> {
    return component.displayName || component.name || 'Component'
  }
  
  // (1)
const HOCInheritance = WrapperComponent =>
  class Inheritance extends WrapperComponent {
    static displayName = `Inheritance(${getDisplayName(WrapperComponent)})`
    // (2)
    componentWillMount() {
      this.state.name = 'zhangsan'
      this.state.age = 18
    }
    render() {
      // (4)
      return super.render()
    }
    componentDidMount() {
      super.componentDidMount()
      document.getElementById('h1').style.color = 'indianred'
    }
}


// main2.js
class Main2 extends React.Component {
  state = {
    name: 'wanger'
  }
  render() {
    return (
      <main>
        <h1 id="h1">summary of </h1>
        <p>
          my name is {this.state.name},
          I'm {this.state.age}
        </p>
      </main>
    )
  }

  componentDidMount() {
    document.getElementById('h1').innerHTML += this.state.name
  }
}

const InheritanceInstace = HOCInheritance(Main2)
export default InheritanceInstace