import React, { Component } from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';


import { createConversation, resetState } from '../../redux-modules/conversation-creator';
import Snackbars from './Snackbars';
import InputField from '../InputField';

const styles = theme => ({
  buttonGrid: {
    alignSelf: 'center',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class CreateConversation extends Component {
  state = {
    topic: '',
    counterpartUsername: '',
    errors: {
      topic: { error: false, message: '' },
      counterpartUsername: { error: false, message: '' },
    },
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  stateFieldIsPopulated = field => (
    field !== ''
  );

  validateForm = (topic, username) => {
    const topicIsPopulated = this.stateFieldIsPopulated(topic);
    const usernameIsPopulated = this.stateFieldIsPopulated(username);

    const errors = {
      topic: { error: !topicIsPopulated, message: 'This field is required.' },
      counterpartUsername: { error: !usernameIsPopulated, message: 'This field is required.' },
    };
    this.setState({ errors });

    if (topicIsPopulated && usernameIsPopulated) {
      return true;
    }
    return false;
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { topic, counterpartUsername } = this.state;
    const formIsValidated = this.validateForm(topic, counterpartUsername);

    if (formIsValidated) {
      this.props.createConversation(topic, counterpartUsername);
    }
  };

  handleSnackbarClose = () => {
    this.props.resetState();
  };

  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleFormSubmit}>
        <Grid container>
          <Grid item xs={12} md={5}>
            <InputField
              error={this.state.errors.topic.error}
              errorMessage={this.state.errors.topic.message}
              id="topic"
              label="Topic"
              type="text"
              value={this.state.topic}
              handleChange={this.handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <InputField
              error={this.state.errors.counterpartUsername.error}
              errorMessage={this.state.errors.counterpartUsername.message}
              id="counterpartUsername"
              label="Username"
              type="text"
              value={this.state.counterpartUsername}
              handleChange={this.handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={2} className={classes.buttonGrid}>
            { !this.props.creating
              ?
                <Button type="submit" variant="raised" color="primary" className={classes.button}>
                  Create
                </Button>
              :
                <CircularProgress />
            }
          </Grid>
        </Grid>
        <Snackbars
          error={this.props.error}
          success={this.props.created}
          handleClose={this.handleSnackbarClose}
        />
      </form>
    );
  }
}

CreateConversation.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  createConversation: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  creating: PropTypes.bool,
  created: PropTypes.bool,
  error: PropTypes.number,
};

CreateConversation.defaultProps = {
  creating: false,
  created: false,
  error: null,
};

const mapStateToProps = state => ({
  creating: state.conversationCreatorReducer.creating,
  created: state.conversationCreatorReducer.created,
  error: state.conversationCreatorReducer.error,
});

const mapDispatchToProps = dispatch => ({
  createConversation: (topic, username) => dispatch(createConversation(topic, username)),
  resetState: () => dispatch(resetState()),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(CreateConversation);
