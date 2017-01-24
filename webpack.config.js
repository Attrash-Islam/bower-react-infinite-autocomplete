
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  resolve: {
    // Add `.ts` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      // all files with a `.ts` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  externals: {
      // require(x) is external and available
      "React": "react"
  },
  plugins: [
			// existing plugins go here
			new webpack.SourceMapDevToolPlugin({
				filename: null, // if no value is provided the sourcemap is inlined
				test: /\.(tsx?)($|\?)/i // process .ts files only
			})
		]
}
