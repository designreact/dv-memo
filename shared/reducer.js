import { combineReducers } from 'redux'
import ideas from './containers/Memos/reducers'

const rootReducer = combineReducers({
  ideas,
})

export default rootReducer
