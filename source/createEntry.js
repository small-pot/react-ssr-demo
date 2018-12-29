import React from 'react'
import routerConfig from "./router/routerConfig";
import createStore from "./store/createStore";

export default function (pathName,App,initState) {
    const Reducer=routerConfig[pathName]&&routerConfig[pathName].reducer
    if(!Reducer){
        const store=createStore({},initState)
        return ()=><App store={store} />
    }
    return ()=>(
        <Reducer>
            {({default:reducer})=>{
                const store=createStore(reducer,initState)
                return <App store={store} />
            }}
        </Reducer>
    )
}