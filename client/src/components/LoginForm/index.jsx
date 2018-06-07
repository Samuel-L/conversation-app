import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import InputField from '../InputField';
import Snackbars from './Snackbars';
import { login, resetState } from '../../redux-modules/auth';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

export class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errors: {
      username: { error: false, message: '' },
      password: { error: false, message: '' },
    },
  };

  stateFieldIsPopulated = field => (
    field !== ''
  );

  validateForm = (username, password) => {
    const usernameIsPopulated = this.stateFieldIsPopulated(username);
    const passwordIsPopulated = this.stateFieldIsPopulated(password);
    const errors = {
      username: { error: !usernameIsPopulated, message: 'This field is required.' },
      password: { error: !passwordIsPopulated, message: 'This field is required.' },
    };
    this.setState({ errors });

    if (usernameIsPopulated && passwordIsPopulated) {
      return true;
    }
    return false;
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const formIsValidated = this.validateForm(username, password);

    if (formIsValidated) {
      this.props.login(username, password);
    }
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSnackbarClose = () => {
    this.props.resetState();
  };

  render() {
    const { classes } = this.props;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <InputField
              error={this.state.errors.username.error}
              errorMessage={this.state.errors.username.message}
              id="username"
              label="Username"
              type="text"
              value={this.state.username}
              handleChange={this.handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <InputField
              error={this.state.errors.password.error}
              errorMessage={this.state.errors.password.message}
              id="password"
              label="Password"
              type="password"
              value={this.state.password}
              handleChange={this.handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            { !this.props.loading
              ?
                <Button type="submit" variant="raised" color="primary" className={classes.button}>
                  Login
                </Button>
              :
                <CircularProgress />
            }
          </Grid>
        </Grid>
        <Snackbars
          error={this.props.error}
          success={this.props.success}
          handleClose={this.handleSnackbarClose}
        />
      </form>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  login: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.number,
};

LoginForm.defaultProps = {
  loading: false,
  success: false,
  error: null,
};

const mapStateToProps = state => ({
  loading: state.authReducer.loggingIn,
  success: state.authReducer.loggedIn,
  error: state.authReducer.error,
});

const mapDispatchToProps = dispatch => ({
  login: (username, password) => dispatch(login(username, password)),
  resetState: () => dispatch(resetState()),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(LoginForm);
