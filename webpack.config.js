/* eslint-disable */
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  cache: true,
  context: process.cwd(),
  devtool: 'source-map',
  resolve: {
    modules: [
      __dirname + '/node_modules',
    ],
    extensions: ['.js', '.jsx', '.scss'],
  },
  entry: [
    'babel-polyfill',
    __dirname + '/client/index.jsx'
  ],
  output: {
    path: __dirname + '/static/',
    filename: 'bundle.js',
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
      compress: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin({
      filename: 'style/app.css',
      allChunks: true,
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true,
              },
            },
            {
              loader: 'sass-loader'
            }
          ],
        }),
      },
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /.+\.config.js/, /.+\.spec.js/],
        use: {
          loader: 'babel-loader',
          query: {
            plugins: ['transform-es3-member-expression-literals', 'transform-es3-property-literals'],
            presets: ['react', 'es2015'],
          }
        }
      },
    ],
  },
}
