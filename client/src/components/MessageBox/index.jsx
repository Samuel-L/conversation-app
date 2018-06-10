import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

import InputField from '../InputField';
import Message from './Message';
import { sendMessage } from '../../redux-modules/send-message';

class MessageBox extends Component {
  state = {
    message: '',
  };

  handleTextChange = (event) => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSendMessage = () => {
    const { message } = this.state;
    const { conversationID } = this.props;
    this.props.sendMessage(conversationID, message);
    this.setState({ message: '' });
  };

  render() {
    return (
      <div>
        <div>
          { this.props.messages
            ?
              this.props.messages.map(message => (
                <Message
                  key={message.id}
                  message={message}
                />
              ))
            :
              null
          }
        </div>
        <div>
          <InputField
            id="message"
            label="Message"
            type="text"
            value={this.state.message}
            handleChange={this.handleTextChange}
          />
          <Button variant="raised" onClick={this.handleSendMessage}>
            Send
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  success: state.sendMessageReducer.sent,
  failure: state.sendMessageReducer.error,
});

const mapDispatchToProps = dispatch => ({
  sendMessage: (conversationID, message) => dispatch((sendMessage(conversationID, message))),
});

MessageBox.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.object),
  sendMessage: PropTypes.func.isRequired,
  conversationID: PropTypes.number,
};

MessageBox.defaultProps = {
  messages: [{}],
  conversationID: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);
