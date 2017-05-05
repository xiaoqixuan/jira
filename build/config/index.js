// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

let rootDir = __dirname.replace(/(.*)\/build\/config$/, '$1');
let projectDir = process.cwd().replace(rootDir, '');
let projectPackage = require(process.cwd() + '/package.json');
let layerArr = [];
layerArr.length = projectDir.split('/').length + 1;

module.exports = {
	build: {
		env: require('./prod.env'),
		index: path.resolve(process.cwd(), '../webapp/static/index.html'),
		assetsRoot: path.resolve(process.cwd(), '../webapp/static'),
		assetsSubDirectory: './',
		assetsPublicPath: projectPackage.cdnUrl || './static/', // 配置资源路径
		productionSourceMap: false,
		// Gzip off by default as many popular static hosts such as
		// Surge or Netlify already gzip all static assets for you.
		// Before setting to `true`, make sure to:
		// npm install --save-dev compression-webpack-plugin
		productionGzip: false,
		productionGzipExtensions: ['js', 'css']
	},
	dev: {
		env: require('./dev.env'),
		port: projectPackage.devPort || 8081,
		assetsSubDirectory: './',
		assetsPublicPath: '',
		// proxyTable: {},
		proxyTable: {
		  '/jiraexpand': {
		    target: 'http://localhost:8080',
		    changeOrigin: true,
		    pathRewrite: {
		      '^/jiraexpand': '/jiraexpand'
		    }
		  }
		},
		// CSS Sourcemaps off by default because relative paths are "buggy"
		// with this option, according to the CSS-Loader README
		// (https://github.com/webpack/css-loader#sourcemaps)
		// In our experience, they generally work as expected,
		// just be aware of this issue when enabling this option.
		cssSourceMap: true
	},
	rootDir: rootDir,
	projectDir: projectDir,
	projectLayer: layerArr.join('../'),
	package: projectPackage
}