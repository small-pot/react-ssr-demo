import loadable from '@loadable/component'
export default {
    path:'/',
    Component: loadable(()=>import('./abc.js')),
    reducer: loadable.lib(()=>import('./abcReducer'))
}