import loadable from '@loadable/component'
export default {
    path:'/guide',
    Component: loadable(()=>import('./guide'))
}