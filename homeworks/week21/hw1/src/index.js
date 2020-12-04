import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import themes from './themes';

ReactDOM.render(
  <ThemeProvider theme={themes.blue}>
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);
