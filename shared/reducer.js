import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'
import { routerReducer } from 'react-router-redux'
import memos from './containers/Memos/reducers'

const rootReducer = combineReducers({
  memos,
  router,
  routing: routerReducer,
})

export default rootReducer
