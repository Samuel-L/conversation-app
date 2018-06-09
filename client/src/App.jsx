import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles/';
import blueGrey from '@material-ui/core/colors/blueGrey';
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';

import Header from './components/Header';
import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';

const theme = createMuiTheme({
  palette: {
    primary: blueGrey,
    secondary: cyan,
    error: red,
  },
});

const App = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Header isLoggedIn={props.isLoggedIn} />
    { !props.isLoggedIn
      ?
        <Route exact path="/" component={HomePage} />
      :
        <Route exact path="/" component={DashboardPage} />
    }
  </MuiThemeProvider>
);

App.propTypes = {
  isLoggedIn: PropTypes.bool,
};

App.defaultProps = {
  isLoggedIn: false,
};

const mapStateToProps = state => ({
  isLoggedIn: state.authReducer.loggedIn,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
