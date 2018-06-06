import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
});

export const InputField = (props) => {
  const { classes } = props;

  return (
    <FormControl error={props.error} className={classes.formControl}>
      <InputLabel htmlFor={props.id}>{props.label}</InputLabel>
      <Input
        id={props.id}
        type={props.type}
        value={props.value}
        onChange={props.handleChange}
      />
      <FormHelperText id={`${props.id}-help-text`}>
        { props.error ? props.errorMessage : null }
      </FormHelperText>
    </FormControl>
  );
};


InputField.propTypes = {
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

InputField.defaultProps = {
  error: false,
  errorMessage: '',
};

export default withStyles(styles)(InputField);
