import path from 'path'
import MiniCssExtractPlugin from "mini-css-extract-plugin"
import modifyVars from '../tools/modifyVars'
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
    const loader=[MiniCssExtractPlugin.loader, ...loaders];
    !isPro&&loader.unshift({loader: 'css-hot-loader?reloadAll=true'})
    return loader
}

export default {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: [".jsx", ".js", ".json"],
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
                            modifyVars,
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