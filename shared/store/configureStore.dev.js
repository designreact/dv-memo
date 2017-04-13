/* eslint global-require: 0 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import DevTools from '../containers/DevTools'
import { routerMiddleware } from 'react-router-redux'
import { REHYDRATE } from 'redux-persist/constants'
import createActionBuffer from 'redux-action-buffer'
import { persistStore, autoRehydrate } from 'redux-persist'
import rootReducer from '../reducer'

let store
export function configureStore(history, initialState = {}) {
  if (process.env.CLIENT) {
    /* eslint no-underscore-dangle:0 */
    const enhancerClient = compose(
      applyMiddleware(
        thunk,
        routerMiddleware(history),
        createActionBuffer(REHYDRATE),
      ),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      autoRehydrate(),
    )
    try {
      store = createStore(rootReducer, initialState, enhancerClient)
    } catch (e) {
      console.log('Create store error:', e)
    }
    persistStore(store, { whitelist: ['memos'] })
  } else {
    const enhancerServer = applyMiddleware(thunk, routerMiddleware(history))
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
