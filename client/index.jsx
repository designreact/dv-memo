/* eslint no-underscore-dangle: [0] */

import React from 'react'
import routes from '../shared/routes'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { configureStore } from '../shared/store/configureStore'
import * as Actions from '../shared/containers/Memos/actions'

const store = configureStore(browserHistory, window.__INITIAL_STATE__)
const dest = document.getElementById('root')

render((
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
), dest)

// start memos app (fetch memos)
const state = store.getState()
if (state.app && state.app.apiServer) {
  const apiServer = state.app.apiServer
  store.dispatch(Actions.fetchMemos(apiServer))
}
