export default {
    add(state={code:1},action) {
        return {
            ...state,
            code:state.code+1
        };
    }
}