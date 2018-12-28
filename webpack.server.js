const webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");
const baseWebpackConfig = require("./webpack.base.config");
const babelConfig=require('./tools/serverBabelConfig')
const path=require('path')
baseWebpackConfig.plugins=[];
const webpackConfig = merge(baseWebpackConfig,{
    mode:'production',
    devtool:false,
    entry: {
        app: "./distServer.js"
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
        }),
        // 服务端不支持window document等对象，需将css外链
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css"
        })
    ]
})
module.exports=webpackConfig