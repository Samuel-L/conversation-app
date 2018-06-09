class Parser {
  constructor(conversation, messages = []) {
    this.data = {
      ...conversation,
      avatar: 'http://localhost:8000/media/avatars/Avatar.jpg',
      messages,
    };

    this.parseTimestamp = this.parseTimestamp.bind(this);
  }

  get id() {
    return this.data.id;
  }

  get topic() {
    return this.data.topic;
  }

  lastMessageAndTimestamp() {
    let latestMessage = 0;
    let lastMessageDate = 0;
    this.data.messages.forEach((message) => {
      const date = new Date(message.created_at);
      if (date > lastMessageDate || lastMessageDate === 0) {
        latestMessage = message.body;
        lastMessageDate = date;
      }
    });

    return { message: latestMessage, timestamp: lastMessageDate };
  }

  get messagePreview() {
    return this.lastMessageAndTimestamp().message || 'No messages sent on this conversation.';
  }

  parseTimestamp = (timestamp) => {
    let day = timestamp.getDate();
    let month = timestamp.getMonth();
    const year = timestamp.getFullYear();
    let hours = timestamp.getHours();
    let minutes = timestamp.getMinutes();

    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    if (hours === 0) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  get lastTimestamp() {
    const { timestamp } = this.lastMessageAndTimestamp();
    try {
      return this.parseTimestamp(timestamp);
    } catch (error) {
      return null;
    }
  }

  get avatar() {
    return this.data.avatar;
  }
}

export default Parser;
