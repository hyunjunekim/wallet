const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const path = require('path');

module.exports = function(env) {
    const config = {
        entry: {
            backgroundScript: './app/backgroundScript/index.js',
        },
        output: {
            path: path.join(__dirname, '/dist'),
            filename: '[name].js',
            sourceMapFilename: '[name].js.map'
        },
        devtool: 'source-map',
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: [ 'es2015' ]
                    }
                },
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                }
            ]
        },
        resolve: {
            modules: [ './app', './node_modules' ]
        },
        plugins: [
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.DefinePlugin({
                EXTENSION_ID: JSON.stringify('ibnejdfjmmkpcnlpebklmnkoeoihofec')
            })
        ]
    };

    if(process.env.NODE_ENV == 'production') {
        config.plugins = config.plugins.concat([
            new MinifyPlugin()            
        ]);
    }

    return config;
}
