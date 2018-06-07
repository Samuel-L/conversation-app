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
import { registerUser, removeError } from '../../redux-modules/register';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    justifySelf: 'flex-end',
  },
});

export class RegisterForm extends Component {
  state = {
    username: '',
    password: '',
    confirmPassword: '',
    errors: {
      username: { error: false, message: '' },
      password: { error: false, message: '' },
      confirmPassword: { error: false, message: '' },
    },
  };

  stateFieldIsPopulated = (field) => {
    if (field) {
      return true;
    }
    return false;
  };

  validatePassword = (password, confirmPassword) => (
    password === confirmPassword && password !== '' && confirmPassword !== ''
  );

  validateForm = (username, password, confirmPassword) => {
    const passwordIsConfirmed = this.validatePassword(password, confirmPassword);
    let errors = {
      username: { error: false, message: '' },
      password: { error: false, message: '' },
      confirmPassword: { error: false, message: '' },
    };

    if (username && passwordIsConfirmed) {
      return true;
    } else if (!passwordIsConfirmed) {
      const error = { error: true, message: 'The passwords cannot be empty and needs to match.' };
      errors = { ...errors, password: error, confirmPassword: error };
    } else {
      errors = {
        ...errors,
        username: { error: !this.stateFieldIsPopulated(username), message: 'This field is required.' },
        password: { error: !this.stateFieldIsPopulated(password), message: 'This field is required.' },
        confirmPassword: { error: !this.stateFieldIsPopulated(confirmPassword), message: 'This field is required.' },
      };
    }

    this.setState({ errors });
    return false;
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password, confirmPassword } = this.state;
    if (this.validateForm(username, password, confirmPassword)) {
      this.props.register(username, password);
    }
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSnackbarClose = () => {
    this.props.removeError();
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
            <InputField
              error={this.state.errors.confirmPassword.error}
              errorMessage={this.state.errors.confirmPassword.message}
              id="confirmPassword"
              label="Confirm password"
              type="password"
              value={this.state.confirmPassword}
              handleChange={this.handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            { !this.props.loading
              ?
                <Button type="submit" variant="raised" color="primary" className={classes.button}>
                  Register
                </Button>
              :
                <CircularProgress />
            }
          </Grid>
        </Grid>
        <Snackbars
          usernameTaken={this.props.usernameTaken}
          error={this.props.error}
          success={this.props.success}
          handleClose={this.handleSnackbarClose}
        />
      </form>
    );
  }
}

RegisterForm.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  register: PropTypes.func.isRequired,
  removeError: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.number,
  usernameTaken: PropTypes.bool,
};

RegisterForm.defaultProps = {
  loading: false,
  success: false,
  error: null,
  usernameTaken: false,
};

const mapStateToProps = state => ({
  loading: state.registerReducer.registering,
  success: state.registerReducer.registered,
  error: state.registerReducer.error,
  usernameTaken: state.registerReducer.usernameTaken,
});

const mapDispatchToProps = dispatch => ({
  register: (username, password) => dispatch(registerUser(username, password)),
  removeError: () => dispatch(removeError()),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(RegisterForm);
