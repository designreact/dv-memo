import { Route, IndexRoute } from 'react-router'
import React from 'react'

import App from './components/App'
import Memos from './containers/Memos'

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Memos} />
  </Route>
)

export default routes
