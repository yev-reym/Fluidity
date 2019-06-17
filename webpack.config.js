// webpack.config.js
var path = require('path');
const ROOT_PATH = path.resolve(__dirname);

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
             {
                test: /\.glsl$/,
                include: path.resolve(ROOT_PATH, 'lib/shader'),
                loader: 'webpack-glsl-loader'
            },
            { test: /\.png$/, use: 'url-loader?mimetype=image/png' }
        ]
    },
    devtool: 'source-map'
};