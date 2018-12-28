import React from 'react'
import { StaticRouter } from "react-router-dom";
import Routes from './router/routes';
import {Provider} from 'react-redux'
import createStore from './store/createStore'
import createEntry from './createEntry'
import url from 'url'


export default function ({initState,location,context}) {
    const App=({store})=>{
        return (
            <Provider store={store}>
                <StaticRouter location={location} context={context}>
                    <Routes />
                </StaticRouter>
            </Provider>
        )
    }
    const Entry=createEntry(url.parse(location).pathname,App,initState)
    return <Entry />
}
