import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    return (
      <form>
        <Grid container>
          <Grid item xs={12} md={5}>
            <InputField
              error={false}
              errorMessage="Temp"
              id="topic"
              label="Topic"
              type="text"
              value={this.state.topic}
              handleChange={this.handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <InputField
              error={false}
              errorMessage="Temp"
              id="counterpartUsername"
              label="Username"
              type="text"
              value={this.state.counterpartUsername}
              handleChange={this.handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={2} className={classes.buttonGrid}>
            <Button type="submit" variant="raised" color="primary" className={classes.button}>
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default withStyles(styles)(CreateConversation);
