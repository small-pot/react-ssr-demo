const webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const nodeExternals = require("webpack-node-externals");
const baseWebpackConfig = require("./webpack.base.config");
const babelConfig=require('./tools/serverBabelConfig')
baseWebpackConfig.plugins=[];
const webpackConfig = merge(baseWebpackConfig,{
    mode:'development',
    entry: {
        app: "./tools/render.js"
    },
    output: {
        filename: "render.js",
        libraryTarget: "commonjs2",  // 打包成commonjs2规范
        publicPath:'/'
    },
    node: {
        __dirname: true,
    },
    optimization:{
        splitChunks: {
            chunks: "initial" // 必须三选一： "initial" | "all"(默认就是all) | "async"
        }
    },
    target: "node",  // 指定node运行环境
    externals: [nodeExternals()],  // 不绑定node模块，保留为 require()
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
            "process.env.NODE_ENV": JSON.stringify("development"),
            "process.env.REACT": JSON.stringify("server"),
        }),
        // 服务端不支持window document等对象，需将css外链
        new MiniCssExtractPlugin({
            filename: "/[name].css"
        })
    ]
})
module.exports=webpackConfig