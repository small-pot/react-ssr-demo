import rootReducer from './rootReducer'
import { createStore } from 'redux'
import { combineReducers } from 'redux'
import getReducer from './getReducer'

export default function (reducer,initState={}) {
    // return createStore(combineReducers({
    //     root:getReducer(rootReducer),
    //         ...reducer
    // }),initState)
    return createStore(
        getReducer({
            ...rootReducer,
            ...reducer
        }),
        initState,
    )
}