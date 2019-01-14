import webpack from 'webpack'
import baseWebpackConfig from './webpack.base.config'
import merge from 'webpack-merge'
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import CopyWebpackPlugin from 'copy-webpack-plugin'
import {clientConfig} from "./babelConfig"
import LoadablePlugin from '@loadable/webpack-plugin'
import path from 'path'
import {clientLessPro} from './lessLoaderConfig'

const buildConfig = merge(baseWebpackConfig, {
    mode: 'production',
    devtool: false,
    entry: {app:path.resolve(__dirname,'../source/client-entry.js')},
    output: {
        filename: 'js/[name].[chunkhash].js'
    },
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            chunks: "initial",
            name: "vendor"
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: clientConfig
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: clientLessPro
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'img/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            "process.env.REACT": JSON.stringify("client")
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css"
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../source/static'),
                to: path.resolve(__dirname, '../dist/static')
            }
        ]),
        new LoadablePlugin()
    ]
})
export default buildConfig