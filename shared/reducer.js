import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import app from './containers/App/reducers'
import memos from './containers/Memos/reducers'
import notifier from './containers/Notifier/reducers'
import sort from './containers/Sort/reducers'

const rootReducer = combineReducers({
  app,
  memos,
  notifier,
  routing: routerReducer,
  sort,
})

export default rootReducer
