import rootModel from './model'
import { createStore,applyMiddleware,combineReducers } from 'redux'
import getReducer from './getReducer'
import createSagaMiddleware from 'redux-saga'
import { take } from 'redux-saga/effects'

export default function (model,initState={}) {
    const saga={
        [rootModel.name]:rootModel.saga,
    }
    const reducer={
        [rootModel.name]:getReducer(rootModel.reducer),
    }
    if(model&&model.saga&&model.reducer){
        saga[model.name]=model.saga
        reducer[model.name]=getReducer(model.reducer)
    }
    if(!initState[rootModel.name]){
        initState[rootModel.name]=rootModel.state||{}
    }
    if(!initState[model.name]){
        initState[model.name]=model.state||{}
    }
    const sagaMiddleware = createSagaMiddleware()
    const store= createStore(
        combineReducers(reducer),
        initState,
        applyMiddleware(sagaMiddleware)
    )
    sagaMiddleware.run(function*() {
        const action=yield take('*');//监听全部action
        const typeArr=action.type.split('/')
        yield saga[typeArr[0]][typeArr[1]](action)//执行saga中的方法
    })
    return store
}