var path = require('path')
var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var utils = require('./utils')
var config = require('./config')
var vueLoaderConfig = require('./vue-loader.conf')
var isProduction = process.env.NODE_ENV === 'production'
var GitRevisionPlugin = require("git-revision-webpack-plugin");

let gitRevisionPlugin = new GitRevisionPlugin({
  versionCommand: 'describe --tags --long'
});

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const buildRules = [{
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: "pre",
    include: [resolve('src'), resolve('test')],
    options: {
      formatter: require('eslint-friendly-formatter')
    }
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: vueLoaderConfig
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('src'), resolve('test')]
  },
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 10000,
      name: utils.assetsPath('img/[name].[hash:7].[ext]'),
    }
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    query: {
      limit: 10000,
      name: utils.assetsPath('fonts/[name].[hash:7].[ext]'),
    }
  }
]

module.exports = {
  target: "web",
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': resolve('src'),
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
      'modules': resolve('src/modules'),
    }
  },
  module: {
    rules: buildRules
  },
  plugins: [
    new webpack.DefinePlugin(config.package.webpackDefine || {}),
    new webpack.DefinePlugin({
      'VERSION': JSON.stringify(gitRevisionPlugin.version()),
    }),
  ]
}