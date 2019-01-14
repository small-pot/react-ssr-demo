import path from 'path'
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
    }
};