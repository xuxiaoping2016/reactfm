import React from 'react';

export const themes = {
    light: {
      foreground: '#000000',
      background: '#0f0',
    },
    dark: {
      foreground: '#ffffff',
      background: '#fff',
    },
  };
  
  export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => {},
  });