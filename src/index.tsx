import { createMuiTheme } from '@material-ui/core';
import { purple, teal } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import './styles/semantic.min.css';
import './index.css';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: teal,
    error: {
      main: '#CF6679',
    },
    type: 'dark',
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
