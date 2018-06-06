import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  icon: {
    fontSize: 20,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

const ErrorSnack = (props) => {
  const { classes, message } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={props.error}
      onClose={props.handleClose}
      autoHideDuration={5000}
    >
      <SnackbarContent
        className={classes.error}
        aria-describedby="error-snackbar"
        message={
          <span id="error-snackbar" className={classes.message}>
            <ErrorIcon className={classes.icon} />
            { message }
          </span>
        }
        action={
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={props.handleClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        }
      />
    </Snackbar>
  );
};

ErrorSnack.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  message: PropTypes.string.isRequired,
  error: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(ErrorSnack);
