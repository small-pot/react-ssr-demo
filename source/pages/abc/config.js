import loadable from '@loadable/component';
export default {
    path:'/',
    Component: loadable(()=>import('./abc')),
    model: loadable.lib(()=>import('./abcModel'))
};