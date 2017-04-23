/* eslint react/jsx-filename-extension:0 */
/* eslint no-unused-expressions:0 */

import React from 'react'
import { mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import Memo from '../index'
import DynamicField from '../../DynamicField'

chai.use(chaiEnzyme())

describe('Given <Memo />', () => {
  let props
  let output
  beforeEach(() => {
    props = {
      id: 0,
      title: 'A title',
      body: 'A memo body',
      isNew: false,
      onUpdate: sinon.spy(),
      onDelete: sinon.spy(),
    }
    output = mount(<Memo {...props} />)
  })
  afterEach(() => {
    output = null
  })
  it('Should render div.memo', () => {
    expect(output).to.have.className('memo')
  })
  it('Should render 2 DynamicFields', () => {
    expect(output).to.have.exactly(2).descendants(DynamicField)
  })
  it('Should render a button.memo-delete', () => {
    expect(output).to.have.exactly(1).descendants('button.memo-delete')
  })
  it('Should call props.onUpdate', () => {
    // convert to input
    output.find('h4.memo-title').simulate('focus')
    // fire blur event on input
    output.find('input.memo-title').simulate('blur')
    // convert to input
    output.find('p.memo-body').simulate('focus')
    // fire blur event on input
    output.find('textarea.memo-body').simulate('blur')
    expect(props.onUpdate.calledTwice).to.be.true
  })
  it('Should call props.onDelete', () => {
    output.find('button.memo-delete').simulate('click')
    expect(props.onDelete.calledOnce).to.be.true
  })
})
