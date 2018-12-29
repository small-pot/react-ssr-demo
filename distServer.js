import path from "path"
import express from "express"
import proxy from 'http-proxy-middleware'
import stats from './dist/loadable-stats.json'
import render from "./tools/render";

const app = express(),
    PORT = 8888 // 设置启动端口
app.use(express.static(path.join(__dirname, 'dist')))
//app.use(proxy('/mnst', { target: `http://localhost:8002` }));
app.use((req, res, next) => {
    render(req, res, stats)
})
app.listen(PORT, function () {
    console.log("成功启动：localhost:" + PORT)
})
process.on('uncaughtException', function (err) {
    console.log(err)
})