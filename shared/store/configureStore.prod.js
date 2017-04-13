import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { REHYDRATE } from 'redux-persist/constants'
import createActionBuffer from 'redux-action-buffer'
import { persistStore, autoRehydrate } from 'redux-persist'
import rootReducer from '../reducer'

let store
export function configureStore(history, initialState = {}) {
  let enhancer
  if (typeof window !== 'undefined') {
    enhancer = compose(
      applyMiddleware(
        thunk,
        createActionBuffer(REHYDRATE),
      ),
      autoRehydrate(),
    )
  } else {
    enhancer = compose(
      applyMiddleware(
        thunk,
      )
    )
  }
  store = createStore(rootReducer, initialState, enhancer)
  if (typeof window !== 'undefined') {
    persistStore(store, { whitelist: ['memos'] })
  }
  return store
}

export function getStore() {
  return store.getState()
}
