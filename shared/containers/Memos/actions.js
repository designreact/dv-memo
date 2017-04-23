import types from './constants'
import notifierTypes from '../Notifier/constants'
import { displayNotification } from '../Notifier/actions'
import 'isomorphic-fetch'

export function fetchMemos(apiServer) {
  return dispatch => {
    fetch(`${apiServer}/ideas`)
    .then(response => {
      if (response.status < 400) return response.json()
      throw new Error('Server error')
    })
    .then(memos => {
      dispatch({ type: types.MEMO_FETCH, memos })
    })
    .catch(err => {
      dispatch({ type: types.MEMO_ERROR, err })
      dispatch(displayNotification({ type: notifierTypes.NOTIFY_ERROR, message: 'An error occurred, memos not fetched' }))
    })
  }
}

export function updateMemo(apiServer, memo) {
  return dispatch => {
    fetch(`${apiServer}/ideas/update`, {
      credentials: 'same-origin',
      body: JSON.stringify(memo),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    .then(response => {
      if (response.status < 400) return response.json()
      throw new Error('Server error')
    })
    .then(memos => {
      dispatch({ type: types.MEMO_UPDATE, memos })
      dispatch(displayNotification({ type: notifierTypes.NOTIFY_SAVED, message: 'Memo has been saved' }))
    })
    .catch(err => {
      dispatch({ type: types.MEMO_ERROR, err })
      dispatch(displayNotification({ type: notifierTypes.NOTIFY_ERROR, message: 'An error occurred, memo may not have been saved' }))
    })
  }
}

export function createMemo(apiServer) {
  return dispatch => {
    fetch(`${apiServer}/ideas/new`)
    .then(response => {
      if (response.status < 400) return response.json()
      throw new Error('Server error')
    })
    .then(memo => {
      dispatch({ type: types.MEMO_CREATE, memo })
      dispatch(displayNotification({ type: notifierTypes.NOTIFY_SAVED, message: 'New memo created' }))
    })
    .catch(err => {
      dispatch({ type: types.MEMO_ERROR, err })
      dispatch(displayNotification({ type: notifierTypes.NOTIFY_ERROR, message: 'An error occurred, memo not created' }))
    })
  }
}

export function deleteMemo(apiServer, memo) {
  return dispatch => {
    fetch(`${apiServer}/ideas/delete`, {
      credentials: 'same-origin',
      body: JSON.stringify(memo),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    .then(response => {
      if (response.status < 400) return response.json()
      throw new Error('Server error')
    })
    .then(memos => {
      dispatch({ type: types.MEMO_DELETE, memos })
      dispatch(displayNotification({ type: notifierTypes.NOTIFY_SAVED, message: 'Memo was deleted' }))
    })
    .catch(err => {
      dispatch({ type: types.MEMO_ERROR, err })
      dispatch(displayNotification({ type: notifierTypes.NOTIFY_ERROR, message: 'An error occurred, memo not deleted' }))
    })
  }
}
