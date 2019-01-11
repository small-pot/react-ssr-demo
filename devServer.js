import proxy from 'http-proxy-middleware'
import path from 'path'
import express from 'express'
import webpack from 'webpack'
import serverConfig from './webpack/webpack.devServer'
import MFS from 'memory-fs'
import vm from 'vm'
import webpackDevMiddleware from "webpack-dev-middleware"
import webpackHotMiddleware from 'webpack-hot-middleware'
import clientConfig from './webpack/webpack.dev.js'
const app = express()
const clientCompiler = webpack(clientConfig)
app.use(webpackDevMiddleware(clientCompiler, {
    serverSideRender: true,
    //绑定中间件的公共路径,与webpack配置的路径相同
    publicPath: clientConfig.output.publicPath,
}))
app.use(webpackHotMiddleware(clientCompiler))
let loadableStats,render
clientCompiler.hooks.done.tap("done", stats => {
    const info = stats.toJson();
    if (stats.hasWarnings()) {
        console.warn(info.warnings);
    }
    if (stats.hasErrors()) {
        return reject(info.errors)
    }
    loadableStats=JSON.parse(clientCompiler.outputFileSystem.readFileSync(path.join(clientCompiler.outputPath,'loadable-stats.json'),'utf-8'))
});

const PORT = 9999
const mfs = new MFS()
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs;
serverCompiler.watch({}, (err, stats) => {
    if (err) return console.error(err)
    console.log('compiler done')
    const renderStr = mfs.readFileSync(path.join(serverConfig.output.path, serverConfig.output.filename), 'utf-8');
    const sandbox = {
        console,
        module,
        require
    }
    vm.runInNewContext(renderStr, sandbox)
    render = sandbox.module.exports.default
})
app.use(proxy('/API', {target: `http://192.168.20.151:9000`, changeOrigin: true}))
app.use('/static', express.static(path.join(__dirname, 'source/static')))
app.use((req, res) => {
    loadableStats&&render&&render(req, res, loadableStats)
})
app.listen(PORT, function () {
    console.log("成功启动：localhost:" + PORT)
})
process.on('uncaughtException', function (err) {
    console.log(err)
})