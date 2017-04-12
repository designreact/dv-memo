import express from 'express'
import bodyParser from 'body-parser'
import router from './api/react'
import ideas from './api/ideas'
import serverConfig from './server.config'

// Initialize the Express App
const app = express()
app.use(bodyParser.json())

if (process.env.NODE_ENV === 'development') {
  // Webpack Requirements
  /* eslint global-require: "off" */
  /* eslint import/no-extraneous-dependencies: "off" */
  const webpack = require('webpack')
  const config = require('../webpack.config.dev')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')

  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
  app.use(webpackHotMiddleware(compiler))
}

app.use('/ideas', ideas)
app.use('/', router)

// start app
app.listen(serverConfig.port)
console.log(new Date(), 'listening on ', serverConfig.port)

export default app
