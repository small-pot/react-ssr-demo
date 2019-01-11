import { put,call } from 'redux-saga/effects';
import http from '#/http';
export default {
    name:'test',
    saga:{
        *getList(action){
            const data=yield call(http,{
                method:'get',
                url:'/auth/researcher/beikepkg/leke/share/details.htm?curPage='+action.page
            });
            yield put({type:'saveList',list:data.data});
        }
    },
    reducer:{
        saveList(state,action){
            return {
                ...state,
                list:action.list
            };
        }
    }
};