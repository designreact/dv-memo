/* eslint no-unused-expressions:0 */
import types from '../constants'
import reducers from '../reducers'

describe('Given the Sort reducers', () => {
  it('Should return the existing state', () => {
    const state = 'existing'
    const sort = reducers(state, { type: '' })
    expect(sort).to.equal(state)
  })
  describe('Given the SORT action', () => {
    const string = 'title'
    const sort = reducers('default', {
      type: types.SORT,
      sort: string,
    })
    it('Should not return the current state', () => {
      expect(sort).to.not.equal('default')
    })
    it('Should return a string matching action.sort', () => {
      expect(sort).to.equal('title')
    })
  })
})
