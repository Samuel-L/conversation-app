import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import CreateConversation from '../../components/CreateConversation';
import Inbox from '../../components/Inbox';

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <CreateConversation />
          <Inbox />
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;
