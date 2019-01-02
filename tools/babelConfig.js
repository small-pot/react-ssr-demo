const baseConfig={
    babelrc: false,
    presets: [
        "@babel/preset-env",
        "@babel/preset-react"
    ],
    plugins: [
        "@loadable/babel-plugin",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-runtime"
    ]
}

export const clientConfig={
    ...baseConfig,
    plugins:[
        ...baseConfig.plugins,
        "@babel/plugin-syntax-dynamic-import",
        ["import", {
            "libraryName": "antd",
            "libraryDirectory": "es",
            "style": "true"
        }]

    ]
}
export const serverConfig={
    ...baseConfig,
    plugins:[
        ...baseConfig.plugins,
        "dynamic-import-node",
        ["import", {
            "libraryName": "antd",
            "style": "true"
        }]
    ]
}
