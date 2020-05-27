import React from "react";
import { Button } from "antd";

// class App extends React.Component {
//     render() {
//       return <Toolbar theme="primary" />;
//     }
//   }

//   function Toolbar(props) {
//     // The Toolbar component must take an extra "theme" prop
//     // and pass it to the ThemedButton. This can become painful
//     // if every single button in the app needs to know the theme
//     // because it would have to be passed through all components.
//     return (
//       <div>
//         <ThemedButton theme={props.theme} />
//       </div>
//     );
//   }

//   class ThemedButton extends React.Component {
//     render() {
//       return <Button type={this.props.theme} >anniu</Button>;
//     }
//   }

const ThemeContext = React.createContext("primary");

class App extends React.Component {
  render() {
    // Use a Provider to pass the current theme to the tree below.
    // Any component can read it, no matter how deep it is.
    // In this example, we're passing "dark" as the current value.
    return (
      <ThemeContext.Provider value="default">
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
  // Assign a contextType to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  static contextType = ThemeContext;
  render() {
    console.log(this.context);
    return <Button type={this.context}>context 按钮</Button>;
  }
}
export default App;
