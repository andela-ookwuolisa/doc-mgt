import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { spy, assert } from 'sinon';
import { AddDocument } from './../../src/containers/AddDocument';

const event = {
  target: {
    id: 1,
    value: 'value'
  }
};

const onInputChangeSpy = spy(AddDocument.prototype, 'onInputChange');
describe('Add Document Component', () => {
  it('should render the Add Document component', () => {
    const wrapper = shallow(<AddDocument />);
    expect(wrapper.find('.add-document').exists()).to.equal(true);
  });

  it('should handle input change', () => {
    const wrapper = shallow(<AddDocument />);
    wrapper.instance().onInputChange(event);
    assert.calledOnce(onInputChangeSpy);
  });
});

