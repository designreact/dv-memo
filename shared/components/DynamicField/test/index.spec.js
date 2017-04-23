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
        TagName: 'p',
        FieldTagName: 'textarea',
        className: 'memo-body',
        value: 'Some body copy here',
        onUpdateValue: sandbox.spy(),
        onUpdateLength: sandbox.spy(),
        maxBodyLength: 140,
      }
      output = mount(<DynamicField {...props} />)
    })
    afterEach(() => {
      output = null
    })
    it('Should render the given TagName with the given className', () => {
      expect(output).to.have.className('memo-body')
      expect(output).to.have.tagName('p')
    })
    describe('Given the field state is !blurred', () => {
      it("Should have an 'textarea' tagName", () => {
        output.simulate('focus')
        expect(output).to.have.tagName('textarea')
      })
    })
    describe('Given the field is an input and is focussed', () => {
      it('Should call onUpdateLength once', () => {
        // need to focus to switch node before change
        output.simulate('focus')
        // now focus on input
        output.simulate('focus')
        expect(props.onUpdateLength.calledOnce).to.be.true
      })
      describe('Given the field.value is focussed then changed', () => {
        it('Should call onUpdateLength twice', () => {
          // need to focus to switch node before change
          output.simulate('focus')
          // now focus on input
          output.simulate('focus')
          // emit change
          output.simulate('change')
          expect(props.onUpdateLength.calledTwice).to.be.true
        })
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
        expect(output).to.have.tagName('p')
      })
    })
  })
})
