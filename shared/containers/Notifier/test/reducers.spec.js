import types from '../constants'
import reducers from '../reducers'

describe('Given the Notifier reducers', () => {
  const state = {
    type: 'a type',
  }
  it('Should return the existing state', () => {
    const notifier = reducers(state, { type: null })
    expect(notifier).to.equal(state)
  })
  describe('Given the NOTIFY_SAVED action', () => {
    const action = { type: types.NOTIFY_SAVED, message: 'expected message' }
    const notifier = reducers(state, action)
    it('Should not return the current state', () => {
      expect(notifier).to.not.equal(state)
    })
    it('Should return a new object', () => {
      expect(notifier).to.not.equal(action)
    })
    it('Should return an object with the same properties', () => {
      expect(notifier.type).to.equal(action.type)
      expect(notifier.message).to.equal(action.message)
    })
  })
  describe('Given the NOTIFY_ERROR action', () => {
    const action = { type: types.NOTIFY_ERROR, message: 'expected message' }
    const notifier = reducers(state, action)
    it('Should not return the current state', () => {
      expect(notifier).to.not.equal(state)
    })
    it('Should return a new object', () => {
      expect(notifier).to.not.equal(action)
    })
    it('Should return an object width the same properties', () => {
      expect(notifier.type).to.equal(action.type)
      expect(notifier.message).to.equal(action.message)
    })
  })
  describe('Given the NOTIFY_ERROR action', () => {
    const action = { type: types.NOTIFY_CLEAR }
    const notifier = reducers(state, action)
    it('Should not return the current state', () => {
      expect(notifier).to.not.equal(state)
    })
    it('Should return a new object', () => {
      expect(notifier).to.not.equal(action)
    })
    it('Should return an empty object', () => {
      expect(Object.keys(notifier).length).to.equal(0)
    })
  })
})
