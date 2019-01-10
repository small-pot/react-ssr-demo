import path from 'path'
import MiniCssExtractPlugin from "mini-css-extract-plugin"
const isPro = process.env.NODE_ENV === 'production';


const cssLoader = [
    {
        loader: 'css-loader',
        options: {
            javascriptEnabled: true,
            importLoaders: 1,
            minimize: isPro
        }
    },
    {loader: "postcss-loader"}
];

function use(loaders) {
    //return [isPro ? MiniCssExtractPlugin.loader : {loader: 'style-loader'}, ...loaders]
    return [MiniCssExtractPlugin.loader, ...loaders]
}

export default {
    entry: {app: path.resolve(__dirname,'../source/client-entry.js')},
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../source'),
            "#":path.resolve(__dirname, '../source/utils'),
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: use(cssLoader)
            },
            {
                test: /\.less$/,
                use: use([
                    ...cssLoader,
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        }
                    }])
            },
            {
                //图片加载器，可以将较小的图片转成base64，减少http请求，将小于8192byte的图片转成base64码
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name: isPro?'img/[name].[hash:7].[ext]':'img/[name].[ext]'
                }
            }
        ]
    }
};