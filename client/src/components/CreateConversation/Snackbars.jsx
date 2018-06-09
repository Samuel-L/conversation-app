import React from 'react';
import PropTypes from 'prop-types';
import HttpStatus from 'http-status-codes';

import ErrorSnack from '../ErrorSnack';
import SuccessSnack from '../SuccessSnack';

const Snackbars = props => (
  <React.Fragment>
    { props.error === HttpStatus.BAD_REQUEST
      ?
        <ErrorSnack
          message="That user does not exist."
          error={props.error === HttpStatus.BAD_REQUEST}
          handleClose={props.handleClose}
        />
      :
        null
    }
    { props.error !== HttpStatus.BAD_REQUEST
      ?
        <ErrorSnack
          message="Something went wrong, please try again"
          error={props.error !== null}
          handleClose={props.handleClose}
        />
      :
        null
    }
    { props.success
      ?
        <SuccessSnack
          success={props.success}
          message="Conversation has been created."
          handleClose={props.handleClose}
        />
      :
        null
    }
  </React.Fragment>
);

Snackbars.propTypes = {
  error: PropTypes.number,
  success: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};

Snackbars.defaultProps = {
  error: null,
  success: false,
};

export default Snackbars;
