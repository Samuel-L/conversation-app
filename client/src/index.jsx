import React from 'react';
import { HashRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './redux-modules/store';
import App from './App';

render(
  <Provider store={store}>
    <HashRouter><App /></HashRouter>
  </Provider>,
  document.getElementById('root'),
);
