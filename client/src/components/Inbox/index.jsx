import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Parser from '../../utils/parser';
import Item from './Item';
import Snackbars from './Snackbars';
import { fetchConversations } from '../../redux-modules/conversation-fetcher';
import { deleteConversation, resetState as resetDeleteState } from '../../redux-modules/conversation-deleter';

class Inbox extends Component {
  state = {
    expanded: null,
  };

  componentDidMount() {
    this.props.fetchConversations();
  }

  handleExpansionPanel = panel => (event, expanded) => {
    this.setState({ expanded: expanded ? panel : false });
  };

  handleItemDelete = (id) => {
    this.props.deleteConversation(id);
  };

  handleItemArchive = (id) => {
    console.log(`archive id ${id}`);
  };

  handleSnackbarClose = () => {
    this.props.resetDeleteState();
  };

  render() {
    return (
      <div>
        {
          this.props.conversations.map(conversation => (
            <Item
              key={conversation.id}
              conversation={conversation}
              expanded={this.state.expanded}
              handleChange={this.handleExpansionPanel}
              handleDelete={this.handleItemDelete}
              handleArchive={this.handleItemArchive}
            />
          ))
        }
        <Snackbars
          handleClose={this.handleSnackbarClose}
          deleteSuccess={this.props.deleted}
          archiveSuccess={false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  conversations: state.conversationFetcherReducer.conversations,
  deleted: state.conversationDeleterReducer.deleted,
});

const mapDispatchToProps = dispatch => ({
  fetchConversations: () => dispatch(fetchConversations()),
  deleteConversation: id => dispatch(deleteConversation(id)),
  resetDeleteState: () => dispatch(resetDeleteState()),
});

Inbox.propTypes = {
  fetchConversations: PropTypes.func.isRequired,
  deleteConversation: PropTypes.func.isRequired,
  resetDeleteState: PropTypes.func.isRequired,
  conversations: PropTypes.arrayOf(PropTypes.instanceOf(Parser)),
  deleted: PropTypes.bool,
};

Inbox.defaultProps = {
  conversations: [new Parser(null, null)],
  deleted: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
