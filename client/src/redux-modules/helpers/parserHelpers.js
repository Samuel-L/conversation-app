import Parser from '../../utils/parser';

const createParsers = (conversations, messages) => {
  const parsers = conversations.map((conversation) => {
    const conversationID = conversation.id;
    const conversationMessages = messages.filter((messageList) => {
      if (messageList.length <= 0) {
        return null;
      }
      return messageList[0].conversation === conversationID;
    });
    return new Parser(conversation, conversationMessages[0]);
  });

  return parsers;
};

export default createParsers;
