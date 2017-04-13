var webpack = require('webpack')

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
    'webpack-hot-middleware/client',
    __dirname + '/client/index.jsx',
  ],
  output: {
    path: '/',
    publicPath: '/static/',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true)
      }
    }),
  ],
  module: {
    rules: [
      {
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
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /.\.config.js/, /.\.spec.js/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'react-hmre', 'es2015'],
            plugins: [["react-transform", {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module']
              }]
            }]]
          },
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          }
        ]
      }
    ],
  },
}
