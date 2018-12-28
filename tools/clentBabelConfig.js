module.exports = {
    babelrc: false,
    presets: [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    plugins: [
        "syntax-dynamic-import",
        "@loadable/babel-plugin",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-runtime",
        ["import", {
            "libraryName": "antd",
            "libraryDirectory": "es",
            "style": "true"
        }]
    ]
}