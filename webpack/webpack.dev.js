import webpack from "webpack"
import baseWebpackConfig from './webpack.base.config'
import merge from 'webpack-merge'
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import {clientConfig} from "../tools/babelConfig"
import LoadablePlugin from '@loadable/webpack-plugin'
const webpackConfig =merge(baseWebpackConfig,{
    mode:'development',
    devtool: '#cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: clientConfig
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
export default webpackConfig
