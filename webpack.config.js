const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const envToInject = {
	CLIENT_ID:	process.env['CLIENT_ID'],
	AUTH0_DOMAIN: process.env['AUTH0_DOMAIN'],
	CALLBACK_URL: process.env['CALLBACK_URL'],
	PUSH_SERVER_PUBLIC_KEY: process.env['PUSH_SERVER_PUBLIC_KEY'],
}

const webpackConfig = {
	entry: {
		app: ['./source/client/index.js'],
		common: ['./node_modules/immutable', './node_modules/redux', './node_modules/react-redux', './node_modules/redux-immutable', './node_modules/axios', './node_modules/react-router', './node_modules/react-router-redux', './node_modules/redux-thunk', './node_modules/redux-auth-wrapper']
	},
	output: {
		path: `${__dirname}/dist`,
		filename: '[name].js',
	},
	module: {
		rules: [
			{ test: /\.js$/, use: 'babel-loader' },
			{	test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{	test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
		]
	},
	plugins: [
		new HtmlWebpackPlugin({template: './source/client/index.html'}),
		new webpack.DefinePlugin({
			"myEnv": JSON.stringify(envToInject)
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name:'common',
			chunks: ['app','common'],
			filename:'commons.js',
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
