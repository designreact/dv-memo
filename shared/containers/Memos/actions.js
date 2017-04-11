import * as types from './constants'
import fetch from 'isomorphic-fetch'

function postMemoData(uri, body) {
  return new Promise((resolve, reject) => {
    fetch(uri, {
      credentials: 'same-origin',
      body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    .then((response) => {
      return response.json()
    })
    .then(resolve)
    .catch(reject)
  })
}

export function fetchMemos(apiServer) {
  return dispatch => {
    fetch(`${apiServer}/ideas`)
    .then((response) => {
      return response.json()
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
    postMemoData(`${apiServer}/ideas/update`, memo)
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
    .then((response) => {
      return response.json()
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
    postMemoData(`${apiServer}/ideas/delete`, memo)
    .then(memos => {
      dispatch({ type: types.MEMO_DELETE, memos })
    })
    .catch(err => {
      dispatch({ type: types.MEMO_ERROR, err })
    })
  }
}
