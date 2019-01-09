import { put } from 'redux-saga/effects'
export default {
    name:'root',
    state:{
        code:1
    },
    saga:{
        *add(action){
            yield put({type:'save',code:2})
        }
    },
    reducer:{
        save(state,action) {
            return {
                ...state,
                code:state.code+action.code
            };
        }
    }
}