import types from './constants'

const memos = (state = 'default', action) => {
  if (action && action.type === types.SORT) return action.sort
  return state
}

export default memos
