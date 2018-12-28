export default function (reducer) {
    if(typeof reducer!=='object') return console.error('reducer必须是个object')
    return function (state={},action) {
        const fn=reducer[action.type]
        if(fn) return fn(state,action)
        return state
    }
}