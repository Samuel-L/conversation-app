/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export const siteTitle = 'Conversationalist';

export const apiURL = process.env.NODE_ENV === 'production' ? process.env.API_URL : 'http://localhost:8000/api';

const jwtToken = window.localStorage.getItem('token');

export const axiosInstance = axios.create({
  baseURL: apiURL,
  headers: { Authorization: `JWT ${jwtToken}` },
});
