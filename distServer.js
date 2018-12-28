import render from "./tools/render";
const path = require("path")
const express = require("express")
const proxy = require('http-proxy-middleware');
import React from 'react'
import stats from './dist/loadable-stats.json'

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