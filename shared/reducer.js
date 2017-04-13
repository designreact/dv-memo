import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import app from './containers/App/reducers'
import memos from './containers/Memos/reducers'
import sort from './containers/Sort/reducers'

const rootReducer = combineReducers({
  app,
  memos,
  sort,
  routing: routerReducer,
})

export default rootReducer
