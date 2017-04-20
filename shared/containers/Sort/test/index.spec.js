/* eslint react/jsx-filename-extension:0 */
/* eslint no-unused-expressions:0 */

import React from 'react'
import { shallow } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { Sort } from '../index'

chai.use(chaiEnzyme())

describe('Given <Sort />', () => {
  let output
  let props
  let sandbox
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    props = {
      sort: 'default',
      actions: {
        updateSort: sandbox.spy(),
      },
    }
    output = shallow(<Sort {...props} />)
  })
  afterEach(() => {
    output = null
    sandbox.restore()
  })
  describe('Given the rendered component', () => {
    it('Should render select.memos', () => {
      expect(output).to.have.tagName('select')
      expect(output).to.have.className('sort')
    })
    it('Should render 3 options', () => {
      expect(output).to.have.exactly(3).descendants('option')
    })
    it('Should a default option', () => {
      expect(output).to.have.exactly(1).descendants('option[value="default"]')
    })
    it('Should a title option', () => {
      expect(output).to.have.exactly(1).descendants('option[value="title"]')
    })
    it('Should a created_date option', () => {
      expect(output).to.have.exactly(1).descendants('option[value="created_date"]')
    })
  })
})
