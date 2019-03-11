import * as React from 'react';

import './App.css';
import Hello from './pages/Hello'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <p>ts 学习</p>
        <Hello name="Im"/>
      </div>
    );
  }
}

export default App;
