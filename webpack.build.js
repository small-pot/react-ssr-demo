process.env.NODE_ENV = 'production';
const webpack=require('webpack');
const config=require('./webpack.base.config')
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin=require('copy-webpack-plugin')
const babelConfig=require('./tools/clentBabelConfig')
const ora = require('ora');
const buildConfig=merge(config,{
    mode:'production',
    devtool:false,
    output: {
        filename:'js/[name].[chunkhash].js'
    },
    optimization:{
        runtimeChunk: "single",
        splitChunks: {
            chunks: "initial",
            name:"vendor"
        }
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
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            "process.env.REACT": JSON.stringify("client")
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css"
        }),
        new CopyWebpackPlugin([
            {from: __dirname + '/source/static',
                to:__dirname + '/dist/static'}
                ]),
    ]
})
const spinner = ora('building for production...')
spinner.start()
webpack(buildConfig,(err,stats)=>{
    spinner.stop()
    if(err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n\n')
})