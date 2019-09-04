import React from 'react';
import { Button } from 'antd';


const ThemeContext = React.createContext('primary');

class App extends React.Component {
  render() {
    return (
      <Toolbar />
      // <ThemeContext.Provider value="danger">
      //   <Toolbar />
      // </ThemeContext.Provider>
    );
  }
}
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component {
  static contextType = ThemeContext;
  render() {
      console.log(this.context)
    return <Button type={this.context}>context 按钮</Button>;
  }
}
  export default App;