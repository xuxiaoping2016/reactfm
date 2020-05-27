import React from "react";
import { ThemeContext } from "./context";

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    const { theme, toggleTheme } = this.context;
    return (
      <button
        {...props}
        onClick={toggleTheme}
        style={{ backgroundColor: theme.background }}
      />
    );
  }
}
ThemedButton.contextType = ThemeContext;

export default ThemedButton;
