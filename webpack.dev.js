const webpack=require('webpack');
const config=require('./webpack.base.config')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const babelConfig=require('./tools/clentBabelConfig')
const LoadablePlugin = require('@loadable/webpack-plugin')
const webpackConfig =merge(config,{
    mode:'development',
    devtool: '#cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: babelConfig
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            "process.env.REACT": JSON.stringify("client")
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new LoadablePlugin()
    ]
});
module.exports=webpackConfig
