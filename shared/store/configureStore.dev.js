/* eslint global-require: 0 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { REHYDRATE } from 'redux-persist/constants'
import createActionBuffer from 'redux-action-buffer'
import { persistStore, autoRehydrate } from 'redux-persist'
import { asyncSessionStorage } from 'redux-persist/storages'
import rootReducer from '../reducer'

let store
export function configureStore(history, initialState = {}) {
  if (process.env.CLIENT) {
    const enhancerClient = compose(
      applyMiddleware(
        thunk,
        createActionBuffer(REHYDRATE),
      ),
      window.devToolsExtension ? window.devToolsExtension() : null,
      autoRehydrate(),
    )
    try {
      store = createStore(rootReducer, initialState, enhancerClient)
    } catch (e) {
      console.log('Create store error:', e)
    }
    persistStore(store, { whitelist: ['app', 'basket'] })
    persistStore(store, { storage: asyncSessionStorage, whitelist: ['session'] })
  } else {
    const enhancerServer = applyMiddleware(thunk)
    store = createStore(rootReducer, initialState, enhancerServer)
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducer', () => {
      const nextReducer = require('../reducer').default
      store.replaceReducer(nextReducer)
    })
  }
  return store
}

export function getState() {
  return store.getState()
}
