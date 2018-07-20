import axios from 'axios';

import { axiosInstance } from '../../utils/helpers';

export const fetchConversationsPromise = () => {
  const promise = new Promise((resolve, reject) => {
    axiosInstance({
      method: 'get',
      url: '/conversations/',
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
};

export const fetchMessagesPromise = (conversations) => {
  const promise = new Promise((resolve, reject) => {
    const messagePromises = conversations.map(conversation => (
      axiosInstance({
        method: 'get',
        url: '/messages/',
        params: {
          conversation: conversation.id,
        },
      })
    ));

    axios.all(messagePromises)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });

  return promise;
};
