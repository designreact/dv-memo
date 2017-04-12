/* eslint no-underscore-dangle: [0] */

import React from 'react'
import routes from '../shared/routes'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { configureStore } from '../shared/store/configureStore'

const store = configureStore(browserHistory, window.__INITIAL_STATE__)
const dest = document.getElementById('root')

render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), dest)
