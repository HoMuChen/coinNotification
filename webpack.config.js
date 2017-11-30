const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
//const OfflinePlugin = require('offline-plugin');

const envToInject = {
	CLIENT_ID:	process.env['CLIENT_ID'],
	AUTH0_DOMAIN: process.env['AUTH0_DOMAIN'],
	CALLBACK_URL: process.env['CALLBACK_URL'],
	PUSH_SERVER_PUBLIC_KEY: process.env['PUSH_SERVER_PUBLIC_KEY'],
}

const webpackConfig = {
	entry: './source/client/index.js',
	output: {
		path: `${__dirname}/dist`,
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{ test: /\.js$/, use: 'babel-loader' },
			{	test: /\.css$/, use: ['style-loader', 'css-loader'] },
		]
	},
	plugins: [
		new HtmlWebpackPlugin({template: './source/client/index.html'}),
		new webpack.DefinePlugin({
			"env": JSON.stringify(envToInject)
		}),
		new UglifyJSPlugin(),
		//new OfflinePlugin()
	],
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
	}
};

module.exports = webpackConfig;
