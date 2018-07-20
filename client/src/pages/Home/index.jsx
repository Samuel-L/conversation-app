import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { siteTitle } from '../../utils/helpers';
import Login from '../../components/LoginForm';
import Register from '../../components/RegisterForm';

const styles = theme => ({
  root: {
    flex: '1',
    [theme.breakpoints.up('md')]: {
      height: '500px',
    },
  },
});

export class Home extends Component {
  state = {
    showLoginComponent: true,
  }

  handleChangeComponent = () => {
    this.setState({ showLoginComponent: !this.state.showLoginComponent });
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container alignItems="center" className={classes.root}>
        <Grid item xs={12} md={6}>
          <Typography
            variant="headline"
            align="center"
            gutterBottom
          >
            With { siteTitle } you can send chat with your friends.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          { this.state.showLoginComponent
            ?
              <Login handleChangeComponent={this.handleChangeComponent} />
            :
              <Register handleChangeComponent={this.handleChangeComponent} />
          }
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Home);
