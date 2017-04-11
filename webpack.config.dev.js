var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './client/index.js',
  ],

  output: {
    path: __dirname + '/static/',
    filename: 'bundle.js',
    publicPath: '/static/',
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
  },

  module: {
    loaders: [
      {
        test: /\.js*$/,
        exclude: [/node_modules/, /.+\.config.js/, /tests/],
        loader: 'babel',
        query: {
          plugins: ['transform-es3-member-expression-literals', 'transform-es3-property-literals'],
          presets: ['es2015', 'react', 'react-hmre'],
        },
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ],
    noParse: [
      /aws\-sdk/,
    ]
  },

  sassLoader: {
    outputStyle: 'compressed'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true)
      }
    }),
  ],
}
