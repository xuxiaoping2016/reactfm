import React from "react";
import { themes, signedInUser } from "./context";

// Theme context, default to light theme
const ThemeContext = React.createContext(themes.light);

// Signed-in user context
const UserContext = React.createContext({
  name: "Guest",
});

class App extends React.Component {
  render() {
    // App component that provides initial context values
    return (
      <ThemeContext.Provider value={themes.dark}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      {/* <Sidebar /> */}
      <Content />
    </div>
  );
}

// A component may consume multiple contexts
function Content() {
  return <ThemeContext.Consumer>{InnerApp}</ThemeContext.Consumer>;
}

const InnerApp = (theme) => {
  console.log("theme", theme);
  return (
    <UserContext.Consumer>
      {(user) => <ProfilePage user={user} theme={theme} />}
    </UserContext.Consumer>
  );
};

const ProfilePage = ({ user, theme }) => (
  <div style={{ background: theme.background }}>{user.name}</div>
);

export default App;
