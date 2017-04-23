/* eslint no-unused-expressions:0 */
/* eslint import/no-extraneous-dependencies:0 */
/* eslint import/no-webpack-loader-syntax:0 */
/* eslint import/no-unresolved:0 */
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import types from '../constants'
import { displayNotification } from '../actions'

describe('Given the Notifier action creators', () => {
  const middlewares = [thunk]
  const action = { type: types.NOTIFY_SAVED, message: 'Expected message' }
  const mockStore = configureMockStore(middlewares)
  const store = mockStore({ notifier: {} })
  let sandbox
  let clock
  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    clock = sandbox.useFakeTimers()
    store.dispatch(displayNotification(action))
    clock.tick(3500)
  })
  afterEach(() => {
    clock.restore()
    sandbox.restore()
  })
  describe('Given the displayNotification method', () => {
    it('Should dispatch the given action', () => {
      expect(store.getActions()[0].type).to.equal(types.NOTIFY_SAVED)
      expect(store.getActions()[0].message).to.equal('Expected message')
    })
    it('Should dispatch a clear action after 3.5 seconds', () => {
      expect(store.getActions()[1].type).to.equal(types.NOTIFY_CLEAR)
    })
  })
})
