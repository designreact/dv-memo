import types from './constants'
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
    })
    .catch(err => {
      dispatch({ type: types.MEMO_ERROR, err })
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
    })
    .catch(err => {
      dispatch({ type: types.MEMO_ERROR, err })
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
    })
    .catch(err => {
      dispatch({ type: types.MEMO_ERROR, err })
    })
  }
}
