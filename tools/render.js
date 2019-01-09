import React from 'react'
import getTpl from "./getTpl";
import config from '../source/router/serverConfig'
import {renderToStaticMarkup} from 'react-dom/server'
import url from 'url'
import App from '../source/entry-server'
import { ChunkExtractor } from '@loadable/server'


export default async function (req,res,stats) {
    const pathname=url.parse(req.url).pathname;
    const item =config[pathname]
    if(!item) {
        return
    }
    let data={};
    if(item.getSyncDate){
        data=await item.getSyncDate(req)
    }
    const extractor = new ChunkExtractor({ stats,entrypoints:'app' })
    const html = renderToStaticMarkup(extractor.collectChunks(<App location={req.url} context={{}} initState={data}/>))
    const js = extractor.getScriptTags()
    const css= extractor.getStyleTags()
    const result=getTpl(item,html,data,js,css)
    console.log(js)
    res.send(result)
}