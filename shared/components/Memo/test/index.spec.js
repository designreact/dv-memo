/* eslint react/jsx-filename-extension:0 */
/* eslint no-unused-expressions:0 */

import React from 'react'
import { mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import Memo from '../index'
import DynamicField from '../../DynamicField'
import Count from '../../Count'

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

  describe('Given state.bodyLength !== null', () => {
    it('Should render <Count />', () => {
      output.setState({ bodyLength: 5 })
      expect(output).to.have.exactly(1).descendants(Count)
    })
  })

  describe('Given the Memo methods', () => {
    let sandbox
    let memoInstance
    beforeEach(() => {
      sandbox = sinon.sandbox.create()
      memoInstance = new Memo()
      memoInstance.props = props
      memoInstance.setState = sandbox.spy()
    })
    afterEach(() => {
      memoInstance = null
      sandbox.restore()
    })
    describe('Given the constructor method', () => {
      it('Should assign updateMemo to boundUpdateMemo', () => {
        expect(memoInstance.boundUpdateMemo).to.not.be.undefined
        expect(memoInstance.boundUpdateMemo.name).to.equal(memoInstance.updateMemo.name)
      })
      it('Should assign deleteMemo to boundDeleteMemo', () => {
        expect(memoInstance.boundDeleteMemo).to.not.be.undefined
        expect(memoInstance.boundDeleteMemo.name).to.equal(memoInstance.deleteMemo.name)
      })
      it('Should set the default state to { bodyLength: null }', () => {
        expect(memoInstance.state.bodyLength).to.be.null
      })
    })
    describe('Given the getMemo method', () => {
      it('Should return a memo created from the props', () => {
        const memo = {
          id: props.id,
          title: props.title,
          body: props.body,
        }
        expect(JSON.stringify(memoInstance.getMemo())).to.equal(JSON.stringify(memo))
      })
    })
    describe('Given the updateMemo method', () => {
      it('Should call props.onUpdate with the expected title', () => {
        memoInstance.updateMemo('memo-title', 'expected test title')
        expect(props.onUpdate.firstCall.args[0].title).to.equal('expected test title')
      })
      it('Should call props.onUpdate with the expected body', () => {
        memoInstance.updateMemo('memo-body', 'expected test body')
        expect(props.onUpdate.firstCall.args[0].body).to.equal('expected test body')
      })
      it('Should clear bodyLength from state', () => {
        memoInstance.updateMemo('memo-title', '')
        expect(memoInstance.setState.calledWith({ bodyLength: null })).to.be.true
      })
    })
    describe('Given the deleteMemo method', () => {
      it('Should call props.onDelete', () => {
        memoInstance.deleteMemo()
        expect(props.onDelete.calledOnce).to.be.true
      })
    })
  })
})
