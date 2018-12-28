module.exports = {
    babelrc: false,
    presets: [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    plugins: [
        "dynamic-import-node",
        "@loadable/babel-plugin",
        '@babel/plugin-transform-runtime',
        "@babel/plugin-proposal-class-properties",
        ["import", {
            "libraryName": "antd",
            "style": "true"
        }]
    ]
}