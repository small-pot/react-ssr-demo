import { combineReducers } from 'redux'
import rootReducer from './rootReducer'
export default (reducer)=>{
    const {store}=require('./store').default
    store.replaceReducer(combineReducers({
            ...rootReducer,
            ...reducer
    }))
    return store.getState()
}
