import loadable from '@loadable/component'
export default {
    path:'/guide',
    Component: loadable(()=>import('./guide')),
    reducer: loadable.lib(()=>import('./guideReducer')),
}