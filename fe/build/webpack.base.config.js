/**
 * webpack 公共配置
 * @author zhaoyiming
 * @since  2019/09/14
 */
const merge = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');

const path = require('path');
const resolve = dir => path.resolve(__dirname, '../', dir);

module.exports = config => {
	//alias：设置别名
	config.resolve.alias
		.set('public', resolve('public'))
		.set('@', resolve('src'));
	//extensions：尝试按顺序解析这些后缀名。
	config.resolve.extensions
		.add('.less')
		.add('.css');
	
	//
	config.plugins
	// 移除 prefetch 插件
		.delete('prefetch')
		//移除preload插件
		.delete('preload');

	config.plugin('inline-source')
		//html-webpack-inline-source-plugin：用于在生成的HTML文件中内联您的资源
		.use(require('html-webpack-inline-source-plugin'))
		.after('html');

	config.plugin('script-ext')
		//script-ext-html-webpack-plugin：添加async，defer或module属性的<script>元素，甚至他们内联
		.use(require('script-ext-html-webpack-plugin'), [{
			defaultAttribute: 'defer'
		}])
		.after('html');
	
	/**
	 * html：HtmlWebpackPlugin，这个plugin曝光率很高，他主要有两个作用
	 * 1.为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
	 * 2.可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
	 */
	config.plugin('html')
		.tap(args => {
			//inlineSource：内联源
			args[0].inlineSource = '.(app|chunk-vendors).*.(css)';
			//minify：minify 的作用是对 html 文件进行压缩，minify 的属性值是一个压缩选项或者 false 
			args[0].minify = undefined;
			args[0].var = {
				NODE_ENV: process.env.NODE_ENV
			}
			return args;
		});

	config.module.rule('ts').use('ts-loader').tap(options => {
		options = merge(options, {
			transpileOnly: true,
			getCustomTransformers: () => ({
				before: [tsImportPluginFactory({
					libraryName: 'vant',
					libraryDirectory: 'es',
					style: true
				})]
			}),
			compilerOptions: {
				module: 'es2015'
			}
		});
		return options;
	});

	config.plugin('copy').tap(args => {
		args[0][0].from = resolve('src/static');
		args[0][0].to = 'static'
			return args;
	});
}