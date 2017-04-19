/* eslint react/jsx-filename-extension:0 */
/* eslint no-unused-expressions:0 */

import React from 'react'
import { shallow, mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { Memos } from '../index'
import Sort from '../../Sort'
import Memo from '../../../components/Memo'

chai.use(chaiEnzyme())

const memos = [
  {
    id: 0,
    created_date: 'Tue Apr 11 2017 22:45:00 GMT+0100 (BST)',
    title: 'Some awesome memo',
    body: 'Chocolate cake wafer caramels cake fruitcake chupa chups. Topping sesame snaps lemon drops. Jelly beans sweet roll chupa chups gummies.',
  },
  {
    id: 1,
    created_date: 'Tue Apr 11 2017 21:30:00 GMT+0100 (BST)',
    title: 'Another awesome memo',
    body: 'Topping sesame snaps lemon drops. Jelly beans sweet roll chupa chups gummies. Chocolate cake wafer caramels cake fruitcake chupa chups.',
  },
  {
    id: 2,
    created_date: 'Tue Apr 11 2017 07:15:00 GMT+0100 (BST)',
    title: 'Boring memo',
    body: 'Jelly beans sweet roll chupa chups gummies. Chocolate cake wafer caramels cake fruitcake chupa chups. Topping sesame snaps lemon drops.',
  },
  {
    id: 3,
    created_date: 'Tue Apr 10 2017 02:15:00 GMT+0100 (BST)',
    title: 'Interesting memo',
    body: 'Topping sesame snaps lemon drops. Chocolate cake wafer caramels cake fruitcake chupa chups.',
  },
  {
    id: 4,
    created_date: 'Tue Apr 16 2017 21:30:00 GMT+0100 (BST)',
    title: 'Exciting memo',
    body: 'Topping sesame snaps lemon drops. Chocolate cake wafer caramels cake fruitcake chupa chups.',
  },
]

describe('Given <Memos />', () => {
  let sandbox
  let memosInstance
  beforeEach(() => {
    memosInstance = new Memos()
    sandbox = sinon.sandbox.create()
  })
  afterEach(() => {
    memosInstance = null
    sandbox.restore()
  })
  describe('Given the sortMemos method', () => {
    it('Should sort props.memos by id', () => {
      memosInstance.props = {
        sort: 'default',
        memos: memos.slice(0).reverse(),
      }
      const memorandums = memosInstance.sortMemos()
      expect(memorandums[0].id).to.equal(0)
      expect(memorandums[memorandums.length - 1].id).to.equal(4)
    })
    it('Should sort props.memos by created_date', () => {
      memosInstance.props = {
        sort: 'created_date',
        memos: memos.slice(0).reverse(),
      }
      const memorandums = memosInstance.sortMemos()
      expect(memorandums[0].id).to.equal(3)
      expect(memorandums[memorandums.length - 1].id).to.equal(4)
    })
    it('Should sort props.memos by title', () => {
      memosInstance.props = {
        sort: 'title',
        memos: memos.slice(0).reverse(),
      }
      const memorandums = memosInstance.sortMemos()
      expect(memorandums[0].id).to.equal(1)
      expect(memorandums[memorandums.length - 1].id).to.equal(0)
    })
  })
  describe('Given the mapMemos method', () => {
    it('Should map the supplied memos to JSX', () => {
      memosInstance.props = {
        apiServer: '',
      }
      const memosJSX = memosInstance.mapMemos(memos)
      const first = mount(memosJSX[0])
      expect(first).to.have.className('memo')
      expect(first).to.have.type(Memo)
      expect(first).to.have.props({ id: 0 })
      const last = mount(memosJSX[memosJSX.length - 1])
      expect(last).to.have.className('memo')
      expect(last).to.have.type(Memo)
      expect(last).to.have.props({ id: 4 })
    })
  })
  describe('Given the rendered component', () => {
    let output
    let props
    beforeEach(() => {
      props = {
        memos,
        apiServer: '',
        sort: 'default',
        actions: {
          createMemo: sandbox.spy(),
          updateMemo: () => {},
          deleteMemo: () => {},
        },
      }
      output = shallow(<Memos {...props} />)
    })
    afterEach(() => {
      output = null
    })
    it('Should render div.memos', () => {
      expect(output).to.have.className('memos')
    })
    it('Should render div.memos-header', () => {
      expect(output).to.have.exactly(1).descendants('div.memos-header')
    })
    it('Should render div.memos-items', () => {
      expect(output).to.have.exactly(1).descendants('div.memos-items')
    })
    it('Should render button.memos-add', () => {
      expect(output).to.have.exactly(1).descendants('button.memos-add')
    })
    it('Should render a Sort component', () => {
      expect(output).to.have.exactly(1).descendants(Sort)
    })
    it('Should render the memos', () => {
      expect(output).to.have.exactly(5).descendants(Memo)
    })
    describe('Given the .memos-add button onClick method', () => {
      xit('Should call this.props.actions.createMemo', () => {
        // TODO utilise enzyme mount to test onClick - need to find solution to Sort store
        expect(props.actions.createMemo.calledOnce).to.be.true
      })
    })
  })
})
