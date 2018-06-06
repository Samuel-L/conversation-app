import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { siteTitle } from '../../utils/helpers';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
};

const Header = (props) => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            { siteTitle }
          </Typography>
          { true ? <Button color="inherit">Log out</Button> : null /* change 'true' to isLoggedIn */ }
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Header);
