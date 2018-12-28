import React from 'react'
import {Switch, Route} from 'react-router-dom';
import routerConfig from './routerConfig'
export default function Routes() {
    return (
        <Switch>
            {Object.keys(routerConfig).map((key) => {
                const item = routerConfig[key];
                const Component=item.Component;
                return <Route key={key} exact path={key} component={()=><Component/>}/>
            })}
        </Switch>
    )
}