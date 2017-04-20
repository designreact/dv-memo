/* eslint no-unused-expressions:0 */
import types from '../constants'
import { updateSort } from '../actions'

describe('Given the Sort action creators', () => {
  describe('Given the updateSort method', () => {
    it('Should return a SORT action with the given sort string', () => {
      const sort = 'test'
      const action = updateSort(sort)
      expect(action.type).to.equal(types.SORT)
      expect(action.sort).to.equal(sort)
    })
  })
})
