// webpack collects all spec files, looking into subfolders recursively
// the result will be a single bundle importing all specs as the input for Karma
/* eslint strict:0 */
/* eslint func-names:0 */
/* eslint prefer-arrow-callback:0 */

'use strict'

function load(modules) {
  modules.keys().forEach(function (path) {
    modules(path)
  })
}

load(require.context('./', true, /^((?![\\/]node_modules[\\/]).)*\.spec\.js$/))
