import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';

import CreateConversation from '../../components/CreateConversation';

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <CreateConversation />
        </Grid>
      </Grid>
    );
  }
}

export default Dashboard;
