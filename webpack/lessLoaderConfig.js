import modifyVars from "../tools/modifyVars";
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
export const clientLessDev=[
    {loader:'css-hot-loader?reloadAll=true'},
    {loader:MiniCssExtractPlugin.loader},
    {
        loader:'css-loader',
        options: {
            javascriptEnabled: true,
            importLoaders: 1
        }
    },
    {
        loader: "less-loader",
        options: {
            modifyVars,
            javascriptEnabled: true
        }
    }
]
export const clientLessPro=[
    {loader:MiniCssExtractPlugin.loader},
    {
        loader:'css-loader',
        options: {
            javascriptEnabled: true,
            importLoaders: 1,
            minimize:true
        }
    },
    {loader:'postcss-loader'},
    {
        loader: "less-loader",
        options: {
            modifyVars,
            javascriptEnabled: true
        }
    }
]
export const serverLessConfig=[
    {
        loader:'css-loader',
        options: {
            javascriptEnabled: true,
            importLoaders: 1
        }
    },
    {
        loader: "less-loader",
        options: {
            modifyVars,
            javascriptEnabled: true
        }
    }
]