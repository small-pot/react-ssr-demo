import rootModel from './model';
import { createStore,applyMiddleware,combineReducers } from 'redux';
import getReducer from './getReducer';
import createSagaMiddleware from 'redux-saga';
import { takeEvery,take,fork,call,all } from 'redux-saga/effects';

export default function (model,initState={}) {
    const saga={
        [rootModel.name]:rootModel.saga,
    };
    const reducer={
        [rootModel.name]:getReducer(rootModel.reducer),
    };
    if(model&&model.saga&&model.reducer){
        saga[model.name]=model.saga;
        reducer[model.name]=getReducer(model.reducer);
    }
    if(!initState[rootModel.name]){
        initState[rootModel.name]=rootModel.state||{};
    }
    if(model&&!initState[model.name]){
        initState[model.name]=model.state||{};
    }
    const sagaMiddleware = createSagaMiddleware();
    const store= createStore(
        combineReducers(reducer),
        initState,
        applyMiddleware(sagaMiddleware)
    );
    sagaMiddleware.run(function *() {
        yield takeEvery('*',function *(action) {
            if(action.type.indexOf('/')!==-1){
                const typeArr=action.type.split('/');
                yield saga[typeArr[0]][typeArr[1]](action);
            }
        });
    });
    return store;
}