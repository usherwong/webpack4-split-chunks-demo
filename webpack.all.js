const path = require('path');

var entry = {
	a: './src/a.js',
	b: './src/b.js'
}

var output = {
	filename: '[name].bundle.js',
	path: path.resolve(__dirname, "all") // initial文件夹对应chunks: initial, dist文件夹对应chunks: async, all文件夹对应chunks: all
}

var optimization = {
	splitChunks: {
		cacheGroups: {
			node_venders: {
				test: /[\\/]node_modules[\\/]/,
				chunks: 'all', // async, initial, all
				priority: 1
			}
		}
	}
}

module.exports = {
	entry: entry,
	output: output,
	optimization: optimization
}
