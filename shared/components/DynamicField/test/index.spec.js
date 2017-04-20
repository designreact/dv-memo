/* eslint react/jsx-filename-extension:0 */
/* eslint no-unused-expressions:0 */

import React from 'react'
import { mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { DynamicField } from '../index'

chai.use(chaiEnzyme())

describe('Given <DynamicField />', () => {
  let sandbox
  let dynamicFieldInstance
  beforeEach(() => {
    dynamicFieldInstance = new DynamicField()
    sandbox = sinon.sandbox.create()
  })
  afterEach(() => {
    dynamicFieldInstance = null
    sandbox.restore()
  })
  describe('Given the constructor method', () => {
    it('Should set state.blurred to true', () => {
      dynamicFieldInstance.state = {
        blurred: false,
      }
      dynamicFieldInstance.constructor()
      expect(dynamicFieldInstance.state.blurred).to.be.true
    })
  })
  describe('Given the componentDidMount method', () => {
    it('Should call this.inputField.focus', () => {
      dynamicFieldInstance.inputField = {
        focus: sandbox.spy(),
      }
      dynamicFieldInstance.componentDidMount()
      expect(dynamicFieldInstance.inputField.focus.calledOnce).to.be.true
    })
  })
  describe('Given the componentDidUpdate method', () => {
    it('Should call this.inputField.focus', () => {
      dynamicFieldInstance.inputField = {
        focus: sandbox.spy(),
      }
      dynamicFieldInstance.componentDidMount()
      expect(dynamicFieldInstance.inputField.focus.calledOnce).to.be.true
    })
  })
  describe('Given the rendered component', () => {
    let output
    let props
    beforeEach(() => {
      props = {
        TagName: 'h4',
        className: 'memo-title',
        value: 'A title here',
        onUpdateValue: sandbox.spy(),
      }
      output = mount(<DynamicField {...props} />)
    })
    afterEach(() => {
      output = null
    })
    it('Should render the given TagName with the given className', () => {
      expect(output).to.have.className('memo-title')
      expect(output).to.have.tagName('h4')
    })
    describe('Given the field state is !blurred', () => {
      it("Should have an 'input' tagName", () => {
        output.simulate('focus')
        expect(output).to.have.tagName('input')
      })
    })
    describe('Given the field is an input and is then blurred', () => {
      it('Should call onUpdateValue', () => {
        output.simulate('focus')
        output.simulate('blur')
        expect(props.onUpdateValue.calledOnce).to.be.true
      })
      it('Should return to being of the given tagName', () => {
        output.simulate('focus')
        output.simulate('blur')
        expect(output).to.have.tagName('h4')
      })
    })
  })
})
