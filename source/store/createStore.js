//import rootReducer from './rootReducer'
import rootModel from './model'
import { createStore,applyMiddleware,combineReducers } from 'redux'
import getReducer from './getReducer'
import createSagaMiddleware from 'redux-saga'
import { takeEvery,select } from 'redux-saga/effects'

function startSaga(saga) {
    return function*(){
        yield takeEvery('*', function*(action) {
            const typeArr=action.type.split('/')
            yield saga[typeArr[0]][typeArr[1]](action)
        })
    }
}
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
    const sagaMiddleware = createSagaMiddleware()
    if(!initState[rootModel.name]){
        initState[rootModel.name]=rootModel.state||{}
    }
    if(!initState[model.name]){
        initState[model.name]=model.state||{}
    }
    const store= createStore(
        combineReducers(reducer),
        initState,
        applyMiddleware(sagaMiddleware)
    )
    sagaMiddleware.run(startSaga(saga))
    return store
}