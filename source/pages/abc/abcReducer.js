export default {
    getTime(state={time:Date.now()},action){
        return {
            ...state,
            time:action.time
        }
    }
}