import * as types from './constants'
import { REHYDRATE } from 'redux-persist/constants'

const memos = (state, action) => {
  switch (action.type) {
    case REHYDRATE: {
      const incoming = action.payload.app
      if (incoming) {
        return incoming
      }
      return state
    }
    case types.MEMO_FETCH:
    case types.MEMO_UPDATE:
    case types.MEMO_DELETE:
      return action.memos
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
