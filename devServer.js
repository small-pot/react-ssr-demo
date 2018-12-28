import clientDone from './tools/clientDone'
import proxy from 'http-proxy-middleware'
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackConfig from './webpack.devServer'
import MFS from 'memory-fs'
import vm from 'vm'

const PORT = 9999
const mfs = new MFS()
clientDone().then(({app, tpl, loadableStats}) => {
    let flag = true
    const compiler = webpack(webpackConfig)
    compiler.outputFileSystem = mfs;
    compiler.watch({}, (err, stats) => {
        if (err) return console.error(err)
        console.log('compiler done')
        console.log(path.join(webpackConfig.output.path, webpackConfig.output.filename))
        const renderStr = mfs.readFileSync(path.join(webpackConfig.output.path, webpackConfig.output.filename), 'utf-8');
        const sandbox = {
            console,
            module,
            require
        }
        vm.runInNewContext(renderStr, sandbox)
        app.use((req, res, next) => {
            const render = sandbox.module.exports.default;
            render(req, res, loadableStats)
        })
        flag && app.listen(PORT, function () {
            console.log("成功启动：localhost:" + PORT)
            flag = false
        })
    })
    app.use(proxy('/API', {target: `http://192.168.20.151:9000`, changeOrigin: true}))
    app.use('/static', express.static(path.join(__dirname, 'source/static')))
}).catch(err => console.error(err))