var webpack = require('webpack')

module.exports = {
  cache: true,
  context: process.cwd(),
  devtool: 'cheap-module-eval-source-map',
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
    path: __dirname + '/dist/',
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true)
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/, /.+\.config.js/, /tests/],
        loader: 'babel-loader',
        query: {
          plugins: ['transform-es3-member-expression-literals', 'transform-es3-property-literals'],
          presets: ['react', 'react-hmre', 'es2015'],
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ],
  },
}
