import webpack from "webpack"
import merge from "webpack-merge"
import nodeExternals from "webpack-node-externals"
import baseWebpackConfig from "./webpack.base.config"
import {serverConfig} from "./babelConfig";
import path from 'path'
import {serverLessConfig} from "./lessLoaderConfig";
const webpackConfig = merge(baseWebpackConfig,{
    mode:'production',
    devtool:false,
    entry: {
        app:path.resolve(__dirname,"../distServer.js")
    },
    output: {
        filename: "server.js",
        libraryTarget: "commonjs2",  // 打包成commonjs2规范
        publicPath:'/'
    },
    node: {
        __dirname: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: serverConfig
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: serverLessConfig
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
    optimization:{
        splitChunks: {
            chunks: "initial" // 必须三选一： "initial" | "all"(默认就是all) | "async"
        }
    },
    target: "node",  // 指定node运行环境
    externals: [nodeExternals()],  // 不绑定node模块，保留为 require()
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production"),
            "process.env.REACT": JSON.stringify("server")
        })
    ]
})
export default webpackConfig