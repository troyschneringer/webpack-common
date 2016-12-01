const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.common = function(paths) {
    return {
        devtool: 'source-map',
        // Entry accepts a path or an object of entries.
        // We'll be using the latter form given it's
        // convenient with more complex configurations.
        entry: {
            style: paths.style,
            app: paths.app
        },
        output: {
            path: paths.build,
            filename: '[name].js'
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    // Enable caching for improved performance during development
                    // It uses default OS directory by default. If you need
                    // something more custom, pass a path to it.
                    // I.e., babel?cacheDirectory=<path>
                    loaders: ['babel?cacheDirectory'],
                    // Parse only app files! Without this it will go through
                    // the entire project. In addition to being slow,
                    // that will most likely result in an error.
                    include: paths.app
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'Webpack demo'
            })
        ],
        // Important! Do not remove ''. If you do, imports without
        // an extension won't work anymore!
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    };
}