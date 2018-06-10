import React from 'react';
import PropTypes from 'prop-types';

import SuccessSnack from '../SuccessSnack';

const Snackbars = props => (
  <React.Fragment>
    { props.deleteSuccess || props.archiveSuccess
      ?
        <SuccessSnack
          success={props.deleteSuccess || props.archiveSuccess}
          message={
            props.deleteSuccess
              ?
                'Conversation was successfully deleted.'
              :
                'Conversation was successfully archived.'
          }
          handleClose={props.handleClose}
        />
      :
        null
    }
  </React.Fragment>
);

Snackbars.propTypes = {
  deleteSuccess: PropTypes.bool,
  archiveSuccess: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};

Snackbars.defaultProps = {
  deleteSuccess: false,
  archiveSuccess: false,
};

export default Snackbars;
