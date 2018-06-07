import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { siteTitle } from '../../utils/helpers';
import { logout } from '../../redux-modules/auth';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
};

export const Header = (props) => {
  const { classes, isLoggedIn } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            { siteTitle }
          </Typography>
          { isLoggedIn
              ?
                <Button color="inherit" onClick={() => { props.logout(); }}>Log out</Button>
              :
                null
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  logout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
};

Header.defaultProps = {
  isLoggedIn: false,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
)(Header);
