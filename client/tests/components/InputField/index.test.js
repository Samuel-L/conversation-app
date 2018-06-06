import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

import InputField from '../../../src/components/InputField';

describe('component: InputField', () => {
  const classes = { formControl: '' };

  describe('rendering', () => {
    const tree = renderer.create(<InputField
      id="test"
      label="test"
      type="text"
      classes={classes}
      value=""
      handleChange={jest.fn()}
    />).toJSON();

    it('matches snapshot', () => {
      expect(tree).toMatchSnapshot();
    });
  });
});
