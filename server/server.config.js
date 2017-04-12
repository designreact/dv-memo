/* eslint global-require: 0 */
/* eslint import/no-mutable-exports: 0 */
let serverConfig
if (process.env.NODE_ENV === 'production') {
  serverConfig = require('./server.config.prod')
} else {
  serverConfig = require('./server.config.dev')
}
export default serverConfig.default
