const webpackBaseConfig = require('./build/webpack.base.config');
const webpackDevConfig = require('./build/webpack.dev.config');
const webpackProdConfig = require('./build/webpack.prod.config');

const configure = {
	development: config => webpackDevConfig(config),
	production: config => webpackProdConfig(config)
}

module.exports = {
	parallel: false,
	outputDir: 'dist',
	publicPath: process.env.NODE_ENV === 'production'
		? '/tour/'
		: '/',
	/**
	 * configureWebpack：如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
	 * 如果这个值是一个函数，则会接收被解析的配置作为参数。
	 * 该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
	 */
	configureWebpack: config => configure[process.env.NODE_ENV](config),
	//chainWebpack：是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
	chainWebpack: webpackBaseConfig
};