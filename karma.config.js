/* eslint-disable max-len */
/* eslint-disable func-names */

// Karma configuration
const WebpackKarmaWarningsPlugin = require('./webpack-karma-warnings-plugin')
const webpackConfig = require('./webpack.config')

module.exports = function (config) {
  webpackConfig.devtool = 'inline-source-map'
  delete webpackConfig.entry
  webpackConfig.plugins = [new WebpackKarmaWarningsPlugin()]
  // use ignore loader to skip non js files
  webpackConfig.module.rules = [{
    enforce: 'pre',
    test: /\.(js|jsx)$/,
    use: {
      loader: 'eslint-loader',
      options: {
        failOnError: true,
      },
    },
    exclude: [/node_modules/],
  },
  {
    test: [/\.scss$/],
    use: 'ignore-loader',
  },
  {
    test: /\.(js|jsx)$/,
    exclude: [/node_modules/],
    use: 'babel-loader',
  }]

  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon'],

    // list of files / patterns to load in the browser
    files: [
      // polyfill fetch for PhantomJS
      'node_modules/whatwg-fetch/fetch.js',
      // load bable polyfill to handle Promises in PhantomJS
      'node_modules/babel-polyfill/dist/polyfill.js',
      'webpack.test.bundle.js',
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'webpack.test.bundle.js': ['webpack', 'sourcemap'],
    },

    webpack: webpackConfig,

    webpackServer: {
      noInfo: true,
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha'],

    // web server port
    port: 9998,
    runnerPort: 9999,

    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Configure how the browser console is logged with the following properties, all of which are optional:
    browserConsoleLogOptions: {
      level: 'log',
      format: '%b %T: %m',
      terminal: true,
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    captureTimeout: 8500,
    reportSlowerThan: 500,
  })
}
