import loadable from '@loadable/component'
export default {
    path:'/',
    Component: loadable(()=>import('./abc.js')),
    model: loadable.lib(()=>import('./abcModel'))
}