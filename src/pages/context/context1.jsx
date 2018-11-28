import React, { Component } from "react";
import {Button} from 'antd'

const ThemeContext = React.createContext('按钮默认值');
export default class App extends React.Component {
  render() {
    // Use a Provider to pass the current theme to the tree below.
    // Any component can read it, no matter how deep it is.
    // In this example, we're passing "dark" as the current value.
    return (
      <ThemeContext.Provider value="确定">
        <Toolbar />
      </ThemeContext.Provider>
    );
  }
}

// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  componentDidMount() {
    let value = this.context;
    console.log("this.context", this.context)
    /* perform a side-effect at mount using the value of MyContext */
  }

  render() {
   return (
    <ThemeContext.Consumer>
      {value => <Button {...this.props}>{value}</Button>}
    </ThemeContext.Consumer>
   )
  }
}

ThemedButton.contextType = ThemeContext;