const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: "./index.js",
		output: {
		path: path.resolve(__dirname, "pages"),
		filename: "index.js",
	},

	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
						MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: false,
						},
					}
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
						MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							url: false,
						},
					},
						'sass-loader'
				],
			}
		],
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: "styles.css"
		}),
	],

	mode: "production"
};

//	npm i -D webpack webpack-cli css-loader sass-loader sass mini-css-extract-plugin
//	npm run build

