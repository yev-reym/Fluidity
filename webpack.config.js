// webpack.config.js
var path = require('path');

module.exports = { 
    entry: './lib/fluidity.js',
    output: {
        path: path.resolve(__dirname),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '*']
    },
    module: {
        rules: [
            { test: /\.png$/, use: 'url-loader?mimetype=image/png' }
        ]
    },
    devtool: 'source-map'
};