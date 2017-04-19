import types from '../constants'
import reducers from '../reducers'
import { REHYDRATE } from 'redux-persist/constants'

describe('Given the Memos reducers', () => {
  let sandbox
  const item0 = { name: 'item0' }
  const item1 = { name: 'item1' }
  const item2 = { name: 'item2' }
  const item3 = { name: 'item3' }
  const newItem = { name: 'newItem' }
  const state = [item0, item1, item2]
  const newMemos = [item1, item2, item3]
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })
  afterEach(() => {
    sandbox.restore()
  })
  it('Should return the existing state', () => {
    const memos = reducers(state, { type: null })
    expect(memos).to.equal(state)
  })
  describe('Given the REHYDRATE action', () => {
    it('Should return the existing state when no memos are present', () => {
      const memos = reducers(state, { type: REHYDRATE })
      expect(memos).to.equal(state)
    })
    describe('Given a memos payload', () => {
      const memos = reducers(state, { type: REHYDRATE, payload: { memos: newMemos } })
      it('Should not return the current state', () => {
        expect(memos).to.not.equal(state)
      })
      it('Should return a new array', () => {
        expect(memos).to.not.equal(newMemos)
      })
    })
  })
  describe('Given the MEMO_FETCH action', () => {
    const memos = reducers(state, { type: types.MEMO_FETCH, memos: newMemos })
    it('Should not return the current state', () => {
      expect(memos).to.not.equal(state)
    })
    it('Should return a new array', () => {
      expect(memos).to.not.equal(newMemos)
    })
    it('Should return an array of the same items', () => {
      expect(memos[0]).to.equal(item1)
      expect(memos[1]).to.equal(item2)
      expect(memos[2]).to.equal(item3)
    })
  })
  describe('Given the MEMO_UPDATE action', () => {
    const memos = reducers(state, { type: types.MEMO_UPDATE, memos: newMemos })
    it('Should not return the current state', () => {
      expect(memos).to.not.equal(state)
    })
    it('Should return a new array', () => {
      expect(memos).to.not.equal(newMemos)
    })
    it('Should return an array of the same items', () => {
      expect(memos[0]).to.equal(item1)
      expect(memos[1]).to.equal(item2)
      expect(memos[2]).to.equal(item3)
    })
  })
  describe('Given the MEMO_DELETE action', () => {
    const memos = reducers(state, { type: types.MEMO_DELETE, memos: newMemos })
    it('Should not return the current state', () => {
      expect(memos).to.not.equal(state)
    })
    it('Should return a new array', () => {
      expect(memos).to.not.equal(newMemos)
    })
    it('Should return an array of the same items', () => {
      expect(memos[0]).to.equal(item1)
      expect(memos[1]).to.equal(item2)
      expect(memos[2]).to.equal(item3)
    })
  })
  describe('Given the MEMO_CREATE action', () => {
    const memos = reducers(state, { type: types.MEMO_CREATE, memo: newItem })
    it('Should not return the current state', () => {
      expect(memos).to.not.equal(state)
    })
    it('Should return a new state array with the new memo appended', () => {
      expect(memos[0]).to.equal(item0)
      expect(memos[1]).to.equal(item1)
      expect(memos[2]).to.equal(item2)
      expect(memos[3]).to.equal(newItem)
    })
  })
})
