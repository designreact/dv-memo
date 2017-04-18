import types from './constants'
import { REHYDRATE } from 'redux-persist/constants'

const memos = (state = [], action) => {
  switch (action.type) {
    case REHYDRATE: {
      if (action.payload && action.payload.memos) {
        return action.payload.memos.slice(0)
      }
      return state
    }
    case types.MEMO_FETCH:
    case types.MEMO_UPDATE:
    case types.MEMO_DELETE:
      return action.memos.slice(0)
    case types.MEMO_CREATE: {
      const items = state.slice(0)
      items.push(action.memo)
      return items
    }
    default:
      return state
  }
}

export default memos
