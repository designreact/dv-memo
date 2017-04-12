/* eslint import/no-extraneous-dependencies:0 */
if (process.env.CLIENT) {
  require('./scss/main.scss')
}

require('babel-register')
require('babel-polyfill')
require('./server')
