import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import Parser from '../../utils/parser';

const styles = theme => ({
  image: {
    [theme.breakpoints.up('md')]: {
      flexBasis: '10%',
    },
    [theme.breakpoints.down('md')]: {
      flexBasis: '5%',
    },
  },
  center: {
    alignSelf: 'center',
  },
  topic: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '15%',
    marginLeft: theme.spacing.unit,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  messagePreview: {
    flexBasis: '50%',
  },
  timestamp: {
    flexBasis: '25%',
  },
  button: {
    margin: theme.spacing.unit * 2,
  },
  deleteButton: {
    backgroundColor: red[500],
    color: 'white',
    '&:hover': {
      backgroundColor: red[700],
      color: 'white',
    },
  },
});

const Item = (props) => {
  const { classes, conversation } = props;

  return (
    <ExpansionPanel
      expanded={props.expanded === conversation.id}
      onChange={props.handleChange(conversation.id)}
    >
      <ExpansionPanelSummary>
        <img src={conversation.avatar} alt="user-avatar" className={classes.image} />
        <Typography className={classnames(classes.topic, classes.center)}>
          {conversation.topic}
        </Typography>
        <Typography className={
          classnames(classes.messagePreview, classes.center, classes.secondaryHeading)
          }
        >
          {conversation.messagePreview}
        </Typography>
        <Typography className={
          classnames(classes.timestamp, classes.center, classes.secondaryHeading)
          }
        >
          {conversation.lastTimestamp}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="raised"
              className={classnames(classes.button, classes.deleteButton)}
              onClick={() => { props.handleDelete(conversation.id); }}
            >
              Delete
            </Button>
            <Button
              variant="raised"
              className={classes.button}
              onClick={() => { props.handleArchive(conversation.id); }}
            >
              Archive
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            Map messages here. Give this grid a max height and scroll.
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

Item.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleArchive: PropTypes.func.isRequired,
  conversation: PropTypes.instanceOf(Parser).isRequired,
  expanded: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

Item.defaultProps = {
  expanded: null,
};

export default withStyles(styles)(Item);
