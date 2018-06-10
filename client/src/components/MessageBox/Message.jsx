import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2,
  },
});

const Message = props => (
  <div className={props.classes.root}>
    <Typography>Message: {props.message.body}</Typography>
    <Typography>Sent by: {props.message.sent_by} ({props.message.created_at})</Typography>
  </div>
);

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number,
    sent_by: PropTypes.string,
    sent_to: PropTypes.string,
    conversation: PropTypes.number,
    created_at: PropTypes.string,
    is_read: PropTypes.bool,
    body: PropTypes.string,
  }).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(Message);
