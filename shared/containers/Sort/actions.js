/* eslint import/prefer-default-export:0 */
import types from './constants'

export function updateSort(sort) {
  return { type: types.SORT, sort }
}
