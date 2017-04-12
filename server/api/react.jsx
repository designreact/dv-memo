import express from 'express'
import React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { createMemoryHistory, match, RouterContext } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { configureStore } from '../../shared/store/configureStore'
// import serverConfig from '../server.config'
import routes from '../../shared/routes'

const router = express()

const initialState = {
  memos: [],
  // apiServer: serverConfig.apiServer,
}

function renderPage(html, state) {
  return `
    <!doctype html>
    <html>
      <head>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(state)}
      </script>
      <script defer src="/static/bundle.js"></script>
    </html>
  `
}

// Render Error
function renderError(err) {
  const softTab = '&#32&#32&#32&#32'
  const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : ''
  return renderPage(`Server Error${errTrace}`, initialState)
}

function resolveRequest(req, res, store, renderProps) {
  let html
  try {
    html = renderToString(
      <Provider store={store}>
        <RouterContext {...renderProps} />
      </Provider>
    )
  } catch (err) {
    console.log(Date(), 'Universal render error', err, err.stack)
    console.log(Date(), JSON.stringify(store.getState()))
    return res.status(500).end(renderError(err))
  }
  const finalState = store.getState()
  const page = renderPage(html, finalState)
  res.setHeader('Content-Type', 'text/html')
  return res.status(200).send(page)
}

router.get('/', (req, res) => {
  const memoryHistory = createMemoryHistory(req.url)
  const store = configureStore(memoryHistory, initialState)
  const history = syncHistoryWithStore(memoryHistory, store)
  match({ history, routes, location: req.url }, (err, redirectLocation, renderProps) => {
    if (err) {
      res.status(500).end(renderError(err))
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      resolveRequest(req, res, store, renderProps)
    }
  })
})

export default router
