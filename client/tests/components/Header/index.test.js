import React from 'react';
import renderer from 'react-test-renderer';

import Header from '../../../src/components/Header';

describe('component: Header', () => {
  const classes = { root: '', flex: '' };
  const tree = renderer.create(<Header />).toJSON();

  it('matches snapshot', () => {
    expect(tree).toMatchSnapshot(); 
  });
});
