import React from 'react'
import routerConfig from "./router/routerConfig";
import createStore from "./store/createStore";

export default function (pathName,App,initState) {
    const Model=routerConfig[pathName]&&routerConfig[pathName].model
    if(!Model){
        const store=createStore(null,initState)
        return ()=><App store={store} />
    }
    return ()=>(
        <Model>
            {({default:model})=>{
                const store=createStore(model,initState)
                return <App store={store} />
            }}
        </Model>
    )
}