/* eslint-disable */
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: 'source-map',

  entry: [
    'babel-polyfill',
    __dirname + '/client/index.js'
  ],

  output: {
    path: __dirname + '/static/',
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
  },

  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?minimize&-autoprefixer!sass')
      },
      {
        test: /\.js*$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /.+\.config.js/, /tests/],
        query: {
          plugins: ['transform-runtime', 'transform-es3-member-expression-literals', 'transform-es3-property-literals'],
          presets: ['es2015', 'stage-0', 'react']
        }
      },
    ],
  },

  sassLoader: {
    outputStyle: 'compressed'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: false,
      mangle: false,
      output: {
        comments: false
      },
      compressor: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin('style/app.css', {
      allChunks: true,
    })
  ],
}
