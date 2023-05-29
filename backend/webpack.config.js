const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackNodeExternals = require('webpack-node-externals')

module.exports = {
	mode: 'production',
	entry: path.resolve(__dirname, 'app.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'server.js'
	},
	target: 'node',
	performance: {
		hints: false
	},
	externals: [WebpackNodeExternals()],
	plugins: [new CleanWebpackPlugin()],

	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			}
		]
	}
}
