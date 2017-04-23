/* eslint react/jsx-filename-extension:0 */
/* eslint no-unused-expressions:0 */

import React from 'react'
import { shallow } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import Count from '../index'

chai.use(chaiEnzyme())

describe('Given <Count />', () => {
  describe('Given there are less than 15 characters left', () => {
    const props = {
      count: 5,
      maxLength: 15,
    }
    const output = shallow(<Count {...props} />)
    it('Should render as div.count', () => {
      expect(output).to.have.tagName('div')
      expect(output).to.have.className('count')
    })
    it('Should contain the remaining letter count as text', () => {
      expect(output).to.have.text('10')
    })
  })
  describe('Given there are more than 15 characters left', () => {
    const props = {
      count: 5,
      maxLength: 150,
    }
    const output = shallow(<Count {...props} />)
    it('Should render as div.count', () => {
      expect(output).to.have.tagName('div')
      expect(output).to.have.className('count')
    })
    it('Should contain the remaining letter count as text', () => {
      expect(output).to.have.text('')
    })
  })
})
