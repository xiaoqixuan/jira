var utils = require('./utils')
var config = require('./config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction ?
      config.build.productionSourceMap : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    require('autoprefixer')({
      browsers: [
        'Android >= 4',
        'Chrome >= 35',
        'Firefox >= 31',
        'iOS >= 8',
        'Opera >= 12',
        'Safari >= 7.1',
      ]
    })
  ]
}