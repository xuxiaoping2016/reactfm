import React from 'react';
import Toolbar from './Toolbar';
import { themes, ThemeContext } from './context';

export default function App() {
    return (
      <ThemeContext.Provider value={themes.dark}>
        <Toolbar />
      </ThemeContext.Provider>
    );
  }

  
  
  