/* eslint react/jsx-filename-extension:0 */
/* eslint no-unused-expressions:0 */

import React from 'react'
import { mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { Notifier } from '../index'

chai.use(chaiEnzyme())

describe('Given <Notifier />', () => {
  let output
  let props
  beforeEach(() => {
    props = {
      type: 'EXPECTED_TYPE',
      message: 'Expected message',
    }
    output = mount(<Notifier {...props} />)
  })
  afterEach(() => {
    output = null
  })
  describe('Given the rendered component', () => {
    it('Should render div.notifier', () => {
      expect(output).to.have.className('notifier')
      expect(output).to.have.tagName('div')
    })
    it('Should render div.notifier-message', () => {
      expect(output).to.have.exactly(1).descendants('div.notifier-message')
    })
  })
  describe('Given an empty notification', () => {
    it('Should NOT render div.notifier-message', () => {
      output.setProps({})
      expect(output).to.have.exactly(0).descendants('div.notifier-message')
    })
  })
})
