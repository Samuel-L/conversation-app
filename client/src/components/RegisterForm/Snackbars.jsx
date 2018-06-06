import React from 'react';
import PropTypes from 'prop-types';

import ErrorSnack from '../ErrorSnack';
import SuccessSnack from '../SuccessSnack';

const Snackbars = props => (
  <React.Fragment>
    { props.usernameTaken
      ?
        <ErrorSnack
          message="That username is already taken!"
          error={props.usernameTaken}
          handleClose={props.handleClose}
        />
      :
        null
    }
    { !props.usernameTaken && props.error
      ?
        <ErrorSnack
          message="Something went wrong, please try again."
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
          message="Account was successfully created!"
          handleClose={props.handleClose}
        />
      :
        null
    }
  </React.Fragment>
);

Snackbars.propTypes = {
  usernameTaken: PropTypes.bool,
  error: PropTypes.number,
  success: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};

Snackbars.defaultProps = {
  usernameTaken: false,
  error: null,
  success: false,
};

export default Snackbars;
