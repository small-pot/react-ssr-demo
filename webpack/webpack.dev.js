import webpack from "webpack"
import baseWebpackConfig from './webpack.base.config'
import merge from 'webpack-merge'
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import {clientConfig} from "../tools/babelConfig"
import LoadablePlugin from '@loadable/webpack-plugin'
import path from 'path'
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
export default webpackConfig
