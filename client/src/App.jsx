import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles/';
import blueGrey from '@material-ui/core/colors/blueGrey';
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';

import Header from './components/Header';

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: cyan,
    error: red,
  },
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Header />
  </MuiThemeProvider>
);

export default App;
