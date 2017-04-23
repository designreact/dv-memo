import types from './constants'

const notifier = (state = {}, action) => {
  switch (action.type) {
    case types.NOTIFY_SAVED:
    case types.NOTIFY_ERROR:
      return Object.create(action)
    case types.NOTIFY_CLEAR:
      return {}
    default:
      return state
  }
}

export default notifier
