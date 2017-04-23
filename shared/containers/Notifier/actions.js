/* eslint import/prefer-default-export:0 */
import types from './constants'

export function displayNotification(action) {
  return dispatch => {
    dispatch(action)
    setTimeout(() => {
      dispatch({ type: types.NOTIFY_CLEAR })
    }, 3500)
  }
}
