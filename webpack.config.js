/* eslint-disable no-undef */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const paths = require('./paths')

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'index.bundle.js',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './build'),
    open: true,
    compress: true,
    hot: true,
    port: 8080,
    overlay: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      template: path.resolve(__dirname, './src/template.html'),
      filename: 'index.html',
      favicon: './src/assets/icon/favicon.png',
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js[x]$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-modules-typescript-loader' },
          { loader: 'css-loader', options: { modules: true } },
          { loader: 'sass-loader' },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|mp3)$/i,
        type: 'asset',
      },
    ],
  },
}
