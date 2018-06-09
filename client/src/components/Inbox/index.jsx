import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Parser from '../../utils/parser';
import Item from './Item';
import { fetchConversations } from '../../redux-modules/conversation-fetcher';

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
            />
          ))
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  conversations: state.conversationFetcherReducer.conversations,
});

const mapDispatchToProps = dispatch => ({
  fetchConversations: () => dispatch(fetchConversations()),
});

Inbox.propTypes = {
  fetchConversations: PropTypes.func.isRequired,
  conversations: PropTypes.arrayOf(PropTypes.instanceOf(Parser)),
};

Inbox.defaultProps = {
  conversations: [new Parser(null, null)],
};

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);
