import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import { Home } from '../../../src/pages/Home';
import store from '../../../src/redux-modules/store.dev';

describe('page: Home', () => {
  describe('rendering', () => {
    it('matches snapshot', () => {
      const classes = { root: '', };
      const tree = renderer.create(
        <Provider store={store}>
          <Home classes={classes} />
        </Provider>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
