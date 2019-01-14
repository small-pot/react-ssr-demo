import webpack from "webpack"
import baseWebpackConfig from './webpack.base.config'
import merge from 'webpack-merge'
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import {clientConfig} from "./babelConfig"
import LoadablePlugin from '@loadable/webpack-plugin'
import path from 'path'
import {clientLessDev} from "./lessLoaderConfig";
const cssLoader=[
    {loader:'css-hot-loader?reloadAll=true'},
    {loader:MiniCssExtractPlugin.loader},
    {
        loader:'css-loader',
        options: {
            javascriptEnabled: true,
            importLoaders: 1
        }
    }
]
const webpackConfig =merge(baseWebpackConfig,{
    mode:'development',
    devtool: '#cheap-module-eval-source-map',
    entry: {app:[path.resolve(__dirname,'../source/client-entry.js'),'webpack-hot-middleware/client?reload=true&noInfo=true']},
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
                use: clientLessDev
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: 'img/[name].[ext]'
                }
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
        new LoadablePlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
});
console.log(webpackConfig)
export default webpackConfig
