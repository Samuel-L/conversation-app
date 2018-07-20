import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  success: {
    backgroundColor: green[600],
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

const SuccessSnack = (props) => {
  const { classes, message } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      open={props.success}
      onClose={props.handleClose}
      autoHideDuration={5000}
    >
      <SnackbarContent
        className={classes.success}
        aria-describedby="success-snackbar"
        message={
          <span id="success-snackbar" className={classes.message}>
            <CheckCircleIcon className={classes.icon} />
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

SuccessSnack.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  message: PropTypes.string.isRequired,
  success: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default withStyles(styles)(SuccessSnack);
