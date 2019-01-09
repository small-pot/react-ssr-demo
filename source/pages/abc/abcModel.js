import { put } from 'redux-saga/effects'
export default {
    name:'abc',
    saga:{
        *getTime(action){
            yield put({type:'saveTime',time:action.time})
        }
    },
    reducer:{
        saveTime(state={time:Date.now()},action){
            return {
                ...state,
                time:action.time
            }
        }
    }
}