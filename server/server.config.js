/* eslint global-require: 0 */
/* eslint import/no-mutable-exports: 0 */
let serverConfig
if (process.env.NODE_ENV !== 'production') {
  serverConfig = require('./server.config.dev').config
} else {
  serverConfig = require('./server.config.prod').config
}
export default serverConfig
